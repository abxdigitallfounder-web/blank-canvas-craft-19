-- Execute this SQL in Supabase SQL Editor to create the attendance_history table

-- Create table for attendance history
CREATE TABLE IF NOT EXISTS attendance_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES auth.users(id),
  attendance_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  duration_seconds INTEGER DEFAULT 0,
  
  -- Main attendance data
  queixa_principal TEXT,
  historia_molestia TEXT,
  historico_antecedentes TEXT,
  exame_fisico TEXT,
  peso DECIMAL(5,2),
  altura DECIMAL(5,2),
  imc DECIMAL(5,2),
  hipotese_diagnostica TEXT,
  condutas TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_attendance_history_patient_id ON attendance_history(patient_id);
CREATE INDEX IF NOT EXISTS idx_attendance_history_date ON attendance_history(attendance_date DESC);

-- Enable RLS
ALTER TABLE attendance_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Authenticated users can read attendance history"
  ON attendance_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert attendance history"
  ON attendance_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update attendance history"
  ON attendance_history
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete attendance history"
  ON attendance_history
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_attendance_history_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_attendance_history_timestamp
  BEFORE UPDATE ON attendance_history
  FOR EACH ROW
  EXECUTE FUNCTION update_attendance_history_updated_at();
