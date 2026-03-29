from fastapi import APIRouter
from ..models.schemas import SimplifyRequest, SimplifyResponse
from ..services.simplify_service import simplify_text

router = APIRouter(prefix="/simplify", tags=["simplify"])


@router.post("", response_model=SimplifyResponse)
def simplify(payload: SimplifyRequest):
    result = simplify_text(payload.text, payload.language)
    return result