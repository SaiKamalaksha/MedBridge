from typing import List, Optional
from pydantic import BaseModel, Field


class SimplifyRequest(BaseModel):
    text: str = Field(..., min_length=1)
    language: str = "English"


class ReadabilityScore(BaseModel):
    before: float
    after: float


class Medication(BaseModel):
    name: str
    dosage: str
    time_of_day: str
    warning: Optional[str] = None

class SimplifyResponse(BaseModel):
    simplified_text: str
    summary_points: List[str]
    medications: List[Medication]
    red_flags: List[str]
    readability: ReadabilityScore
    citations: Optional[List[str]] = None


class PdfExtractResponse(BaseModel):
    text: str


class SmsRequest(BaseModel):
    phone: str
    message: str


class SmsResponse(BaseModel):
    status: str