-- RLS Policies for patients table
-- Execute this SQL in Supabase SQL Editor

-- Enable RLS if not already enabled
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can read patients" ON patients;
DROP POLICY IF EXISTS "Authenticated users can insert patients" ON patients;
DROP POLICY IF EXISTS "Authenticated users can update patients" ON patients;
DROP POLICY IF EXISTS "Authenticated users can delete patients" ON patients;

-- Allow authenticated users to read all patients
CREATE POLICY "Authenticated users can read patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert patients
CREATE POLICY "Authenticated users can insert patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update patients
CREATE POLICY "Authenticated users can update patients"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete patients
CREATE POLICY "Authenticated users can delete patients"
  ON patients
  FOR DELETE
  TO authenticated
  USING (true);
