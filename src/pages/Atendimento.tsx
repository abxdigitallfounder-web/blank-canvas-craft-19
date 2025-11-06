import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info, User } from "lucide-react";

const Atendimento = () => {
  const [searchParams] = useSearchParams();
  const patientName = searchParams.get("patient") || "";
  const [activeTab, setActiveTab] = useState("dados-pessoais");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background p-6">
          <h2 className="text-xl font-semibold mb-6">Cadastros</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dados-pessoais")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "dados-pessoais" ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
              }`}
            >
              Dados pessoais
            </button>
            <button
              onClick={() => setActiveTab("dados-complementares")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "dados-complementares" ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
              }`}
            >
              Dados complementares
            </button>
            <button
              onClick={() => setActiveTab("convenios")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "convenios" ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
              }`}
            >
              Convênios
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Trial Banner */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6 flex items-center justify-between">
            <p className="text-sm text-green-800">
              Bem vindo ao iClinic. Seu período de avaliação termina em 5 dias
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Assine agora
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Form Section */}
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-6">{patientName || "Novo Paciente"}</h1>

              <div className="bg-card rounded-lg border p-6">
                {activeTab === "dados-pessoais" && (
                  <>
                    <h3 className="text-primary font-semibold mb-6 flex items-center gap-2">
                      GERAL
                    </h3>

                    <div className="space-y-6">
                      {/* Nome e Código */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Nome*
                          </Label>
                          <Input defaultValue={patientName} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold flex items-center gap-2">
                            Código
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Label>
                          <Input />
                        </div>
                      </div>

                      {/* Data de nascimento */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">
                            Data de nasc.*
                          </Label>
                          <Input placeholder="__/__/__" />
                        </div>
                      </div>

                      {/* Sexo */}
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">Sexo*</Label>
                        <RadioGroup defaultValue="masculino" className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="masculino" id="masculino" />
                            <Label htmlFor="masculino" className="font-normal cursor-pointer">Masculino</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feminino" id="feminino" />
                            <Label htmlFor="feminino" className="font-normal cursor-pointer">Feminino</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Nome civil */}
                      <div className="flex items-center space-x-2">
                        <Checkbox id="nome-civil" />
                        <Label htmlFor="nome-civil" className="font-normal cursor-pointer flex items-center gap-2">
                          Nome civil
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                      </div>

                      {/* Gênero */}
                      <div className="flex items-center space-x-2">
                        <Checkbox id="genero" />
                        <Label htmlFor="genero" className="font-normal cursor-pointer flex items-center gap-2">
                          Gênero (opcional) para o paciente
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                      </div>

                      {/* E-mail */}
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">E-mail</Label>
                        <Input type="email" />
                      </div>

                      {/* CPF e RG */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">CPF</Label>
                          <Input placeholder="___.___.___-__" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold">RG</Label>
                          <Input />
                        </div>
                      </div>

                      {/* Observações */}
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">Observações</Label>
                        <Textarea rows={4} />
                      </div>

                      <p className="text-xs italic text-muted-foreground">
                        * Esta informação será visível somente para você.
                      </p>

                      {/* Como conheceu */}
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">Como conheceu?</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="internet">Internet</SelectItem>
                            <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "dados-complementares" && (
                  <div className="space-y-8">
                    {/* DADOS COMPLEMENTARES */}
                    <div>
                      <h3 className="text-primary font-semibold mb-6">
                        DADOS COMPLEMENTARES
                      </h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Naturalidade</Label>
                            <Input />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Estado</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sp">São Paulo</SelectItem>
                                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                                <SelectItem value="mg">Minas Gerais</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Nacionalidade</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="brasileira">Brasileira</SelectItem>
                                <SelectItem value="estrangeira">Estrangeira</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Étnia</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="branca">Branca</SelectItem>
                                <SelectItem value="preta">Preta</SelectItem>
                                <SelectItem value="parda">Parda</SelectItem>
                                <SelectItem value="amarela">Amarela</SelectItem>
                                <SelectItem value="indigena">Indígena</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Religião</Label>
                            <Input />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Estado civil</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                                <SelectItem value="casado">Casado(a)</SelectItem>
                                <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                                <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Escolaridade</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fundamental">Fundamental</SelectItem>
                                <SelectItem value="medio">Médio</SelectItem>
                                <SelectItem value="superior">Superior</SelectItem>
                                <SelectItem value="pos">Pós-graduação</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Profissão</Label>
                            <Input />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="obito" />
                            <Label htmlFor="obito" className="font-normal cursor-pointer">Óbito</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="ativo" defaultChecked />
                            <Label htmlFor="ativo" className="font-normal cursor-pointer">Ativo*</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DADOS FAMILIARES */}
                    <div>
                      <h3 className="text-primary font-semibold mb-6">
                        DADOS FAMILIARES
                      </h3>

                      <div className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 items-end">
                        <div className="space-y-2">
                          <Label className="text-xs">Nome</Label>
                          <div className="relative">
                            <Input className="pr-8" />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-0 top-0 h-full"
                            >
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Parentesco</Label>
                          <div className="relative">
                            <Input className="pr-8" />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-0 top-0 h-full"
                            >
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Profissão</Label>
                          <Input />
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">
                          ADICIONAR
                        </Button>
                      </div>
                    </div>

                    {/* OUTRAS INFORMAÇÕES */}
                    <div>
                      <h3 className="text-primary font-semibold mb-6">
                        OUTRAS INFORMAÇÕES
                      </h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs">CNS</Label>
                          <Input />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Informações adicionais</Label>
                          <Textarea rows={4} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "convenios" && (
                  <div>
                    <h3 className="text-primary font-semibold mb-6">
                      CONVÊNIOS
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Adicione os convênios do paciente aqui.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="w-80">
              <div className="bg-card rounded-lg border p-6 sticky top-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Imagem de perfil</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Sua imagem deve ter no máximo 250x250p e 1MB.
                  </p>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                    EDITAR FOTO
                  </Button>
                  <p className="text-xs text-muted-foreground mt-6">
                    Paciente cadastrado em
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Atendimento;
