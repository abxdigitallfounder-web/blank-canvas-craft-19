import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
const authSchema = z.object({
  email: z.string().trim().email({
    message: "Email inválido"
  }).max(255),
  password: z.string().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres"
  }).max(100)
});
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkSession();
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    try {
      authSchema.parse({
        email,
        password
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive"
        });
        return;
      }
    }
    setLoading(true);
    try {
      if (isLogin) {
        // Login
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Erro ao fazer login",
              description: "Email ou senha incorretos",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Erro ao fazer login",
              description: error.message,
              variant: "destructive"
            });
          }
          return;
        }
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando..."
        });
        navigate("/dashboard");
      } else {
        // Sign up
        const redirectUrl = `${window.location.origin}/dashboard`;
        const {
          error
        } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              title: "Erro ao criar conta",
              description: "Este email já está cadastrado",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Erro ao criar conta",
              description: error.message,
              variant: "destructive"
            });
          }
          return;
        }
        toast({
          title: "Conta criada com sucesso!",
          description: "Você já pode acessar o sistema"
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Afya</span>{" "}
            <span className="text-foreground font-normal">iCLINIC</span>
          </h1>
          <p className="text-muted-foreground">
            Teste grátis, não pedimos seu cartão de crédito.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} className="h-12" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Ao menos 8 caracteres" required disabled={loading} className="h-12 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-lg font-semibold text-white bg-[#ffc303]">
            {loading ? "Carregando..." : "Avançar"}
          </Button>
        </form>

        <div className="text-sm text-muted-foreground text-center">
          Ao clicar em "Avançar", você aceita nossos{" "}
          <a href="#" className="text-primary hover:underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>
          .
        </div>

        <div className="text-center text-sm">
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? "Criar nova conta" : "Já possui uma conta? Acesse aqui"}
          </button>
        </div>
      </div>
    </div>;
};
export default Auth;