import { Calendar, CheckCircle, Circle, XCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTodayAppointments } from "@/hooks/useTodayAppointments";
import { useMemo } from "react";

export const DashboardStats = () => {
  const { appointments, loading } = useTodayAppointments();

  const stats = useMemo(() => {
    const scheduled = appointments.filter(a => a.status === 'Agendado').length;
    const confirmed = appointments.filter(a => a.status === 'Confirmado').length;
    const attended = appointments.filter(a => a.status === 'Finalizado').length;
    const missed = appointments.filter(a => a.status === 'Cancelado').length;

    return [
      {
        label: "Pacientes agendados",
        value: scheduled,
        icon: Calendar,
      },
      {
        label: "Pacientes confirmados",
        value: confirmed,
        icon: CheckCircle,
      },
      {
        label: "Pacientes atendidos",
        value: attended,
        icon: CheckCircle,
      },
      {
        label: "Pacientes que faltaram",
        value: missed,
        icon: XCircle,
      },
    ];
  }, [appointments]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 text-center">
              <div className="h-10 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-4 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-5 w-5 mx-auto bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
            <stat.icon className="h-5 w-5 mx-auto text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
