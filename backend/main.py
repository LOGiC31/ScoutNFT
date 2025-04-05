from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import os
import requests
from typing import List
from supabase import create_client, Client
import os


app = FastAPI()


SUPABASE_URL = "https://eyojtzfkrhlqhnzluivm.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5b2p0emZrcmhscWhuemx1aXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTc4OTgsImV4cCI6MjA1OTM3Mzg5OH0.rXxoObcjK3wCyYuyhTn6IgOSgWjvF8aAfWJPr-jrG6Y"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

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

def verify_jwt_token(token: str):
    """Verify JWT token with Supabase."""
    url = f"{SUPABASE_URL}/auth/v1/user"
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return response.json()

def get_current_user(authorization: str = Header(...)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")
    user_info = verify_jwt_token(authorization)
    return user_info

@app.post("/recommend")
def recommend(req: NFTRequest):
    return {"recommendations": [1, 2, 3]}

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
@app.get("/nfts", response_model=List[dict])
async def get_nfts(current_user: dict = Depends(get_current_user)):
    res = supabase.table("nfts").select("*").execute()
    
    if not res.data:
        raise HTTPException(status_code=404, detail="NFTs not found")

    return res.data