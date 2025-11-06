import { Button } from "@/components/ui/button";
import partnershipImage from "@/assets/partnership.jpg";

const Partnership = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={partnershipImage}
              alt="Seja nosso parceiro"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Seja nosso parceiro
            </h2>
            <p className="text-lg text-muted-foreground">
              Você é de um escritório de contabilidade, consultoria ou agência de marketing? 
              Seja parceiro do software médico que mais cresce no Brasil.
            </p>
            <Button 
              variant="default" 
              size="lg"
              className="bg-primary hover:bg-primary-dark"
            >
              Quero ser um parceiro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
