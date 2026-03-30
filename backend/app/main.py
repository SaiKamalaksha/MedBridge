from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import pdf, simplify, sms

app = FastAPI(title="MedBridge API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(simplify.router)
app.include_router(pdf.router)
app.include_router(sms.router)


@app.get("/health")
def health():
    return {"ok": True}