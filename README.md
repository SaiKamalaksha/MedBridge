# MedBridge

MedBridge is a full‑stack app that turns complex hospital discharge notes into patient‑friendly summaries, extracts medications and red‑flag symptoms, and can deliver the summary to a patient’s phone via WhatsApp.

**What This Repo Contains**
1. A FastAPI backend that ingests text or PDFs, simplifies discharge notes with an LLM, scores readability, and optionally sends a WhatsApp message via Twilio.
2. A React + Vite frontend that provides the upload/paste UI, shows structured results, and triggers SMS/WhatsApp delivery.

**Core Features**
1. Upload a discharge PDF or paste plain text.
2. PDF text extraction with `pdfplumber`, with OCR fallback via AWS Rekognition.
3. Discharge note simplification using Claude with a JSON‑only response format.
4. Medication extraction, red‑flag symptom listing, and summary bullets.
5. Readability scoring with Flesch‑Kincaid grade level.
6. Optional RAG grounding from a local knowledge base.
7. WhatsApp delivery via Twilio.

**Architecture Overview**
1. Frontend collects discharge text or a PDF and calls `POST /extract-pdf` (if a PDF is uploaded).
2. Frontend calls `POST /simplify` with the final text + language choice.
3. Backend retrieves guideline chunks from a FAISS vector index (if available), and calls Claude for simplification.
4. Backend computes readability before/after and returns a structured response.
5. Frontend renders results and can call `POST /send-sms` to send the summary via WhatsApp.

**Backend**
Location: `backend/`

Endpoints
1. `GET /health` -> `{ "ok": true }`
2. `POST /extract-pdf` -> `{ "text": string }`
3. `POST /simplify` -> `SimplifyResponse` (see schemas below)
4. `POST /send-sms` -> `{ "status": "sent" | "mocked" }`

Request/Response Schemas
1. `SimplifyRequest`
2. `text: string`
3. `language: string` (default: `English`)
4. `SimplifyResponse`
5. `simplified_text: string`
6. `summary_points: string[]`
7. `medications: { name, dosage, time_of_day?, warning? }[]`
8. `red_flags: string[]`
9. `readability: { before, after }`
10. `citations?: string[]` (RAG guideline chunks, if available)

Environment Variables
Set these in `backend/.env` or your shell (pydantic settings are case‑insensitive, so lowercase works too):
1. `AWS_REGION` (default: `us-east-1`)
2. `AWS_ACCESS_KEY_ID`
3. `AWS_SECRET_ACCESS_KEY`
4. `BEDROCK_EMBED_MODEL_ID` (default: `amazon.titan-embed-text-v2:0`)
5. `BEDROCK_MODEL_ID` (defined in settings but not currently used by the generator)
6. `ANTHROPIC_API_KEY`
7. `TWILIO_ACCOUNT_SID`
8. `TWILIO_AUTH_TOKEN`
9. `TWILIO_FROM_NUMBER` (defined but not currently used)

Notes:
1. If AWS credentials are not configured, PDF OCR fallback (Rekognition) is disabled.
2. If Twilio credentials are not configured, `/send-sms` returns `{ "status": "mocked" }`.
3. WhatsApp delivery uses the Twilio sandbox number hardcoded in code: `whatsapp:+14155238886`.

Run Backend (Local)
1. `cd backend`
2. `python -m venv .venv`
3. `.\.venv\Scripts\Activate.ps1`
4. `pip install -r requirements.txt`
5. `uvicorn app.main:app --reload --port 8000`

Run Backend (Docker)
1. `cd backend`
2. `docker build -t medbridge-backend .`
3. `docker run --rm -p 8000:8000 --env-file .env medbridge-backend`

**RAG Knowledge Base (Optional)**
The RAG index lives in `backend/app/rag/` as `index.faiss` and `index.json`.
1. Add `.txt` guideline files to `backend/app/rag/knowledge_base/`.
2. Run `python -m app.rag.ingest` from `backend/` to build the index.
3. The simplifier will automatically use the index if it exists.

**Frontend**
Location: `frontend/`

Key Screens
1. `InputPage` for uploading PDFs or pasting text.
2. `ResultsPage` for summaries, medications, red flags, readability, and SMS trigger.
3. `ImpactPage` and `HowItWorksPage` for narrative/marketing content.

Environment Variables
1. `VITE_API_URL` (default: `http://localhost:8000`)

Run Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

**Tech Stack**
1. Frontend: React 19, Vite, Tailwind CSS, Framer Motion, Lucide icons, Axios
2. Backend: FastAPI, Uvicorn, Anthropic SDK, AWS Bedrock + Rekognition, FAISS, pdfplumber, textstat, Twilio

**Repo Structure**
1. `backend/` FastAPI service, RAG utilities, and integrations
2. `frontend/` React application

**Known Gaps / Future Work**
1. Persisted audit logs and patient history
2. Authentication + role‑based access
3. More robust validation for phone numbers and PDF content
4. Tests for RAG ingestion and end‑to‑end flows
