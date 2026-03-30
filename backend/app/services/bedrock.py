import json
from typing import List
import boto3
from botocore.config import Config
from ..config import settings
import anthropic

_runtime = None

def get_bedrock_runtime():
    global _runtime
    if _runtime is None:
        session_kwargs = {}
        if settings.aws_access_key_id and settings.aws_secret_access_key:
            session_kwargs = {
                "aws_access_key_id": settings.aws_access_key_id,
                "aws_secret_access_key": settings.aws_secret_access_key,
            }
        session = boto3.Session(**session_kwargs)
        _runtime = session.client(
            "bedrock-runtime",
            region_name=settings.aws_region,
            config=Config(retries={"max_attempts": 3, "mode": "standard"}),
        )
    return _runtime


def embed_texts(texts: List[str]) -> List[List[float]]:
    runtime = get_bedrock_runtime()
    embeddings: List[List[float]] = []
    for text in texts:
        body = json.dumps({"inputText": text})
        response = runtime.invoke_model(
            modelId=settings.bedrock_embed_model_id,
            body=body,
            accept="application/json",
            contentType="application/json",
        )
        payload = json.loads(response["body"].read())
        embeddings.append(payload["embedding"])
    return embeddings


def generate_simplification(prompt: str) -> str:
    client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        temperature=0.3,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text