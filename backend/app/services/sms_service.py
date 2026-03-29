from typing import Optional
from twilio.rest import Client
from ..config import settings


def send_sms(phone: str, message: str) -> Optional[str]:
    if not settings.twilio_account_sid or not settings.twilio_auth_token:
        return None

    client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
    sms = client.messages.create(
        body=message,
        from_=settings.twilio_from_number,
        to=phone,
    )
    return sms.sid