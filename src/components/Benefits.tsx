import { Clock, Wallet, BarChart3, Cloud } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Tenha mais tempo para você e seus pacientes",
    color: "text-primary"
  },
  {
    icon: Wallet,
    title: "Visualize todas as suas finanças em único lugar",
    color: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Obtenha relatórios e gráficos automáticos da clínica",
    color: "text-primary"
  },
  {
    icon: Cloud,
    title: "Acesse seus dados de qualquer lugar",
    color: "text-primary"
  }
];

const Benefits = () => {
  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Otimize os processos do dia a dia da clínica
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-card rounded-xl hover:shadow-md transition-all"
              >
                <div className={`${benefit.color} mt-1`}>
                  <Icon className="w-8 h-8" />
                </div>
                <p className="text-lg text-foreground font-medium">
                  {benefit.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
            Quero testar gratuitamente
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
