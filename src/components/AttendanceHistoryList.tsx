import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface AttendanceRecord {
  id: string;
  attendance_date: string;
  duration_seconds: number;
  queixa_principal: string;
  historia_molestia: string;
  hipotese_diagnostica: string;
  condutas: string;
  peso: number;
  altura: number;
  imc: number;
}

interface AttendanceHistoryListProps {
  patientId: string;
}

export const AttendanceHistoryList = ({ patientId }: AttendanceHistoryListProps) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceHistory();
  }, [patientId]);

  const fetchAttendanceHistory = async () => {
    try {
      const supabaseClient: any = supabase;
      const { data, error } = await supabaseClient
        .from('attendance_history')
        .select('*')
        .eq('patient_id', patientId)
        .order('attendance_date', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching attendance history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center text-muted-foreground p-6">Carregando histórico...</div>;
  }

  if (records.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          Nenhum atendimento registrado ainda.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(record.attendance_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Duração: {formatDuration(record.duration_seconds)}</span>
              </div>
            </div>
            {record.imc && (
              <div className="text-right">
                <div className="text-sm font-medium">IMC: {record.imc.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {record.peso}kg / {record.altura}cm
                </div>
              </div>
            )}
          </div>

          {record.queixa_principal && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Queixa Principal:</h4>
              <p className="text-sm text-muted-foreground">{record.queixa_principal}</p>
            </div>
          )}

          {record.historia_molestia && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">História da Moléstia:</h4>
              <p className="text-sm text-muted-foreground line-clamp-3">{record.historia_molestia}</p>
            </div>
          )}

          {record.hipotese_diagnostica && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Hipótese Diagnóstica:</h4>
              <p className="text-sm text-muted-foreground">{record.hipotese_diagnostica}</p>
            </div>
          )}

          {record.condutas && (
            <div>
              <h4 className="text-sm font-semibold mb-1">Condutas:</h4>
              <p className="text-sm text-muted-foreground">{record.condutas}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
