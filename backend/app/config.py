from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    aws_region: str = "us-east-1"
    aws_access_key_id: str
    aws_secret_access_key: str
    twilio_account_sid: str
    twilio_auth_token: str
    twilio_from_number: str
    bedrock_model_id: str = "anthropic.claude-3-5-sonnet-20241022-v2:0"
    bedrock_embed_model_id: str = "amazon.titan-embed-text-v2:0"
    
    class Config:
        env_file = ".env"

settings = Settings()
