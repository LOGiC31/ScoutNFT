// src/utils/supabaseClient.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = 'https://eyojtzfkrhlqhnzluivm.supabase.co'; 
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5b2p0emZrcmhscWhuemx1aXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTc4OTgsImV4cCI6MjA1OTM3Mzg5OH0.rXxoObcjK3wCyYuyhTn6IgOSgWjvF8aAfWJPr-jrG6Y'; 

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
