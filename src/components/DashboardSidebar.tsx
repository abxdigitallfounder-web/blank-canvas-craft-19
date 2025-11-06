import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useTodayAppointments } from "@/hooks/useTodayAppointments";
export const DashboardSidebar = () => {
  const navigate = useNavigate();
  const {
    appointments,
    loading
  } = useTodayAppointments();
  return <aside className="w-48 border-r bg-background p-4 flex flex-col justify-between h-full">
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Pacientes do dia</h3>
        {loading ? <div className="text-xs text-muted-foreground text-center py-4">
            Carregando...
          </div> : appointments.length === 0 ? <div className="text-xs text-muted-foreground text-center py-4">
            Nenhum paciente agendado para hoje
          </div> : <div className="space-y-3">
            {appointments.map(patient => <HoverCard key={patient.id} openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="border-b pb-3 last:border-b-0 last:pb-0 cursor-pointer hover:bg-muted/50 rounded px-1 -mx-1">
                    {patient.isFirstTime && <Badge className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-1.5 py-0 h-4 mb-1">
                        PRIMEIRA VEZ
                      </Badge>}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-primary font-medium text-xs">{patient.time}</div>
                        <div className="text-foreground text-xs">{patient.name}</div>
                      </div>
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4" side="right" align="start">
                  <div className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold">Status:</span>{" "}
                        <span className="text-muted-foreground">{patient.status}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Telefone:</span>{" "}
                        <span className="text-muted-foreground">{patient.phone}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Convênio:</span>{" "}
                        <span className="text-muted-foreground">{patient.insurance}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Procedimento:</span>{" "}
                        <span className="text-muted-foreground">{patient.procedure}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-white" onClick={() => navigate(`/prontuarios?patient=${encodeURIComponent(patient.name)}`)}>
                      ATENDER
                    </Button>

                    <p className="text-xs text-muted-foreground">
                      *Agendado para {new Date(patient.scheduledTime).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>)}
          </div>}
      </div>

      
    </aside>;
};