import io
from typing import Optional
import boto3
import pdfplumber
from pdf2image import convert_from_bytes
from ..config import settings


def _get_rekognition_client():
    if not settings.aws_access_key_id or not settings.aws_secret_access_key:
        return None
    session = boto3.Session(
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        region_name=settings.aws_region,
    )
    return session.client("rekognition")


def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            text += page_text + "\n"

    if text.strip():
        return text.strip()

    rekognition = _get_rekognition_client()
    if not rekognition:
        return ""

    try:
        images = convert_from_bytes(file_bytes)
    except Exception:
        return ""

    detected_text = []
    for image in images:
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        response = rekognition.detect_text(Image={"Bytes": buffer.getvalue()})
        lines = [
            item["DetectedText"]
            for item in response.get("TextDetections", [])
            if item.get("Type") == "LINE"
        ]
        detected_text.append(" ".join(lines))

    return "\n".join(detected_text).strip()