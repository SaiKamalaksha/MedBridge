import json
from typing import List
import boto3
from botocore.config import Config
from ..config import settings


def get_bedrock_runtime():
    session_kwargs = {}
    if settings.aws_access_key_id and settings.aws_secret_access_key:
        session_kwargs = {
            "aws_access_key_id": settings.aws_access_key_id,
            "aws_secret_access_key": settings.aws_secret_access_key,
        }
    session = boto3.Session(**session_kwargs)
    return session.client(
        "bedrock-runtime",
        region_name=settings.aws_region,
        config=Config(retries={"max_attempts": 3, "mode": "standard"}),
    )


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
    runtime = get_bedrock_runtime()
    body = json.dumps(
        {
            "anthropic_version": "bedrock-2023-05-31",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 800,
            "temperature": 0.3,
        }
    )
    response = runtime.invoke_model(
        modelId=settings.bedrock_model_id,
        body=body,
        accept="application/json",
        contentType="application/json",
    )
    payload = json.loads(response["body"].read())
    return payload.get("content", [{}])[0].get("text", "")