import { Bell, MessageSquare, Settings, User, Building2, Users, CreditCard, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  
  return <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-14 items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            <span className="text-primary">Amparo</span>{" "}
            <span className="text-muted-foreground font-normal">iCLINIC</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm ml-8">
          <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Painel
          </a>
          <a href="/agenda" className="text-muted-foreground hover:text-foreground transition-colors">
            Agenda
          </a>
          <a href="/pacientes" className="text-muted-foreground hover:text-foreground transition-colors">
            Prontuários
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Gestão
          </a>
          
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Marketing
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Outros
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => navigate("/configuracoes/clinica")}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background z-50">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-base font-semibold text-primary">Arthur Batista Miranda</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/configuracoes/conta")} className="py-3 cursor-pointer">
                <Settings className="mr-3 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Configurações da Conta</span>
                  <span className="text-xs text-muted-foreground">Assinatura, Cobrança, Clínicas, Usuários</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/configuracoes/clinica")} className="py-3 cursor-pointer">
                <Building2 className="mr-3 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Configurações da Clínica</span>
                  <span className="text-xs text-muted-foreground">Perfil da Clínica, Convênios, Finanças</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                <Users className="mr-3 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Configurações de Profissionais</span>
                  <span className="text-xs text-muted-foreground">Agenda, Convênios, Procedimentos</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer">
                <CreditCard className="mr-3 h-4 w-4" />
                <span className="font-medium">Planos e assinatura</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-3 cursor-pointer">
                <User className="mr-3 h-4 w-4" />
                <span className="font-medium">Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};