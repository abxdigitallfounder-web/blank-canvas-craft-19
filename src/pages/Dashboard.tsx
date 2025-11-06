import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardCharts } from "@/components/DashboardCharts";
import { TodayAppointmentsList } from "@/components/TodayAppointmentsList";
import { AppointmentsLineChart } from "@/components/AppointmentsLineChart";
import { AgeDistributionChart } from "@/components/AgeDistributionChart";
import { BirthdaysChart } from "@/components/BirthdaysChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          {/* Trial Banner */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6 flex items-center justify-between">
            <p className="text-sm text-green-800">
              Bem vindo ao iClinic. Seu período de avaliação termina em 6 dias
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Assine agora
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Período</span>
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Esta semana</SelectItem>
                  <SelectItem value="mes">Este mês</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="periodo">Período de...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">Profissional</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[250px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Arthur Batista Miranda de Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Charts Section */}
          <div className="mt-6">
            <DashboardCharts />
          </div>

          {/* Bottom Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#3B82F6]">
                  Atendimentos no período
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AppointmentsLineChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#3B82F6]">
                  Aniversariantes do dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BirthdaysChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#3B82F6]">
                  Distribuição etária
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AgeDistributionChart />
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <div className="mt-6">
            <TodayAppointmentsList />
          </div>
        </main>
      </div>

      {/* Fixed Chat Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs text-destructive-foreground flex items-center justify-center">
          0
        </span>
      </Button>
    </div>
  );
};

export default Dashboard;
