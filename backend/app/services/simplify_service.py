from typing import List
import json
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
        "summary_points, medications (each with: name, dosage, time_of_day, warning), red_flags.\n\n"
    )
    if guidelines:
        prompt += "RELEVANT GUIDELINES:\n" + "\n\n".join(guidelines) + "\n\n"
    prompt += f"LANGUAGE: {language}\n\nDISCHARGE NOTES:\n{text}\n"
    prompt += "\n\nReturn ONLY raw JSON. No markdown, no backticks, no explanation. Start your response with { and end with }"

    try:
        raw = generate_simplification(prompt)
        clean = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        claude_data = json.loads(clean)
    except Exception:
        claude_data = {}

    simplified_text = claude_data.get("simplified_text", text)
    summary_points = claude_data.get("summary_points", _simple_summary(text))
    medications = claude_data.get("medications", [])
    red_flags = claude_data.get("red_flags", [])

    readability_before = textstat.flesch_kincaid_grade(text)
    readability_after = textstat.flesch_kincaid_grade(simplified_text)

    return {
        "simplified_text": simplified_text,
        "summary_points": summary_points,
        "medications": medications,
        "red_flags": red_flags,
        "readability": {"before": readability_before, "after": readability_after},
        "citations": guidelines,
    }