from enum import Enum


class ProposalAccessibilty(str, Enum):
    OEFFENTLICH = 'Öffentlicher Antrag'
    PRIVAT = 'Privater Antrag'

class ProposalType(str, Enum):
    STR_ANTRAG = 'StR-Antrag',
    SITZUNGSVORLAGE = 'Sitzungsvorlage',
    BA_ANTRAG = 'BA-Antrag',
    BA_SITZUNGSVORLAGE = 'BA-Sitzungsvorlage',
    BV_EMPFEHLUNG = 'BV-Empfehlung',
    BV_ANFRAGE = 'BV-Anfrage',