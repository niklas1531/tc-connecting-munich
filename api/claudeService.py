import anthropic

client = anthropic.Anthropic(
    api_key="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",
)

def generateSummary(text: str):
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
                        "text": f"Bitte erstelle mir auf Basis dieses Antrags {text} einen Titel, eine Zusammenfassung, welche alle wichtigen Informationen enthält, sowie 3-5 Schlüsselbegriffe, anhand welcher man den Antrag identifizieren und klassifizieren kann, und liste mir optional in dem Antrag vorkommenden Personen vor. Ich möchte deine Antwort in einem Json Objekt, welches folgende Elemente enthält: title:str, summary:str, glossaries: str[], contacts?: str[]. Bitte sende als Antwort nur dieses eine Objekt, sonst nichts"
                    }
                ]
            }
        ]
    )
    return message.content