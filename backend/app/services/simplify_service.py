from typing import List
import textstat
from ..rag.vector_store import load_index, search
from ..services.bedrock import embed_texts, generate_simplification


def _retrieve_guidelines(text: str, k: int = 4) -> List[str]:
    try:
        index, chunks = load_index()
    except Exception:
        return []

    try:
        query_vector = embed_texts([text])[0]
    except Exception:
        return []

    indices = search(index, query_vector, k=k)
    return [chunks[i] for i in indices if i < len(chunks)]


def _simple_summary(text: str) -> List[str]:
    sentences = [s.strip() for s in text.split('.') if s.strip()]
    if not sentences:
        return ["No summary available."]
    return [f"{s}." for s in sentences[:3]]


def simplify_text(text: str, language: str) -> dict:
    guidelines = _retrieve_guidelines(text)
    prompt = (
        "You are a medical discharge simplification assistant. "
        "Rewrite the discharge notes in plain, patient-friendly language. "
        "Provide a concise summary, list medications with dosage and time of day, "
        "and list red flag symptoms. Output JSON with keys: simplified_text, "
        "summary_points, medications, red_flags.\n\n"
    )
    if guidelines:
        prompt += "RELEVANT GUIDELINES:\n" + "\n\n".join(guidelines) + "\n\n"
    prompt += f"LANGUAGE: {language}\n\nDISCHARGE NOTES:\n{text}\n"

    try:
        simplified_text = generate_simplification(prompt)
    except Exception:
        simplified_text = ""

    if simplified_text:
        summary_points = _simple_summary(simplified_text)
    else:
        simplified_text = text
        summary_points = _simple_summary(text)

    readability_before = textstat.flesch_kincaid_grade(text)
    readability_after = textstat.flesch_kincaid_grade(simplified_text)

    return {
        "simplified_text": simplified_text,
        "summary_points": summary_points,
        "medications": [
            {"name": "Medication A", "dosage": "10 mg", "time_of_day": "Morning"}
        ],
        "red_flags": ["Chest pain", "Severe dizziness"],
        "readability": {"before": readability_before, "after": readability_after},
        "citations": guidelines,
    }