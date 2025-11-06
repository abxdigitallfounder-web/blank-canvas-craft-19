import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ConfiguracoesSidebar } from "@/components/ConfiguracoesSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const Configuracoes = () => {
  const [clinicData, setClinicData] = useState({
    name: "Clínica Arthur Batista Miranda de Oliveira",
    email: "arthurbatista12312@gmail.com",
    cnes: ""
  });
  const [newPhone, setNewPhone] = useState("");
  const [phones, setPhones] = useState<string[]>([]);

  const handleAddPhone = () => {
    if (newPhone.trim()) {
      setPhones([...phones, newPhone]);
      setNewPhone("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <ConfiguracoesSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Clínicas</h1>

          <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
            <p className="text-sm">
              Você está alterando as informações da clínica:{" "}
              <span className="font-semibold">Clínica Arthur Batista Miranda de Oliveira</span>
            </p>
          </Card>

          {/* Dados da Clínica */}
          <Card className="p-6 mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
              Dados da Clínica
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={clinicData.name}
                  onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={clinicData.email}
                  onChange={(e) => setClinicData({ ...clinicData, email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cnes" className="text-sm font-medium">
                  CNES
                </Label>
                <Input
                  id="cnes"
                  value={clinicData.cnes}
                  onChange={(e) => setClinicData({ ...clinicData, cnes: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          {/* Telefones */}
          <Card className="p-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
              Telefones
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Novo telefone
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="phone"
                    placeholder="(99) 99999-9999"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAddPhone}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Adicionar
                  </Button>
                </div>
              </div>

              {phones.length > 0 && (
                <div className="space-y-2">
                  {phones.map((phone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <span className="text-sm">{phone}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPhones(phones.filter((_, i) => i !== index))}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;