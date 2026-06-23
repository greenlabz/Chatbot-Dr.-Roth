import os
import google.generativeai as genai
import smtplib
from email.message import EmailMessage
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# Konfiguration
API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# E-Mail Funktion
def send_email(subject, body):
    msg = EmailMessage()
    msg.set_content(body)
    msg['Subject'] = subject
    msg['From'] = "bot@greenlabz.de"
    msg['To'] = "deine-email@beispiel.de" # Hier deine Ziel-Adresse
    # SMTP Konfiguration für den Versand (Beispiel)
    # with smtplib.SMTP('smtp.beispiel.de', 587) as s:
    #     s.login("user", "pass")
    #     s.send_message(msg)
    print(f"E-Mail würde gesendet: {subject}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = "Du bist ein hochprofessioneller und freundlicher KI-Assistent."

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    
    response = model.generate_content(f"{SYSTEM_PROMPT}\n\nUser: {user_message}")
    
    intent = "qa"
    if any(word in user_message.lower() for word in ["termin", "meeting", "buchen"]):
        intent = "scheduling"
        send_email("Neuer Terminwunsch", f"User fragt nach Termin: {user_message}")
        
    return {"reply": response.text, "intent": intent}
