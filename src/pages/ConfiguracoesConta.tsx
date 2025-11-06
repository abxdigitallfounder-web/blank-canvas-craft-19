import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

const ConfiguracoesConta = () => {
  const [activeTab, setActiveTab] = useState("usuarios");

  const menuItems = [
    { id: "usuarios", label: "Usuários" },
    { id: "clinicas", label: "Clínicas" },
    { id: "comunicacao", label: "Comunicação" },
    { id: "exportar", label: "Exportar dados" }
  ];

  const subMenuItems = [
    { id: "permissoes", label: "Permissões de envio" },
    { id: "sms", label: "SMS enviados" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background p-4">
          <h2 className="text-lg font-semibold mb-4">Configurações da conta</h2>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4">
              <p className="text-sm font-medium text-blue-600 px-3 mb-2">Comunicação</p>
              {subMenuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full text-left px-6 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Trial Banner */}
          <Card className="p-4 mb-6 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <p className="text-sm">
                Bem vindo ao iClinic. Seu período de avaliação termina em <span className="font-semibold">5 dias</span>
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Assine agora
              </Button>
            </div>
          </Card>

          <h1 className="text-2xl font-semibold mb-6">Usuários</h1>

          {/* Profissionais de Saúde */}
          <Card className="mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-blue-600 uppercase">
                  Profissionais de Saúde
                </h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  ADICIONAR PROFISSIONAL DE SAÚDE
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-muted/50 border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Table Content */}
                <div className="divide-y">
                  <div className="grid grid-cols-12 items-center px-4 py-3 text-sm font-medium text-muted-foreground bg-muted/30">
                    <div className="col-span-1">
                      <Checkbox />
                    </div>
                    <div className="col-span-4">NOME</div>
                    <div className="col-span-4">ESPECIALIDADE</div>
                    <div className="col-span-3">CRIADO EM</div>
                  </div>

                  <div className="grid grid-cols-12 items-center px-4 py-4 text-sm hover:bg-muted/50 transition-colors">
                    <div className="col-span-1">
                      <Checkbox />
                    </div>
                    <div className="col-span-4">
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        Arthur Batista Miranda de Oliveira
                      </span>
                    </div>
                    <div className="col-span-4 text-muted-foreground">
                      CBO desconhecido ou não informado pelo solicitante
                    </div>
                    <div className="col-span-3 text-muted-foreground">
                      04/11/2025 às 22:50
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Recepcionistas */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-blue-600 uppercase">
                  Recepcionistas
                </h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  ADICIONAR RECEPCIONISTA
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-muted/50 border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Empty State */}
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg py-3 px-4 inline-block">
                    Nenhum registro encontrado.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ConfiguracoesConta;
