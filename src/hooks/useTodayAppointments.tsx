import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface TodayAppointment {
  id: string;
  time: string;
  name: string;
  isFirstTime: boolean;
  status: string;
  phone: string;
  insurance: string;
  procedure: string;
  scheduledTime: string;
  patientId: string;
}

export const useTodayAppointments = () => {
  const [appointments, setAppointments] = useState<TodayAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodayAppointments = async () => {
    try {
      setLoading(true);
      
      // Get today's date range (from 00:00 to 23:59)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      console.log('Fetching appointments for today:', {
        start: today.toISOString(),
        end: tomorrow.toISOString()
      });

      // Fetch appointments for today with patient data
      const { data, error } = await (supabase as any)
        .from('appointments')
        .select(`
          id,
          scheduled_time,
          status,
          procedure,
          is_first_time,
          patient_id,
          patients (
            name,
            phone,
            insurance_type
          )
        `)
        .gte('scheduled_time', today.toISOString())
        .lt('scheduled_time', tomorrow.toISOString())
        .order('scheduled_time', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }

      console.log('Fetched appointments:', data);

      // Transform data to match the expected format
      const transformedAppointments: TodayAppointment[] = (data || []).map((apt: any) => {
        const scheduledDate = new Date(apt.scheduled_time);
        const hours = scheduledDate.getHours().toString().padStart(2, '0');
        const minutes = scheduledDate.getMinutes().toString().padStart(2, '0');
        
        return {
          id: apt.id,
          time: `${hours}:${minutes}`,
          name: apt.patients?.name || 'Paciente',
          isFirstTime: apt.is_first_time,
          status: apt.status === 'agendado' ? 'Agendado' : 
                  apt.status === 'confirmado' ? 'Confirmado' : 
                  apt.status === 'finalizado' ? 'Finalizado' : 
                  apt.status === 'cancelado' ? 'Cancelado' : 'Agendado',
          phone: apt.patients?.phone || '',
          insurance: apt.patients?.insurance_type || 'Particular',
          procedure: apt.procedure || 'Consulta',
          scheduledTime: apt.scheduled_time,
          patientId: apt.patient_id,
        };
      });

      console.log('Transformed appointments:', transformedAppointments);
      setAppointments(transformedAppointments);
    } catch (error) {
      console.error('Error fetching today appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayAppointments();

    // Set up real-time subscription for appointments
    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        () => {
          // Refetch appointments when any change occurs
          fetchTodayAppointments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { appointments, loading, refetch: fetchTodayAppointments };
};
