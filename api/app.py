import io
import json
from http.client import HTTPException
from typing import Annotated, List, Union

import gridfs
from bson import ObjectId
from claudeService import generateSummary, searchProposalsAI
from fastapi import (FastAPI, File, HTTPException, Path, Query, UploadFile, Body,
                     status)
from fastapi.middleware.cors import CORSMiddleware
from models import CreateGlossary, Glossary, Proposal, ProposalInput, SearchSession
from pymongo import MongoClient
from PyPDF2 import PdfReader

app = FastAPI()

client = MongoClient('mongodb+srv://tech-challenge-admin:tech-challenge-ss24@techchallengecluster.vsppdlc.mongodb.net/?retryWrites=true&w=majority&appName=TechChallengeCluster',tls=True, tlsAllowInvalidCertificates=True)
db = client.get_database("TechChallenge")
proposals_collection = db.get_collection("proposals")
glossaries_collection = db.get_collection("glossaries")
file_collection = db.get_collection("files")
searchHistory_collection = db.get_collection("searchHistory")
fs = gridfs.GridFS(db, collection="files")

origins = [
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/status", status_code= status.HTTP_201_CREATED)
def health():
    return {"Hello": "World"}

@app.get("/proposals")
async def get_proposals() -> list[Proposal]:
    proposals = []
    cursor = proposals_collection.find(limit=100)
    for proposal in cursor:
        proposal['_id'] = str(proposal['_id'])
        proposals.append(Proposal(**proposal))
    return proposals

@app.get("/proposals/{proposal_id}")
async def get_proposalById(
    proposal_id: Annotated[str, Path(title="The ID of the proposal to get")]
) -> Proposal:
    
    if (proposal := proposals_collection.find_one({"_id": ObjectId(proposal_id)})) is not None:
        proposal['_id'] = str(proposal['_id'])
        return proposal
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Proposal with ID {proposal_id} not found")

@app.get("/glossaries")
async def get_glossaries() -> list[Glossary]:
    glossaries = []
    cursor = glossaries_collection.find(limit=100)
    print(cursor)
    for glossary in cursor:
        glossary['_id'] = str(glossary['_id'])
        glossaries.append(Glossary(**glossary))
    return glossaries

@app.get("/glossaries/{glossary_id}")
async def get_glossaryById(
    glossary_id: Annotated[str, Path(title="The ID of the glossary to get")]
) -> Glossary:
    
    if (glossary := glossaries_collection.find_one({"_id": ObjectId(glossary_id)})) is not None:
        glossary['_id'] = str(glossary['_id'])
        return glossary
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Glossary with ID {glossary_id} not found")


@app.post("/generateSummary")
async def uploadProposal(file: Union[UploadFile, None] = None):
    
    if not file:
        return {"message": "No upload file sent"}

    existingGlossaries: List[Glossary] = await get_glossaries()
    contents = await file.read()

    reader = PdfReader(io.BytesIO(contents))
    page = reader.pages[0]
    text = page.extract_text()
    response_str = generateSummary(text, existingGlossaries)
    response = response_str[0].text
    
    data = json.loads(response)
    title = data["title"] or ''
    summary = data["summary"] or ''
    glossaries = data["glossaries"] or []
    contacts = data["contacts"] or []
    responsibleDepartment = data['responsibleDepartment'] or ''
    return {'title': title, 'summary':summary, 'glossaries':glossaries, 'responsibles':contacts, 'responsibleDepartment': responsibleDepartment}
#     return {
#     "title": "Rückabwicklung der M-net-Vertragskündigungen",
#     "summary": "Die CSU-FW-Fraktion fordert die Stadtwerke München GmbH und deren Tochter M-net auf, auch in wirtschaftlich weniger attraktiven Gegenden für ein zukunftssicheres Angebot an Kommunikationstechnologien zu sorgen. Bereits gekündigte Verträge mit Privatkunden sollen rückgängig gemacht und weitergeführt werden. Dies folgt einem Bericht über einen Ramersdorfer, dem nach 26 Jahren der Festnetzvertrag gekündigt wurde, da sich der Betrieb des kupferbasierten Netzes nicht mehr lohne und ein Glasfaserausbau nicht geplant sei.",
#     "glossaries": [
#         "Daseinsvorsorge",
#         "Telekommunikation",
#         "Netzausbau",
#         "Vertragsrückabwicklung"
#     ],
#     "responsibles": [
#         {
#             "firstName": "Manuel",
#             "lastName": "Pretzl"
#         },
#         {
#             "firstName": "Hans-Peter",
#             "lastName": "Mehling"
#         },
#         {
#             "firstName": "Dieter",
#             "lastName": "Reiter"
#         }
#     ],
#     "responsibleDepartment": "CSU-FW-Fraktion"
# }

@app.post("/createProposal")
async def createProposal(proposal: Union[ProposalInput, None] = None) -> Proposal:
    new_proposal = proposals_collection.insert_one(proposal.dict())
    created_proposal = proposals_collection.find_one({"_id": new_proposal.inserted_id})
    if created_proposal:
        created_proposal["_id"] = str(created_proposal["_id"])
    return created_proposal

@app.post("/linkGlossariesToProposal/{proposal_id}")
async def linkGlossariesToProposal(proposal_id: str, glossaries: Union[List[str], None] = None):
    for glossary in glossaries:
        update_glossary(glossary, proposal_id)
    return {"message": "Proposals added to glossaries successfully"}

@app.post("/uploadProposalFile/{proposal_id}")
async def uploadProposalFile(proposal_id: str, file: UploadFile = File(...)):
    contents = await file.read()
    fs.put(contents, filename=file.filename, proposal_id=proposal_id)


def update_glossary(title: str, proposal_id: str):
    existing_glossary = glossaries_collection.find_one({"title": title})
    
    if existing_glossary:
        glossaries_collection.update_one(
            {"_id": existing_glossary["_id"]},
            {"$addToSet": {"proposals": proposal_id}}
        )
    else:
        new_glossary = CreateGlossary(title=title, proposals=[proposal_id])
        glossaries_collection.insert_one(new_glossary.dict())
        
@app.post("/search")
async def searchProposals(message: str = Body(...)):
    existingProposals: List[Proposal] = await get_proposals()
    response_str = searchProposalsAI(message, existingProposals)
    response = response_str[0].text
    data = json.loads(response)
    filtered_proposals = data["filtered_proposals"] or []
    response = data["response"] or ''
    proposal_ids = [str(proposal['id']) for proposal in filtered_proposals]
    search_session = SearchSession(search=[message], response=[response], filtered_proposals=proposal_ids)
    createdSession = searchHistory_collection.insert_one(search_session.dict())
    return {'filtered_proposals': filtered_proposals, 'response': response, 'searchSessionId': str(createdSession.inserted_id)}