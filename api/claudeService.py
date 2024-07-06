from typing import List

import anthropic
from models import Glossary, Proposal
from dotenv import load_dotenv
import os

load_dotenv()

client = anthropic.Anthropic(
    api_key= os.getenv("ANTROPHIC_SECRET_KEY"),
)

def generateSummary(text: str, existingGlossaries: List[Glossary]):
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=1000,
        temperature=0,
        system="Du bist ein Ratsinformationssystem der Stadt München und verwaltest alle Anträge von Politikern, welche von verschiedenen Abteilungen der Stadt München bearbeitet werden.",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": 
                            f"Bitte erstelle mir auf Basis dieses Antrags {text} einen Titel, eine Zusammenfassung, welche alle wichtigen Informationen enthält, sowie 3-5 Schlüsselbegriffe (Falls in dieser Liste {existingGlossaries} bereits Schlüsselbegriffe drin sind, gucke erst, ob welche zu diesem Antrag zu mindestens 80% passen, bevor du neue Schlüsselbegriffe erstellst), anhand welcher man den Antrag identifizieren und klassifizieren kann, und liste mir optional in dem Antrag vorkommenden Personen vor. Gebe mir zudem die verantwortliche politische Partei aus. Konzentriere dich bei Titel, Zusammenfassung und Schlüsselwörtern vor allem auf genannte Probleme, Anliegen aus dem Antrag. Ich möchte deine Antwort in einem Json Objekt, welches folgende Elemente enthält: title:str, summary:str, glossaries: str[], responsibleDepartment: str,  contacts?: Array aus Objekten mit diesen Attributen: firstName: str, lastName: str, email?: str. Bitte sende als Antwort nur dieses eine Objekt, sonst nichts. Vielen Dank"
                    }
                ]
            }
        ]
    )
    return message.content

def searchProposalsAI(text: str, existingProposals: List[Proposal]):
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=1500,
        temperature=0,
        system="Du bist ein Ratsinformationssystem der Stadt München und verwaltest alle Anträge von Politikern, welche von verschiedenen Abteilungen der Stadt München bearbeitet werden. Ein Mitarbeiter der Stadt sucht nun nach Anträgen zu einem bestimmten Thema.",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": 
                            f"Du hast eine Liste bestehender Anträge {existingProposals} und sollst nun basierend auf der eingegebenen Nachricht des Nutzers {text} die Anträge zurückgeben, die zu der Eingabe passen. Überprüfe dabei, ob ein Antrag relevant ist, indem du den Title, Summary und die Keywords durchliest und dann entscheidest, ob dieser Antrag zu dem Anliegen des Nutzers passt. Gebe mir anschließend eine Antwort ausschließlich als JSOn-Objekt, das folgende 2 Attribute hat: filtered_proposals: List[Proposal], response: str. Die response ist eine kurze Antwort von dir auf die Nachricht des Nutzers, in der du in 1-2 Sätzen schreibst, was du gefunden hast im System"
                    }
                ]
            }
        ]
    )
    return message.content