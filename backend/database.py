import asyncpg
import random
from typing import List, Tuple

async def connect_db():
    """Connects to the local PostgreSQL database."""
    try:
        conn = await asyncpg.connect(
            user='simrankaur',
            password='',  # Replace with your actual password if you set one
            database='nftdb',
            host='localhost'
        )
        return conn
    except asyncpg.PostgresError as e:
        print(f"Error connecting to database: {e}")
        return None

async def fetch_random_nfts(conn: asyncpg.Connection, limit: int = 10) -> List[Tuple[str, str]]:
    """Fetches a specified number of random image URLs and names from the nfts table."""
    try:
        rows = await conn.fetch("SELECT name, image_path FROM nfts")
        if not rows:
            return []
        random_nfts = random.sample(rows, min(limit, len(rows)))
        return [(nft['name'], nft['image_path']) for nft in random_nfts]
    except asyncpg.PostgresError as e:
        print(f"Error fetching random NFTs: {e}")
        return []

async def close_db(conn: asyncpg.Connection):
    """Closes the database connection."""
    if conn:
        await conn.close()