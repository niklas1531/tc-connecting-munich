import io
import json
from http.client import HTTPException
from typing import Annotated, List, Union

import gridfs
from bson import ObjectId
from claudeService import generateSummary
from fastapi import (FastAPI, File, HTTPException, Path, Query, UploadFile,
                     status)
from fastapi.middleware.cors import CORSMiddleware
from models import CreateGlossary, Glossary, Proposal, ProposalInput
from pymongo import MongoClient
from PyPDF2 import PdfReader

app = FastAPI()

client = MongoClient('mongodb+srv://tech-challenge-admin:tech-challenge-ss24@techchallengecluster.vsppdlc.mongodb.net/?retryWrites=true&w=majority&appName=TechChallengeCluster')
db = client.get_database("TechChallenge")
proposals_collection = db.get_collection("proposals")
glossaries_collection = db.get_collection("glossaries")
file_collection = db.get_collection("files")
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
    
    # if not file:
    #     return {"message": "No upload file sent"}

    # contents = await file.read()

    # reader = PdfReader(io.BytesIO(contents))
    # page = reader.pages[0]
    # text = page.extract_text()
    # response_str = generateSummary(text)
    # print(response_str)
    # print(response_str[0].text)
    # response = response_str[0].text
    
    # data = json.loads(response)
    # title = data["title"] or ''
    # summary = data["summary"] or ''
    # glossaries = data["glossaries"] or []
    # contacts = data["contacts"] or []
    # return {'title': title, 'summary':summary, 'glossaries':glossaries, 'contacts':contacts}
    return {
    "title": "Auskunft zu Einsätzen wegen Grundwasseranstieg in München",
    "summary": "Anfrage an den Oberbürgermeister bezüglich der Einsätze von Feuerwehr und THW wegen Grundwasseranstieg in Kellern im Münchner Stadtgebiet vom 30.05. bis 04.06.2024. Es werden Informationen zu Anzahl und Verteilung der Einsätze, genauen Einsatzorten und einer möglichen Lagekarte angefordert.",
    "glossaries": [
        "Grundwasseranstieg",
        "Feuerwehreinsätze",
        "Unwetter",
        "Stadtbezirke",
        "Lagekarte"
    ],
    "contacts": [
        "Dieter Reiter",
        "Iris Wassill",
        "Markus Walbrunn",
        "Daniel Stanke"
    ]
    }

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
    fs.put(contents, filename=proposal_id, proposal_id=proposal_id)


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