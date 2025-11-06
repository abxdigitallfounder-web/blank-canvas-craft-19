const Footer = () => {
  return (
    <footer className="bg-foreground/5 py-12 pb-24 lg:pb-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-primary">Amparo</span>
            <span className="text-xl font-light text-muted-foreground">Clinic</span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Software médico completo para gestão clínica e prontuário eletrônico. 
            Transforme a administração do seu consultório com tecnologia de ponta.
          </p>
          <div className="pt-8 text-sm text-muted-foreground">
            © 2024 Amparo Clinic. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
