from fastapi import APIRouter
from ..models.schemas import SmsRequest, SmsResponse
from ..services.sms_service import send_sms

router = APIRouter(prefix="/send-sms", tags=["sms"])


@router.post("", response_model=SmsResponse)
def sms(payload: SmsRequest):
    sid = send_sms(payload.phone, payload.message)
    if sid:
        return {"status": "sent"}
    return {"status": "mocked"}