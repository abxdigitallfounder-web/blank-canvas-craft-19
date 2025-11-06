import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  DollarSign, 
  Tag, 
  Landmark, 
  Settings as SettingsIcon,
  Users,
  Shield,
  ArrowLeftRight
} from "lucide-react";

export const ConfiguracoesSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "perfil", icon: Home, label: "Perfil da clínica", path: "/configuracoes/clinica" },
    { id: "convenios", icon: FileText, label: "Convênios", path: "/configuracoes/clinica/convenios" }
  ];

  const financeItems = [
    { id: "categorias", icon: Tag, label: "Categorias financeiras", path: "/configuracoes/clinica/categorias" },
    { id: "centro-custo", icon: DollarSign, label: "Centro de custo", path: "/configuracoes/clinica/centro-custo" },
    { id: "config-financeiras", icon: SettingsIcon, label: "Configurações financeiras", path: "/configuracoes/clinica/config-financeiras" },
    { id: "contas-bancarias", icon: Landmark, label: "Contas bancárias", path: "/configuracoes/clinica/contas-bancarias" }
  ];

  const otherItems = [
    { id: "equipe", icon: Users, label: "Equipe", path: "/configuracoes/clinica/equipe" },
    { id: "permissoes", icon: Shield, label: "Permissões", path: "/configuracoes/clinica/permissoes" },
    { id: "regras-repasse", icon: ArrowLeftRight, label: "Regras de repasse", path: "/configuracoes/clinica/regras-repasse" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 border-r bg-background p-4">
      <h2 className="text-lg font-semibold mb-4">Configurações de Clínica</h2>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isActive(item.path)
                ? "bg-blue-50 text-blue-600"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}

        <div className="pt-4 pb-2">
          <p className="text-xs font-semibold text-muted-foreground px-3 mb-2">FINANÇAS</p>
          {financeItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        {otherItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isActive(item.path)
                ? "bg-blue-50 text-blue-600"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
