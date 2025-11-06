import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Patient {
  id: string;
  name: string;
  phone: string;
  code?: string;
  birth_date: string;
  email?: string;
  cpf?: string;
  insurance_type?: string;
  created_at?: string;
}

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPatients(data || []);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar pacientes:", err);
      setError("Erro ao carregar pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, refetch: fetchPatients };
};
