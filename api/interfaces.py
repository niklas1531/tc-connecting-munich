from datetime import date
from typing import List

from enums import ProposalAccessibilty, ProposalType
from pydantic import BaseModel


class IGlossary(BaseModel):
    id: int
    title: str

class IPerson(BaseModel):
    firstName: str = None
    lastName: str = None
    email: str

class IProposal(BaseModel):
    id: int = None
    title: str
    summary: str
    glossaries: List[str]
    responsibles: List[IPerson]
    contacts: List[IPerson] = None
    createdAt: str
    registeredAt: str
    deadline: str
    electionPeriod: str
    createdBy: str
    type: ProposalType
    accessibility: ProposalAccessibilty
    
    class Config:
        arbitrary_types_allowed = True
        