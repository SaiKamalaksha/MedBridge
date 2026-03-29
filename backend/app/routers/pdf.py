from fastapi import APIRouter, File, UploadFile
from ..models.schemas import PdfExtractResponse
from ..services.pdf_service import extract_text_from_pdf

router = APIRouter(prefix="/extract-pdf", tags=["pdf"])


@router.post("", response_model=PdfExtractResponse)
async def extract_pdf(file: UploadFile = File(...)):
    file_bytes = await file.read()
    text = extract_text_from_pdf(file_bytes)
    return {"text": text}