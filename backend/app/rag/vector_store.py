import json
import os
from typing import List, Tuple
import faiss
import numpy as np

INDEX_PATH = os.path.join(os.path.dirname(__file__), "index.faiss")
META_PATH = os.path.join(os.path.dirname(__file__), "index.json")


def save_index(vectors: List[List[float]], chunks: List[str]) -> None:
    if not vectors:
        return
    dim = len(vectors[0])
    index = faiss.IndexFlatIP(dim)  # IP = inner product = cosine when vectors are normalised
    vectors_np = np.array(vectors).astype("float32")
    faiss.normalize_L2(vectors_np)  # normalise before adding
    index.add(vectors_np)
    index.add(np.array(vectors).astype("float32"))
    faiss.write_index(index, INDEX_PATH)
    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump({"chunks": chunks}, f)


def load_index() -> Tuple[faiss.Index, List[str]]:
    if not os.path.exists(INDEX_PATH) or not os.path.exists(META_PATH):
        raise FileNotFoundError("RAG index not found")
    index = faiss.read_index(INDEX_PATH)
    with open(META_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return index, data.get("chunks", [])


def search(index: faiss.Index, query_vector: List[float], k: int = 4) -> List[int]:
    distances, indices = index.search(
        np.array([query_vector]).astype("float32"), k
    )
    return [int(i) for i in indices[0] if i >= 0]