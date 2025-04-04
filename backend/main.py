from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase.client import supabase
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

@app.post("/recommend")
def recommend(req: NFTRequest):
    return {"recommendations": [1, 2, 3]}


@app.get("/nfts")
async def get_nfts():
    res = supabase.table("nfts").select("*").execute()
    return res.data