from typing import List, Optional

from bson import ObjectId
from enums import ProposalAccessibilty, ProposalType
from pydantic import BaseModel, Field


class Person(BaseModel):
    firstName: str = None
    lastName: str = None
    email: str

class ProposalInput(BaseModel):
    title: str
    summary: str
    responsibles: List[Person]
    glossaries: List[str]
    contacts: List[Person] = None
    createdAt: str
    registeredAt: str
    deadline: str
    electionPeriod: str
    createdBy: str
    type: ProposalType
    accessibility: ProposalAccessibilty
    responsibleDepartment: str
    
    class Config:
        schema_extra = {
            "examples": [
                {
                    "title": "title",
                    "summary": "This is a summary",
                    "glossaries": ["Grundwasseranstieg", "Baum", "Radweg"],
                    "responsibles": [{"firstName": "Niklas", "lastName": "Minth", "email": "niklas.minth@tum.de"}],
                    "contacts": [],
                    "createdAt": "01.05.2024",
                    "registeredAt": "01.06.2024",
                    "deadline": "01.12.2024",
                    "electionPeriod": "2024",
                    "createdBy": "Niklas Minth",
                    "type": "StR-Antrag",
                    "accessibility": "Öffentlicher Antrag"
                }
            ]
        }
        
class Glossary(BaseModel):
    id: str = Field(..., alias='_id')
    title: str
    proposals: List[str]
    
class CreateGlossary(BaseModel):
    title: str
    proposals: List[str]
    

class GlossaryInput(BaseModel):
    glossaries: List[str];

class Proposal(BaseModel):
    id: str = Field(..., alias='_id')
    title: str
    summary: str
    glossaries: List[str]
    responsibles: List[Person]
    responsibleDepartment: str
    contacts: List[Person] = None
    createdAt: str
    registeredAt: str
    deadline: str
    electionPeriod: str
    createdBy: str
    type: ProposalType
    accessibility: ProposalAccessibilty
    
    class Config:
        schema_extra = {
            "examples": [
                {
                    "_id": "667a96f7933409c674e71118",
                    "title": "title",
                    "summary": "This is a summary",
                    "responsibles": [{"firstName": "Niklas", "lastName": "Minth", "email": "niklas.minth@tum.de"}],
                    "contacts": [],
                    "createdAt": "01.05.2024",
                    "registeredAt": "01.06.2024",
                    "deadline": "01.12.2024",
                    "electionPeriod": "2024",
                    "createdBy": "Niklas Minth",
                    "type": "StR-Antrag",
                    "accessibility": "Öffentlicher Antrag",
                    "responsibleDepartment": "Bauamt"
                }
            ]
        }