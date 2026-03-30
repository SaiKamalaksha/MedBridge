from typing import Optional
from twilio.rest import Client
from ..config import settings
import logging

logger = logging.getLogger(__name__)

def send_sms(phone: str, message: str) -> Optional[str]:
    if not settings.twilio_account_sid or not settings.twilio_auth_token:
        logger.warning("Twilio credentials not set")
        return None

    try:
        client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
        sms = client.messages.create(
            body=message,
            from_='whatsapp:+14155238886',
            to=f'whatsapp:{phone}',
        )
        logger.info(f"WhatsApp sent to {phone}, SID: {sms.sid}")
        return sms.sid
    except Exception as e:
        logger.error(f"WhatsApp failed: {e}")
        print(f"WHATSAPP ERROR: {e}")
        return None