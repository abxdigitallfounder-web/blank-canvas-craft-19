import { DashboardHeader } from "@/components/DashboardHeader";
import { ConfiguracoesSidebar } from "@/components/ConfiguracoesSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ConfiguracoesConvenios = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <ConfiguracoesSidebar />
        <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Convênios</h1>

        <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
          <p className="text-sm">
            Você está alterando as configurações da clínica:{" "}
            <span className="font-semibold">Clínica Arthur Batista Miranda de Oliveira</span>
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Cadastre todos os convênios que os profissionais de saúde da sua clínica atendem.
          </p>
          
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              NOVO CONVÊNIO
            </Button>
          </div>

          <div className="mt-6 p-8 text-center text-muted-foreground">
            <p className="text-sm">Nenhum registro encontrado.</p>
          </div>
        </Card>
        </main>
      </div>
    </div>
  );
};

export default ConfiguracoesConvenios;
