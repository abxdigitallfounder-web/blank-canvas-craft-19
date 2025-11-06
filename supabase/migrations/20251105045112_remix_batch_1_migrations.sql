
-- Migration: 20251105044202

-- Migration: 20251105042202
-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  birth_date DATE,
  cpf TEXT,
  address TEXT,
  insurance_type TEXT NOT NULL DEFAULT 'Particular',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Create policies for patients
CREATE POLICY "Authenticated users can view all patients" 
ON public.patients 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create patients" 
ON public.patients 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update patients" 
ON public.patients 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete patients" 
ON public.patients 
FOR DELETE 
TO authenticated
USING (true);

-- Create appointment status type
CREATE TYPE public.appointment_status AS ENUM (
  'agendado',
  'confirmado', 
  'atendido',
  'faltou',
  'reagendado',
  'cancelado'
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  procedure TEXT NOT NULL DEFAULT 'Consulta',
  status public.appointment_status NOT NULL DEFAULT 'agendado',
  is_first_time BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for appointments
CREATE POLICY "Authenticated users can view all appointments" 
ON public.appointments 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create appointments" 
ON public.appointments 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update appointments" 
ON public.appointments 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete appointments" 
ON public.appointments 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_patients_updated_at
BEFORE UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_scheduled_time ON public.appointments(scheduled_time);
CREATE INDEX idx_appointments_status ON public.appointments(status);

