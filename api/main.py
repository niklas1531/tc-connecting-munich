import io
import json
from datetime import date, datetime, time, timedelta
from typing import Annotated, List, Union
from uuid import UUID

from claudeService import generateSummary
from fastapi import Body, FastAPI, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from interfaces import IProposal
from pydantic import BaseModel
from PyPDF2 import PdfReader
from testProposals import proposals

app = FastAPI()

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


@app.get("/proposals", response_model=List[IProposal])
def get_proposals():
    return proposals

# @app.get("/proposals/{proposalId}")
# def get_glossaryById(proposalId: str):
#     return {'Proposal: ' + proposalId}

# @app.get("/proposals/{glossaryId}")
# def get_proposalsByGlossaryId(proposalId: str):
#     return {'Proposals'}


@app.get("/glossaries")
def get_glossaries():
    return {'Glossaries'}

@app.get("/glossaries/{glossaryId}")
def get_glossaryById(glossaryId: str):
    return {'Glossary: ' + glossaryId}



@app.post("/upload")
async def uploadProposal(file: Union[UploadFile, None] = File(None)):
    if not file:
        return {"message": "No upload file sent"}

    contents = await file.read()

    reader = PdfReader(io.BytesIO(contents))
    page = reader.pages[0]
    text = page.extract_text()
    response_str = generateSummary(text)
    print(response_str)
    print(response_str[0].text)
    response = response_str[0].text
    
    data = json.loads(response)
    title = data["title"] or ''
    summary = data["summary"] or ''
    glossaries = data["glossaries"] or []
    contacts = data["contacts"] or []
    return {'title': title, 'summary':summary, 'glossaries':glossaries, 'contacts':contacts}