import io
import json
from http.client import HTTPException
from typing import Annotated, List, Union

from fastapi.responses import StreamingResponse
import gridfs
from bson import ObjectId
from claudeService import generateSummary, searchProposalsAI
from fastapi import (FastAPI, File, HTTPException, Path, Query, UploadFile, Body,
                     status)
from fastapi.middleware.cors import CORSMiddleware
from models import CreateGlossary, Glossary, Proposal, ProposalInput, SearchSession
from pymongo import MongoClient
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import os
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)
load_dotenv()


client = MongoClient(os.getenv('MONGO_URI'),tls=True, tlsAllowInvalidCertificates=True)
db = client.get_database("TechChallenge")
proposals_collection = db.get_collection("proposals")
glossaries_collection = db.get_collection("glossaries")
file_collection = db.get_collection("files")
searchHistory_collection = db.get_collection("searchHistory")
fs = gridfs.GridFS(db, collection="files")

# Only for local testing mode
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
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    response_str = generateSummary(text, existingGlossaries)
    response = response_str[0].text
    
    data = json.loads(response)
    title = data["title"] or ''
    summary = data["summary"] or ''
    glossaries = data["glossaries"] or []
    contacts = data["contacts"] or []
    responsibleDepartment = data['responsibleDepartment'] or ''
    return {'title': title, 'summary':summary, 'glossaries':glossaries, 'responsibles':contacts, 'responsibleDepartment': responsibleDepartment}


@app.get("/getProposalFileText/{proposal_id}")
async def get_proposal_file(proposal_id: str):
    file = fs.find_one({'proposal_id': proposal_id})
    if not file:
        raise HTTPException(status_code=404, detail="File not Found")

    pdf_contents = file.read();
    pdf_reader = PdfReader(io.BytesIO(pdf_contents));
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
        
    return text
    
@app.get("/getPdfFile/{proposal_id}")
async def get_pdf_file(proposal_id: str):
    file = fs.find_one({'proposal_id': proposal_id})
    if not file:
        raise HTTPException(status_code=404, detail="File not Found")

    pdf_contents = file.read()
    
    return StreamingResponse(io.BytesIO(pdf_contents), media_type="application/pdf")

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
    print(message)
    existingProposals: List[Proposal] = await get_proposals()
    print('Existing Proposals: ' , len(existingProposals))
    response_str = searchProposalsAI(message, existingProposals)
    if not response_str or not response_str[0].text:
        return {'filtered_proposals': existingProposals, 'response': 'Es konnten keine Anträge zu diesem Thema gefunden werden. Probieren Sie es erneut', 'searchSessionId': 0}
    response = response_str[0].text

    try:
        data = json.loads(response)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return {'filtered_proposals': existingProposals, 'response': 'Es konnten keine Anträge zu diesem Thema gefunden werden. Probieren Sie es erneut', 'searchSessionId': 0}
    
    
    data = json.loads(response)
    filtered_proposals = data["filtered_proposals"] or []
    response = data["response"] or ''
    proposal_ids = [str(proposal['id']) for proposal in filtered_proposals]
    search_session = SearchSession(search=[message], response=[response], filtered_proposals=proposal_ids)
    createdSession = searchHistory_collection.insert_one(search_session.dict())
    for proposal in filtered_proposals:
        if 'id' in proposal:
            proposal['_id'] = proposal.pop('id')
    return {'filtered_proposals': filtered_proposals, 'response': response, 'searchSessionId': str(createdSession.inserted_id)}



@app.post("/generateInformationForAllProposals")
async def generate_information_for_all_proposals():
    proposals = await get_proposals();
    for proposal in proposals:
        if (proposal.title is None or 
            proposal.summary is None or 
            proposal.glossaries is None or 
            proposal.responsibles is None or 
            proposal.responsibleDepartment is None):
            proposalText = await get_proposal_file(proposal.id)
            generatedInformation = await generate_missing_information(proposalText)
            if proposal.title is None:
                proposal.title = generatedInformation['title']
            if proposal.summary is None:
                proposal.summary = generatedInformation['summary']
            if proposal.glossaries is None:
                proposal.glossaries = generatedInformation['glossaries']
            proposal_dict = proposal.dict(by_alias=True)
            proposal_dict.pop("_id", None)
            update_result = proposals_collection.update_one(
                {"_id": ObjectId(proposal.id)},
                {"$set": proposal_dict}
            )
            if update_result.modified_count == 0:
                raise HTTPException(status_code=404, detail=f"Proposal with id {proposal.id} not found or not updated.")
            
    return proposals


@app.post("/genereateMissingInformation")
async def generate_missing_information(text: str):
    
    existingGlossaries: List[Glossary] = await get_glossaries()
    generatedInformation = generateSummary(text, existingGlossaries)
    response = generatedInformation[0].text
    
    data = json.loads(response)
    title = data["title"] or ''
    summary = data["summary"] or ''
    glossaries = data["glossaries"] or []
    contacts = data["contacts"] or []
    responsibleDepartment = data['responsibleDepartment'] or ''
    return {'title': title, 'summary':summary, 'glossaries':glossaries, 'responsibles':contacts, 'responsibleDepartment': responsibleDepartment}
