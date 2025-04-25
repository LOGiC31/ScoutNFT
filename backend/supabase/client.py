# backend/supabase/client.py
import os
from supabase import create_client, Client

SUPABASE_URL: str = os.getenv("https://eyojtzfkrhlqhnzluivm.supabase.co")
SUPABASE_KEY: str = os.getenv("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5b2p0emZrcmhscWhuemx1aXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTc4OTgsImV4cCI6MjA1OTM3Mzg5OH0.rXxoObcjK3wCyYuyhTn6IgOSgWjvF8aAfWJPr-jrG6Y")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)