from typing import Optional
from twilio.rest import Client
from ..config import settings
import logging

logger = logging.getLogger(__name__)

def send_sms(phone: str, message: str) -> Optional[str]:
    logger.info(f"[SMS MOCK] To: {phone} | Message: {message[:50]}...")
    return "demo_sid_123"
