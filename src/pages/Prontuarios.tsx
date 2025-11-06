import { useState, useEffect, useRef } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Play, Clock, ChevronDown, Plus, X, Printer, Download, Upload, Calendar, Bold, Italic, Underline, Strikethrough, List, ListOrdered, AlignLeft, Type, RotateCcw, Search, Trash2, FileText, Settings, History, ChevronRight, Info, Mail, Eye } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AttendanceHistoryList } from "@/components/AttendanceHistoryList";
const Prontuarios = () => {
  const [searchParams] = useSearchParams();
  const patientName = searchParams.get("patient") || "Paciente";
  const patientId = searchParams.get("patientId");
  const { toast } = useToast();
  const [duration, setDuration] = useState("00:00:00");
  const [isAttendanceActive, setIsAttendanceActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showDiagnosticos, setShowDiagnosticos] = useState(false);
  const [showTabelaAcompanhamento, setShowTabelaAcompanhamento] = useState(false);
  const [activeSection, setActiveSection] = useState("historico");
  const [sections, setSections] = useState({
    clinicos: "",
    cirurgicos: "",
    familiares: "",
    habitos: "",
    alergias: "",
    medicamentos: ""
  });
  const [attendanceData, setAttendanceData] = useState({
    queixaPrincipal: "",
    historiaMolestia: "",
    historicoAntecedentes: "",
    exameFisico: "",
    peso: "",
    altura: "",
    hipoteseDiagnostica: "",
    condutas: ""
  });
  const calculateIMC = () => {
    const peso = parseFloat(attendanceData.peso);
    const altura = parseFloat(attendanceData.altura);
    if (peso && altura && altura > 0) {
      const imc = peso / (altura / 100) ** 2;
      return imc.toFixed(1);
    }
    return "0";
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAttendanceActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor(newSeconds % 3600 / 60);
          const secs = newSeconds % 60;
          setDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
          return newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAttendanceActive]);
  const handleToggleAttendance = () => {
    setIsAttendanceActive(!isAttendanceActive);
  };

  const handleFinishAttendance = async () => {
    if (!patientId) {
      toast({
        title: "Erro",
        description: "ID do paciente não encontrado",
        variant: "destructive"
      });
      return;
    }

    try {
      const imc = calculateIMC();
      
      const supabaseClient: any = supabase;
      const { data, error } = await supabaseClient
        .from('attendance_history')
        .insert({
          patient_id: patientId,
          duration_seconds: seconds,
          queixa_principal: attendanceData.queixaPrincipal,
          historia_molestia: attendanceData.historiaMolestia,
          historico_antecedentes: attendanceData.historicoAntecedentes,
          exame_fisico: attendanceData.exameFisico,
          peso: parseFloat(attendanceData.peso) || null,
          altura: parseFloat(attendanceData.altura) || null,
          imc: parseFloat(imc) || null,
          hipotese_diagnostica: attendanceData.hipoteseDiagnostica,
          condutas: attendanceData.condutas
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Atendimento finalizado e salvo no histórico do paciente"
      });

      // Reset form and timer
      setIsAttendanceActive(false);
      setSeconds(0);
      setDuration("00:00:00");
      setAttendanceData({
        queixaPrincipal: "",
        historiaMolestia: "",
        historicoAntecedentes: "",
        exameFisico: "",
        peso: "",
        altura: "",
        hipoteseDiagnostica: "",
        condutas: ""
      });
      setActiveSection("historico");
    } catch (error: any) {
      toast({
        title: "Erro ao salvar atendimento",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const getInitials = (name: string) => {
    return name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2);
  };
  return <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[180px] border-r bg-[#fafafa] py-6 px-4 space-y-6">
          <h3 className="text-sm font-semibold text-foreground">Prontuário</h3>
          
          <Button onClick={handleToggleAttendance} className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-md h-9 text-sm font-medium">
            <Play className="h-3.5 w-3.5 mr-2 fill-white" />
            {isAttendanceActive ? 'Parar atendimento' : 'Iniciar atendimento'}
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-normal">Duração</span>
            <span className="ml-auto font-normal">{duration}</span>
          </div>

          <div className="space-y-1">
            <div className={`text-sm cursor-pointer py-1 transition-colors ${activeSection === 'historico' ? 'font-medium text-blue-600' : 'text-[#6b7280] hover:text-foreground'}`} onClick={() => setActiveSection('historico')}>
              Histórico de Consulta
            </div>
            <div className={`text-sm cursor-pointer py-1 transition-colors ${activeSection === 'tabela' ? 'font-medium text-blue-600' : 'text-[#6b7280] hover:text-foreground'}`} onClick={() => setActiveSection('tabela')}>
              Tabela de acompanhamentos
            </div>
            
            {isAttendanceActive && <>
                <div className={`text-sm cursor-pointer py-1 transition-colors ${activeSection === 'atendimento' ? 'font-medium text-blue-600' : 'text-[#6b7280] hover:text-foreground'}`} onClick={() => setActiveSection('atendimento')}>
                  Atendimento
                </div>
                <div className={`text-sm cursor-pointer py-1 transition-colors ${activeSection === 'exames' ? 'font-medium text-blue-600' : 'text-[#6b7280] hover:text-foreground'}`} onClick={() => setActiveSection('exames')}>
                  Exames e procedimentos
                </div>
                <div className={`text-sm cursor-pointer py-1 transition-colors ${activeSection === 'prescricoes' ? 'font-medium text-blue-600' : 'text-[#6b7280] hover:text-foreground'}`} onClick={() => setActiveSection('prescricoes')}>
                  Prescrições
                </div>
                <div className={`text-sm cursor-pointer py-1 transition-colors ${activeSection === 'documentos' ? 'font-medium text-blue-600' : 'text-[#6b7280] hover:text-foreground'}`} onClick={() => setActiveSection('documentos')}>
                  Documentos e atestados
                </div>
                <div className={`text-sm cursor-pointer py-1 transition-colors ${activeSection === 'imagens' ? 'font-medium text-blue-600' : 'text-[#6b7280] hover:text-foreground'}`} onClick={() => setActiveSection('imagens')}>
                  Imagens e anexos
                </div>
              </>}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-5 px-6 overflow-auto bg-white">
          {/* Banner */}
          <div className="bg-[#dbeafe] border border-[#bfdbfe] rounded-lg px-4 py-3 mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#1e40af] text-sm mb-0.5">iClinic de cara nova!</h3>
              <p className="text-xs text-[#1e40af] leading-relaxed">
                Você está testando o novo iClinic, feito para deixar o seu atendimento moderno, prático e ainda mais inteligente. Caso prefira, você pode voltar para a versão anterior.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-[#2563eb] hover:bg-blue-50 text-xs h-8 underline">
                Voltar para a versão anterior
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4 text-[#1e40af]" />
              </Button>
            </div>
          </div>

          {/* Add Tag Button */}
          <Button variant="outline" size="sm" className="mb-5 h-8 text-xs border-[#e5e7eb] text-[#6b7280]">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Adicionar Tag
          </Button>

          {/* Patient Card */}
          <Card className="p-5 mb-5 shadow-sm border-[#e5e7eb]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-[#7c8994]">
                  <AvatarFallback className="text-white text-xl font-medium">
                    {getInitials(patientName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold mb-1.5 text-[#1f2937]">{patientName}</h2>
                  <div className="space-y-0.5 text-xs">
                    <div>
                      <span className="font-medium text-[#1f2937]">Idade:</span>{" "}
                      <span className="text-[#6b7280]">83 anos, 1 dia</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#1f2937]">Convênio:</span>{" "}
                      <span className="text-[#6b7280]">Particular</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#1f2937]">Primeira consulta:</span>{" "}
                      <span className="text-[#6b7280]">Sem registro</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4 text-[#6b7280]" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="h-4 w-4 text-[#6b7280]" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4 text-[#6b7280]" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Attendance Section */}
          {isAttendanceActive && activeSection === 'atendimento' ? <div className="space-y-6">
              {/* Attendance Header with Date */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Atendimento</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                </div>
              </div>

              {/* Queixa Principal */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Queixa principal:</label>
                <Textarea value={attendanceData.queixaPrincipal} onChange={e => setAttendanceData(prev => ({
              ...prev,
              queixaPrincipal: e.target.value
            }))} className="min-h-[80px]" />
              </div>

              {/* História da Moléstia Atual */}
              <div className="space-y-2">
                <label className="text-sm font-medium">História da moléstia atual:</label>
                <div className="border rounded-lg">
                  <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Type className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm">Salvar Modelo</Button>
                      <Button variant="outline" size="sm">Usar modelo</Button>
                    </div>
                  </div>
                  <Textarea value={attendanceData.historiaMolestia} onChange={e => setAttendanceData(prev => ({
                ...prev,
                historiaMolestia: e.target.value
              }))} className="min-h-[150px] border-0 focus-visible:ring-0" />
                </div>
              </div>

              {/* Histórico e Antecedentes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Histórico e antecedentes:</label>
                <div className="border rounded-lg">
                  <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Type className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm">Salvar Modelo</Button>
                      <Button variant="outline" size="sm">Usar modelo</Button>
                    </div>
                  </div>
                  <Textarea value={attendanceData.historicoAntecedentes} onChange={e => setAttendanceData(prev => ({
                ...prev,
                historicoAntecedentes: e.target.value
              }))} className="min-h-[150px] border-0 focus-visible:ring-0" />
                </div>
              </div>

              {/* Exame Físico */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Exame físico:</label>
                <div className="border rounded-lg">
                  <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Type className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm">Salvar Modelo</Button>
                      <Button variant="outline" size="sm">Usar modelo</Button>
                    </div>
                  </div>
                  <Textarea value={attendanceData.exameFisico} onChange={e => setAttendanceData(prev => ({
                ...prev,
                exameFisico: e.target.value
              }))} className="min-h-[150px] border-0 focus-visible:ring-0" />
                </div>
              </div>

              {/* Cálculo IMC */}
              <Card className="p-6 bg-muted/30">
                <h3 className="text-sm font-semibold mb-4">Cálculo IMC:</h3>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm">Peso (kg)</label>
                    <Input type="number" value={attendanceData.peso} onChange={e => setAttendanceData(prev => ({
                  ...prev,
                  peso: e.target.value
                }))} placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Altura (cm)</label>
                    <Input type="number" value={attendanceData.altura} onChange={e => setAttendanceData(prev => ({
                  ...prev,
                  altura: e.target.value
                }))} placeholder="0" />
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <span>IMC: {calculateIMC()}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Hipótese Diagnóstica */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Hipótese diagnóstica:</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Digite 3 ou mais caracteres..." className="pl-10" value={attendanceData.hipoteseDiagnostica} onChange={e => setAttendanceData(prev => ({
                  ...prev,
                  hipoteseDiagnostica: e.target.value
                }))} />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Adicionar</Button>
                </div>
              </div>

              {/* Condutas */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Condutas:</label>
                <div className="border rounded-lg">
                  <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Type className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm">Salvar Modelo</Button>
                      <Button variant="outline" size="sm">Usar modelo</Button>
                    </div>
                  </div>
                  <Textarea value={attendanceData.condutas} onChange={e => setAttendanceData(prev => ({
                ...prev,
                condutas: e.target.value
              }))} className="min-h-[150px] border-0 focus-visible:ring-0" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => {
                  setIsAttendanceActive(false);
                  setActiveSection("historico");
                }}>
                  Cancelar
                </Button>
                <Button onClick={handleFinishAttendance} className="bg-green-600 hover:bg-green-700 text-white">
                  Finalizar Atendimento
                </Button>
              </div>
            </div> : isAttendanceActive && activeSection === 'exames' ? <div className="space-y-6">
              {/* Exames Header with Date */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Exames e procedimentos</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                </div>
              </div>

              {/* Solicitação Card */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Solicitação #1</h3>
                  <Button variant="link" className="text-blue-600">Usar modelo de exames</Button>
                </div>

                {/* Data Toggle */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Incluir data</label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Data</label>
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-40" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="tipo" value="sadt" />
                      <span className="text-sm">SADT</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="tipo" value="particular" defaultChecked />
                      <span className="text-sm">Particular</span>
                    </label>
                  </div>
                </div>

                {/* Página indicator */}
                <div className="text-center text-sm text-muted-foreground mb-4">
                  Página 1
                </div>

                {/* Indicação Clínica */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">Indicação clínica (opcional)</label>
                  <Textarea className="min-h-[80px]" />
                </div>

                {/* Exames Section */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium">Exames</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar exame..." className="pl-10" />
                      </div>
                    </div>
                    <div className="w-32 space-y-2">
                      <label className="text-sm font-medium">Quantidade</label>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="1" className="text-center" />
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adicionar Página */}
                <Button variant="link" className="text-blue-600 mb-6">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar página
                </Button>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <Printer className="h-4 w-4 text-muted-foreground" />
                    <Button variant="link" className="text-blue-600">Salvar como modelo</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Excluir pedido</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Salvar</Button>
                  </div>
                </div>
              </Card>

              {/* Adicionar Solicitação */}
              <div className="text-center">
                <Button variant="link" className="text-blue-600">
                  Adicionar Solicitação
                </Button>
              </div>
            </div> : isAttendanceActive && activeSection === 'prescricoes' ? <div className="space-y-6">
              {/* Prescrições Header with Date */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Prescrição</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                </div>
              </div>

              {/* Prescrição Card */}
              <Card className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">iClinic Rx</h3>
                      <p className="text-sm text-muted-foreground">Consulta: {patientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked />
                      <span>mostrar data</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-40" />
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-sm">1/3 Prescrever</span>
                  <Button size="sm" className="bg-muted text-muted-foreground hover:bg-muted">
                    Próximo
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between mb-6 border-b">
                  <div className="flex gap-6">
                    <button className="pb-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                      Medicamentos
                    </button>
                    <button className="pb-3 text-sm text-muted-foreground hover:text-foreground">
                      Exames
                    </button>
                    <button className="pb-3 text-sm text-muted-foreground hover:text-foreground">
                      Vacinas
                    </button>
                  </div>
                  <div className="flex gap-4 pb-2">
                    <Button variant="link" size="sm" className="text-blue-600">
                      <History className="h-4 w-4 mr-2" />
                      Histórico
                    </Button>
                    <Button variant="link" size="sm" className="text-blue-600">
                      <Search className="h-4 w-4 mr-2" />
                      Usar Modelo
                    </Button>
                  </div>
                </div>

                {/* Items Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold">Itens da Receita</h4>
                    <Button variant="link" size="sm" className="text-blue-600 h-auto p-0">
                      <Info className="h-4 w-4 mr-1" />
                      Dicas De Uso
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Adicione itens de texto livre à sua receita
                  </p>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Digite para buscar..." className="pl-10" />
                  </div>

                  {/* Add Item Button */}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo item
                  </Button>

                  {/* Add Free Text */}
                  <div className="flex justify-end">
                    <Button variant="link" className="text-blue-600">
                      Adicionar Texto Livre
                    </Button>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    <span>assinatura digital</span>
                  </label>
                  <Button className="bg-muted text-muted-foreground hover:bg-muted">
                    Finalizar
                  </Button>
                </div>
              </Card>
            </div> : isAttendanceActive && activeSection === 'documentos' ? <div className="space-y-6">
              {/* Documentos e atestados Header with Date */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Documentos e atestados</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                </div>
              </div>

              {/* Document Editor Card */}
              <Card className="p-6">
                {/* Data Section */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Data</label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="date" 
                      defaultValue={new Date().toISOString().split('T')[0]} 
                      className="w-40" 
                    />
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" size="sm">
                        Usar modelo de atestado
                      </Button>
                      <Button variant="outline" size="sm">
                        Novo documento
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Text Editor */}
                <div className="border rounded-lg">
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <select className="h-8 px-2 text-sm border-0 bg-transparent">
                      <option>Parágrafo</option>
                      <option>Título 1</option>
                      <option>Título 2</option>
                    </select>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Type className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Editor Area */}
                  <Textarea 
                    className="min-h-[350px] border-0 focus-visible:ring-0" 
                    placeholder="Digite o conteúdo do documento..."
                  />
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Enviar para assinatura do paciente
                    </Button>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Salvar
                  </Button>
                </div>
              </Card>
            </div> : isAttendanceActive && activeSection === 'imagens' ? <div className="space-y-6">
              {/* Imagens e anexos Header with Date */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Imagens e anexos</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                </div>
              </div>

              {/* Upload Area */}
              <Card className="p-8">
                <div className="border-2 border-dashed border-muted rounded-lg p-16 text-center hover:border-primary/50 transition-colors">
                  <p className="text-muted-foreground mb-4">
                    Arraste os arquivos para cá para fazer o upload
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">ou</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Selecione os arquivos do seu computador
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Tamanho máximo do arquivo de upload: 64 MB
                  </p>
                </div>

                {/* Arquivos Adicionados Section */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
                    Arquivos Adicionados
                  </h3>
                  <div className="min-h-[100px] border rounded-lg p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground text-center">
                      Nenhum arquivo adicionado
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-2 pt-6 mt-6 border-t">
                  <Button variant="link" className="text-blue-600">
                    Comparar imagens (1)
                  </Button>
                  <Button className="bg-muted text-muted-foreground hover:bg-muted">
                    Salvar
                  </Button>
                </div>
              </Card>
            </div> : activeSection === 'tabela' ? <div className="space-y-6">
              {/* Tabela de acompanhamento Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">Tabela de acompanhamento</h2>
                  <Badge className="bg-blue-600 hover:bg-blue-700">Edição Habilitada</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Inserir Exame
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Inserir Data
                  </Button>
                </div>
                <Button variant="link" size="sm" className="text-muted-foreground">
                  Ver Atalhos
                </Button>
              </div>

              {/* Table */}
              <Card className="p-6">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium">Exames</th>
                        <th className="text-left p-4 text-sm font-medium">DD/MM/AAAA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} className="p-8 text-center text-sm text-muted-foreground">
                          Nenhum exame inserido
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-muted-foreground mt-6 text-center">
                  Os exames inseridos na tabela estarão disponíveis em todos os seus demais atendimentos.
                </p>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Salvar
                  </Button>
                </div>
              </Card>
            </div> : <>
              {/* Attendance History */}
              {patientId && <AttendanceHistoryList patientId={patientId} />}
              
              {/* Information Sections */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{
              key: 'clinicos',
              label: 'Antec. clínicos'
            }, {
              key: 'cirurgicos',
              label: 'Antec. cirúrgicos'
            }, {
              key: 'familiares',
              label: 'Antec. familiares'
            }, {
              key: 'habitos',
              label: 'Hábitos'
            }, {
              key: 'alergias',
              label: 'Alergias'
            }, {
              key: 'medicamentos',
              label: 'Medicamentos em uso'
            }].map(section => <Card key={section.key} className="p-3 shadow-sm border-[#e5e7eb]">
                    <h3 className="text-xs font-semibold mb-2 text-[#1f2937]">{section.label}</h3>
                    <Textarea placeholder="Inserir informação" className="min-h-[60px] text-xs border-[#e5e7eb] resize-none focus-visible:ring-1" value={sections[section.key as keyof typeof sections] || ''} onChange={e => setSections(prev => ({
                ...prev,
                [section.key]: e.target.value
              }))} />
                  </Card>)}
              </div>
            </>}

          {/* Tabela de acompanhamento - removed duplicate section */}

          {/* Últimos Diagnósticos */}
          <Card className="mb-5 shadow-sm border-[#e5e7eb]">
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors" onClick={() => setShowDiagnosticos(!showDiagnosticos)}>
              <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">
                Últimos diagnósticos
              </h3>
              <ChevronDown className={`h-4 w-4 text-[#6b7280] transition-transform ${showDiagnosticos ? 'rotate-180' : ''}`} />
            </button>
            {showDiagnosticos && <div className="px-4 py-3 border-t border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] text-center">Não encontramos diagnósticos registrados nesse paciente. Adicione e utilize o campo CID 10 para utilizar essa funcionalidade.</p>
                <div className="text-center mt-3">
                  <Button variant="link" className="text-xs text-[#2563eb] underline h-auto p-0">
                    Saiba mais
                  </Button>
                </div>
              </div>}
          </Card>

          {/* Filter and Action Buttons */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6b7280]">Filtrar</span>
              <select className="border border-[#e5e7eb] rounded px-3 py-1.5 text-xs text-[#6b7280] bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Todos</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs border-[#e5e7eb] text-[#6b7280]">
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Baixar PDF
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs border-[#e5e7eb] text-[#6b7280]">
                <Printer className="h-3.5 w-3.5 mr-1.5" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs border-[#e5e7eb] text-[#6b7280]">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Compartilhar
              </Button>
            </div>
          </div>

          {/* Inserir Prontuários Anteriores */}
          <Card className="p-5 shadow-sm border-[#e5e7eb]">
            <h3 className="text-xs font-semibold mb-3 text-[#2563eb] cursor-pointer hover:underline">Inserir prontuários anteriores</h3>
            <p className="text-xs text-[#6b7280] mb-4 leading-relaxed">
              Aqui você pode inserir arquivos de prontuário antes do primeiro atendimento pelo iClinic. 
              Após o primeiro atendimento, esta opção não estará mais disponível.
            </p>
            <div className="border border-dashed border-[#d1d5db] rounded-lg py-16 px-8 text-center bg-[#fafafa]">
              <p className="text-xs text-[#9ca3af] mb-3">
                Arraste os arquivos para cá para fazer o upload
              </p>
              <p className="text-xs text-[#9ca3af] mb-4">ou</p>
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white h-9 px-6 text-xs font-medium rounded-md">
                Selecione os arquivos do seu computador
              </Button>
              <p className="text-[10px] text-[#9ca3af] mt-3">
                Tamanho máximo do arquivo de upload: 64 MB.
              </p>
            </div>
          </Card>
        </main>
      </div>
    </div>;
};
export default Prontuarios;