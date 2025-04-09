from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import asyncio
from database import connect_db, fetch_random_nfts, close_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NFT(BaseModel):
    name: str
    image_path: str

@app.get("/fetch-nfts", response_model=List[NFT])
async def fetch_nfts():
    """Fetches 200 random name and image_path from the nfts table."""
    conn = await connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Could not connect to database")

    nfts_data = await fetch_random_nfts(conn, limit=500)
    await close_db(conn)

    nfts = [NFT(name=name, image_path=url) for name, url in nfts_data]
    return nfts

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)