from datetime import date

from interfaces import (IGlossary, IPerson, IProposal, ProposalAccessibilty,
                        ProposalType)

proposals = [
    IProposal(
        id=1,
        title="Grundwassereinsätze 2024",
        summary="Anfrage zu Einsätzen der Feuerwehren und des THW aufgrund von Grundwasseranstieg in München.",
        glossaries=[
            IGlossary(id=1, title="Grundwasseranstieg"),
            IGlossary(id=2, title="THW")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Iris", lastName="Wassill", email="iris.wassill@muenchen.de"),
            IPerson(firstName="Markus", lastName="Walbrunn", email="markus.walbrunn@muenchen.de"),
            IPerson(firstName="Daniel", lastName="Stanke", email="daniel.stanke@muenchen.de")
        ],
        createdAt=date(2024, 6, 12),
        registeredAt=date(2024, 6, 13),
        deadline=date(2024, 6, 30),
        electionPeriod="2024-2029",
        createdBy="AfD-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.OEFFENTLICH
    ),
    IProposal(
        id=2,
        title="Verkehrsberuhigung in der Innenstadt",
        summary="Vorschlag zur Reduzierung des Verkehrs in der Münchner Innenstadt.",
        glossaries=[
            IGlossary(id=3, title="Verkehrsberuhigung")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Anna", lastName="Müller", email="anna.mueller@muenchen.de")
        ],
        createdAt=date(2024, 5, 15),
        registeredAt=date(2024, 5, 16),
        deadline=date(2024, 7, 1),
        electionPeriod="2024-2029",
        createdBy="SPD-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.OEFFENTLICH
    ),
    IProposal(
        id=3,
        title="Sanierung von Schulen",
        summary="Bericht über den Zustand und die geplanten Sanierungsmaßnahmen für Münchner Schulen.",
        glossaries=[
            IGlossary(id=4, title="Schulsanierung")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Peter", lastName="Schmidt", email="peter.schmidt@muenchen.de")
        ],
        createdAt=date(2024, 3, 10),
        registeredAt=date(2024, 3, 11),
        deadline=date(2024, 8, 1),
        electionPeriod="2024-2029",
        createdBy="CSU-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.PRIVAT
    ),
    IProposal(
        id=4,
        title="Umweltfreundliche Stadtentwicklung",
        summary="Antrag zur Förderung nachhaltiger Bauprojekte in München.",
        glossaries=[
            IGlossary(id=5, title="Nachhaltigkeit")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Laura", lastName="Weber", email="laura.weber@muenchen.de")
        ],
        createdAt=date(2024, 4, 20),
        registeredAt=date(2024, 4, 21),
        deadline=date(2024, 9, 1),
        electionPeriod="2024-2029",
        createdBy="Grüne-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.OEFFENTLICH
    ),
    IProposal(
        id=5,
        title="Verbesserung der Fahrradwege",
        summary="Vorschlag zur Optimierung des Radwegenetzes in München.",
        glossaries=[
            IGlossary(id=6, title="Fahrradwege")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Sebastian", lastName="Keller", email="sebastian.keller@muenchen.de")
        ],
        createdAt=date(2024, 6, 1),
        registeredAt=date(2024, 6, 2),
        deadline=date(2024, 7, 30),
        electionPeriod="2024-2029",
        createdBy="FDP-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.OEFFENTLICH
    ),
    IProposal(
        id=6,
        title="Erweiterung des öffentlichen Nahverkehrs",
        summary="Antrag zur Verbesserung und Erweiterung des Nahverkehrsnetzes in München.",
        glossaries=[
            IGlossary(id=7, title="Nahverkehr")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Julia", lastName="Becker", email="julia.becker@muenchen.de")
        ],
        createdAt=date(2024, 2, 15),
        registeredAt=date(2024, 2, 16),
        deadline=date(2024, 8, 15),
        electionPeriod="2024-2029",
        createdBy="SPD-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.OEFFENTLICH
    ),
    IProposal(
        id=7,
        title="Förderung von Start-ups",
        summary="Bericht über Maßnahmen zur Unterstützung von Start-ups in München.",
        glossaries=[
            IGlossary(id=8, title="Start-up")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Martin", lastName="Schneider", email="martin.schneider@muenchen.de")
        ],
        createdAt=date(2024, 1, 10),
        registeredAt=date(2024, 1, 11),
        deadline=date(2024, 7, 10),
        electionPeriod="2024-2029",
        createdBy="CSU-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.OEFFENTLICH
    ),
    IProposal(
        id=8,
        title="Digitalisierung der Verwaltung",
        summary="Antrag zur Verbesserung der digitalen Dienste in der Münchner Stadtverwaltung.",
        glossaries=[
            IGlossary(id=9, title="Digitalisierung")
        ],
        responsibles=[
            IPerson(firstName="Dieter", lastName="Reiter", email="dieter.reiter@muenchen.de")
        ],
        contacts=[
            IPerson(firstName="Claudia", lastName="Hoffmann", email="claudia.hoffmann@muenchen.de")
        ],
        createdAt=date(2024, 3, 5),
        registeredAt=date(2024, 3, 6),
        deadline=date(2024, 9, 5),
        electionPeriod="2024-2029",
        createdBy="FDP-Stadtratsgruppe",
        type=ProposalType.STR_ANTRAG,
        accessibility=ProposalAccessibilty.OEFFENTLICH
    )
]