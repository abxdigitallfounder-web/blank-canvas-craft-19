import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Amparo</span>
              <span className="text-xl font-light text-muted-foreground">Clinic</span>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            <a href="#funcionalidades" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Funcionalidades
            </a>
            <a href="#beneficios" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Benefícios
            </a>
            <a href="#depoimentos" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Depoimentos
            </a>
            <Button variant="default" className="bg-primary hover:bg-primary-dark">
              Testar Gratuitamente
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
