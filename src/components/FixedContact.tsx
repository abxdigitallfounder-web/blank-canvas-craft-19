import { MessageCircle, Phone } from "lucide-react";

const FixedContact = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-0">
          <button className="flex items-center justify-center gap-2 py-4 text-primary hover:bg-primary/5 transition-colors border-r border-border">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Chat Online</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-4 text-primary hover:bg-primary/5 transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-medium">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedContact;
