import glob
import os
from typing import List
from .embeddings import embed_chunks
from .vector_store import save_index

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "knowledge_base")


def chunk_text(text: str, max_tokens: int = 500) -> List[str]:
    words = text.split()
    chunks = []
    for i in range(0, len(words), max_tokens):
        chunk = " ".join(words[i : i + max_tokens])
        if chunk.strip():
            chunks.append(chunk)
    return chunks


def ingest() -> None:
    files = glob.glob(os.path.join(KNOWLEDGE_DIR, "*.txt"))
    if not files:
        raise FileNotFoundError("No .txt files found in knowledge_base")

    all_chunks: List[str] = []
    for file in files:
        with open(file, "r", encoding="utf-8") as f:
            text = f.read()
        all_chunks.extend(chunk_text(text))

    vectors = embed_chunks(all_chunks)
    save_index(vectors, all_chunks)


if __name__ == "__main__":
    ingest()