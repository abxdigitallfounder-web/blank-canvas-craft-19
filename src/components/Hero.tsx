import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-doctor.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Software médico Amparo
              </span>
              <div className="h-1 w-24 bg-primary mt-2 rounded-full"></div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Gestão clínica e prontuário eletrônico
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
              Conquiste uma gestão clínica de excelência com um software médico feito para você
            </p>
            
            <Button 
              size="lg" 
              onClick={() => navigate("/cadastro")}
              className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Quero testar gratuitamente
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Profissional médica sorrindo"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
