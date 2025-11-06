import { Calendar, TrendingUp, FileText, Users, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Agenda Médica",
    description: "Ganhe mais visibilidade dos atendimentos no consultório",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Gestão Financeira",
    description: "Visualize todas as suas finanças em único lugar",
    color: "text-accent"
  },
  {
    icon: FileText,
    title: "Prontuário Eletrônico",
    description: "Customize o prontuário de acordo com sua prática",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Gestão de Pacientes",
    description: "Centralize todas as informações dos seus pacientes",
    color: "text-accent"
  },
  {
    icon: MessageSquare,
    title: "Comunicação",
    description: "Lembretes de consulta por SMS, e-mail e WhatsApp",
    color: "text-primary"
  },
  {
    icon: Clock,
    title: "Relatórios Automáticos",
    description: "Obtenha relatórios e gráficos automáticos da clínica",
    color: "text-accent"
  }
];

const Features = () => {
  return (
    <section id="funcionalidades" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Conheça nossas funcionalidades
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                <CardContent className="p-6 lg:p-8">
                  <div className={`mb-4 ${feature.color}`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
