import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, CheckSquare, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePatients } from "@/hooks/usePatients";

const Pacientes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { patients, loading } = usePatients();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.cpf?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      {/* Trial Banner */}
      <div className="bg-green-50 border-b border-green-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <p className="text-sm text-green-800">
            Bem vindo ao iClinic. Seu período de avaliação termina em <strong>5 dias</strong>
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Assine agora
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Prontuários</h1>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Digite o nome, código, telefone ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar profissionais" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os profissionais</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm">
            <CheckSquare className="h-4 w-4 mr-2" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled
            >
              NOVO PACIENTE
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>NOME</TableHead>
                <TableHead>TELEFONE</TableHead>
                <TableHead>CÓDIGO</TableHead>
                <TableHead>ÚLTIMA CONSULTA</TableHead>
                <TableHead>DATA DE NASCIMENTO</TableHead>
                <TableHead>CONVÊNIOS</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Nenhum paciente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <a href="#" className="text-primary hover:underline font-medium">
                        {patient.name}
                      </a>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{patient.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{patient.code || "-"}</TableCell>
                    <TableCell className="text-muted-foreground">-</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(patient.birth_date)}</TableCell>
                    <TableCell className="text-muted-foreground">{patient.insurance_type || "Particular"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          {filteredPatients.length} {filteredPatients.length === 1 ? "resultado" : "resultados"}
        </p>
      </main>
    </div>
  );
};

export default Pacientes;
