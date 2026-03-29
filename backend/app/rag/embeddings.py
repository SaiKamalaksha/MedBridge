from typing import List
from ..services.bedrock import embed_texts


def embed_chunks(chunks: List[str]) -> List[List[float]]:
    return embed_texts(chunks)