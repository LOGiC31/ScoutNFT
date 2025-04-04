from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from supabase.client import supabase
from supabase import create_client, Client
import os


app = FastAPI()


SUPABASE_URL = "https://eyojtzfkrhlqhnzluivm.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5b2p0emZrcmhscWhuemx1aXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTc4OTgsImV4cCI6MjA1OTM3Mzg5OH0.rXxoObcjK3wCyYuyhTn6IgOSgWjvF8aAfWJPr-jrG6Y"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Enable CORS to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this to specific frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class NFTRequest(BaseModel):
    user_id: int

@app.post("/recommend")
def recommend(req: NFTRequest):
    return {"recommendations": [1, 2, 3]}

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
@app.get("/nfts")
async def get_nfts():
    res = supabase.table("nfts").select("*").execute()
    print(res)
    return res.data