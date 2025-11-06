import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useTodayAppointments } from "@/hooks/useTodayAppointments";
import { Clock, Phone, User } from "lucide-react";
export const TodayAppointmentsList = () => {
  const {
    appointments,
    loading
  } = useTodayAppointments();
  if (loading) {
    return <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-primary">
            Pacientes do dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded"></div>)}
          </div>
        </CardContent>
      </Card>;
  }
  if (appointments.length === 0) {
    return <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-primary">
            Pacientes do dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground text-center py-8">
            Nenhum paciente agendado para hoje
          </p>
        </CardContent>
      </Card>;
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Finalizado':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  return;
};