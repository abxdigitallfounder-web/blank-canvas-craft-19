import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import testimonialImage from "@/assets/testimonial-doctor.jpg";

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            O que dizem sobre o Amparo
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <img
                    src={testimonialImage}
                    alt="Dra. Luciana Nabuth"
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <Quote className="w-12 h-12 text-primary/20" />
                  <p className="text-lg text-muted-foreground italic">
                    Consegui deixar o layout do atendimento com a minha cara, do jeito que eu preciso. 
                    Ficou bem personalizado para mim. É algo que eu gosto muito no Amparo, poder deixar 
                    as peças exatamente do jeito que você quer.
                  </p>
                  <div>
                    <p className="font-bold text-primary">Dra. Luciana Nabuth</p>
                    <p className="text-sm text-muted-foreground">Pediatra</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-2 mt-8">
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <div className="w-12 h-1 bg-border rounded-full"></div>
            <div className="w-12 h-1 bg-border rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
