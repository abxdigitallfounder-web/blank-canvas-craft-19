import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PatientsPieChart } from "./PatientsPieChart";
import { ProceduresPieChart } from "./ProceduresPieChart";
import { InsurancePieChart } from "./InsurancePieChart";
import { AppointmentDurationChart } from "./AppointmentDurationChart";
import { GenderDistributionChart } from "./GenderDistributionChart";

export const DashboardCharts = () => {
  return (
    <div className="space-y-4">
      {/* First row - 4 chart cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-[#3B82F6]">
              Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <PatientsPieChart />
            <div className="mt-6">
              <GenderDistributionChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-[#3B82F6]">
              Procedimentos realizados
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <ProceduresPieChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-[#3B82F6]">
              Pacientes x Convênio
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <InsurancePieChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-[#3B82F6]">
              Duração do atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <AppointmentDurationChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
