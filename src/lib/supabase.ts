import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://uprinmvhfvndjlykexrt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcmlubXZoZnZuZGpseWtleHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjI2NDIsImV4cCI6MjA5Mzc5ODY0Mn0.jYQAS2_nDX6kNDO3CcZ-hS_aCd6je9Jo-8xVQbzc5Wg'
)