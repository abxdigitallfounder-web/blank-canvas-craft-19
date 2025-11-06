import { Shield, Headphones, MousePointer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const differentials = [
  {
    icon: Shield,
    title: "Segurança",
    description: "Além de possuir criptografia de ponta e segurança de nível bancário, fazemos backups diários do sistema para que nada se perca."
  },
  {
    icon: Headphones,
    title: "Atendimento",
    description: "Você terá o suporte da nossa equipe em toda sua experiência Amparo, seja para primeiros passos no sistema ou dúvidas mais avançadas."
  },
  {
    icon: MousePointer,
    title: "Fácil de usar",
    description: "Recebemos elogios sobre a usabilidade do Amparo todos os dias, mas nunca paramos de pensar em como torná-lo ainda mais intuitivo!"
  }
];

const Differentials = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Conheça nossos diferenciais
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border-border hover:shadow-lg transition-all">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
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

export default Differentials;
