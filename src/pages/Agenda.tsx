import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, CalendarDays, ChevronLeft, ChevronRight, Clock, FileText, Plus, Printer, Search, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Patient } from "@/hooks/usePatients";
const Agenda = () => {
  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [viewMode, setViewMode] = useState<"DIA" | "SEMANA">("SEMANA");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isWaitingListModalOpen, setIsWaitingListModalOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState("agendar");
  const [generatePaymentLink, setGeneratePaymentLink] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<{
    day: number;
    time: string;
  } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState([{
    day: 0,
    time: "09:45",
    duration: 1,
    patient: "Findo",
    status: "finished"
  }, {
    day: 2,
    time: "08:30",
    duration: 2,
    patient: "Paciente Teste",
    status: "scheduled"
  }, {
    day: 3,
    time: "08:30",
    duration: 2,
    patient: "Paciente Teste",
    status: "scheduled"
  }, {
    day: 0,
    time: "13:45",
    duration: 1,
    patient: "Findo",
    status: "finished"
  }]);
  const [formData, setFormData] = useState({
    patient: "",
    date: getTodayDate(),
    timeStart: "08:00",
    timeEnd: "08:15"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const timeSlots = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  // Buscar pacientes enquanto digita
  useEffect(() => {
    const searchPatients = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const {
          data,
          error
        } = await (supabase as any).from('patients').select('*').ilike('name', `%${searchQuery}%`).limit(10);
        if (error) throw error;
        setSearchResults(data || []);
      } catch (error) {
        console.error('Error searching patients:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };
    const debounce = setTimeout(() => {
      searchPatients();
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);
  const handleSelectPatient = (patient: Patient) => {
    setSearchQuery(patient.name);
    setShowSearchResults(false);

    // Preencher dados do formulário se o modal estiver aberto
    if (isAppointmentModalOpen) {
      setFormData(prev => ({
        ...prev,
        patient: patient.name
      }));
    }
  };

  // Função para obter o início da semana (domingo)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Função para navegar na agenda
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "SEMANA") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "SEMANA") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Gerar os dias da semana baseado em currentDate
  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = viewMode === "SEMANA" ? Array.from({
    length: 7
  }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return {
      day: dayNames[date.getDay()],
      date: `${date.getDate()}/${monthNames[date.getMonth()]}`,
      fullDate: date
    };
  }) : [{
    day: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][currentDate.getDay()],
    date: `${currentDate.getDate()}/${["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][currentDate.getMonth()]}`,
    fullDate: currentDate
  }];
  const gridCols = viewMode === "SEMANA" ? "grid-cols-8" : "grid-cols-2";

  // Formatar range de datas para exibição
  const formatDateRange = () => {
    if (viewMode === "DIA") {
      const date = currentDate;
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    const start = weekDays[0].fullDate;
    const end = weekDays[6].fullDate;
    return `${String(start.getDate()).padStart(2, '0')}/${String(start.getMonth() + 1).padStart(2, '0')} a ${String(end.getDate()).padStart(2, '0')}/${String(end.getMonth() + 1).padStart(2, '0')}`;
  };

  // Verificar se uma data é hoje
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  const handleDeleteAppointment = () => {
    if (!editingAppointment) return;
    const updatedAppointments = appointments.filter(apt => !(apt.day === editingAppointment.day && apt.time === editingAppointment.time));
    setAppointments(updatedAppointments);
    setIsDeleteDialogOpen(false);
    setIsAppointmentModalOpen(false);
    setEditingAppointment(null);
    setFormData({
      patient: "",
      date: getTodayDate(),
      timeStart: "08:00",
      timeEnd: "08:15"
    });
    toast.success("Agendamento deletado com sucesso!");
  };
  const handleEditAppointment = (day: number, time: string) => {
    const appointment = appointments.find(apt => apt.day === day && apt.time === time);
    if (!appointment) return;

    // Calculate end time
    const [startHour, startMinute] = time.split(':').map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = startMinutes + appointment.duration * 15;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;
    const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

    // Calculate date from day of week
    const appointmentDate = weekDays[day].fullDate;
    const dateStr = `${appointmentDate.getFullYear()}-${String(appointmentDate.getMonth() + 1).padStart(2, '0')}-${String(appointmentDate.getDate()).padStart(2, '0')}`;
    setFormData({
      patient: appointment.patient,
      date: dateStr,
      timeStart: time,
      timeEnd: endTime
    });
    setEditingAppointment({
      day,
      time
    });
    setIsAppointmentModalOpen(true);
  };
  const handleSaveAppointment = async () => {
    if (!formData.patient) {
      toast.error("Nome do paciente é obrigatório");
      return;
    }
    try {
      // Parse date correctly to avoid timezone issues
      const [year, month, day] = formData.date.split('-').map(Number);
      const appointmentDate = new Date(year, month - 1, day);
      const dayOfWeek = appointmentDate.getDay();
      const [startHour, startMinute] = formData.timeStart.split(':');
      const [endHour, endMinute] = formData.timeEnd.split(':');
      const startMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
      const endMinutes = parseInt(endHour) * 60 + parseInt(endMinute);
      const duration = Math.ceil((endMinutes - startMinutes) / 15);

      // Create scheduled_time timestamp
      const scheduledDateTime = new Date(year, month - 1, day, parseInt(startHour), parseInt(startMinute));
      if (editingAppointment) {
        // Modo de edição - atualizar agendamento existente
        const updatedAppointments = appointments.map(apt => {
          if (apt.day === editingAppointment.day && apt.time === editingAppointment.time) {
            return {
              ...apt,
              day: dayOfWeek,
              time: formData.timeStart,
              duration: duration,
              patient: formData.patient
            };
          }
          return apt;
        });
        setAppointments(updatedAppointments);
        toast.success("Agendamento atualizado com sucesso!");
      } else {
        // Modo de criação - inserir novo agendamento
        // First, try to find or create the patient
        let patientId: string;

        // Check if patient already exists
        const {
          data: existingPatients
        } = await (supabase as any).from('patients').select('id').ilike('name', formData.patient).limit(1);
        if (existingPatients && existingPatients.length > 0) {
          patientId = existingPatients[0].id;
        } else {
          // Create new patient
          const {
            data: newPatient,
            error: patientError
          } = await (supabase as any).from('patients').insert({
            name: formData.patient,
            phone: '(00) 00000-0000',
            // Default phone
            insurance_type: 'Particular'
          }).select().single();
          if (patientError) throw patientError;
          patientId = newPatient.id;
        }

        // Insert appointment
        const {
          error: appointmentError
        } = await (supabase as any).from('appointments').insert({
          patient_id: patientId,
          scheduled_time: scheduledDateTime.toISOString(),
          status: 'agendado',
          procedure: 'Consulta',
          is_first_time: false
        });
        if (appointmentError) throw appointmentError;

        // Update local state
        const newAppointment = {
          day: dayOfWeek,
          time: formData.timeStart,
          duration: duration,
          patient: formData.patient,
          status: "scheduled"
        };
        setAppointments([...appointments, newAppointment]);
        toast.success("Agendamento criado com sucesso!");
      }
      setIsAppointmentModalOpen(false);
      setEditingAppointment(null);
      setFormData({
        patient: "",
        date: getTodayDate(),
        timeStart: "08:00",
        timeEnd: "08:15"
      });
    } catch (error) {
      console.error('Error saving appointment:', error);
      toast.error("Erro ao salvar agendamento. Tente novamente.");
    }
  };
  const lunchBreaks = weekDays.map((_, index) => ({
    day: index,
    time: "12:00",
    duration: 4,
    label: "Horário de almoço"
  }));
  const getAppointmentStyle = (day: number, time: string) => {
    const appointment = appointments.find(apt => apt.day === day && apt.time === time);
    if (appointment) {
      return {
        height: `${appointment.duration * 40}px`,
        className: appointment.status === "finished" ? "bg-[#2d9d4f]" : "bg-[#f0ad4e]",
        patient: appointment.patient
      };
    }
    return null;
  };
  const getLunchBreakStyle = (day: number, time: string) => {
    const lunchBreak = lunchBreaks.find(lb => lb.day === day && lb.time === time);
    if (lunchBreak) {
      return {
        height: `${lunchBreak.duration * 40}px`,
        label: lunchBreak.label
      };
    }
    return null;
  };
  return <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-[#d4edda] border border-[#c3e6cb] rounded-md p-3 mb-4 flex items-center justify-between">
            <span className="text-sm text-[#155724]">
              Bem vindo ao iClinic. Seu período de avaliação termina em 6 dias
            </span>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Assine agora
            </Button>
          </div>

          <h2 className="text-xl font-semibold text-primary mb-4">Arthur Batista Miranda de Oliveira</h2>

          <div className="mb-4 relative">
            <Popover open={showSearchResults && searchResults.length > 0} onOpenChange={setShowSearchResults}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Busque um paciente" className="pl-9" value={searchQuery} onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }} onFocus={() => setShowSearchResults(true)} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                  <CommandList>
                    {isSearching ? <CommandEmpty>Buscando...</CommandEmpty> : searchResults.length === 0 ? <CommandEmpty>Nenhum paciente encontrado</CommandEmpty> : <CommandGroup>
                        {searchResults.map(patient => <CommandItem key={patient.id} onSelect={() => handleSelectPatient(patient)} className="cursor-pointer">
                            <div className="flex flex-col">
                              <span className="font-medium">{patient.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {patient.phone} • {patient.insurance_type || 'Particular'}
                              </span>
                            </div>
                          </CommandItem>)}
                      </CommandGroup>}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => {
            setEditingAppointment(null);
            setFormData({
              patient: "",
              date: getTodayDate(),
              timeStart: "08:00",
              timeEnd: "08:15"
            });
            setIsAppointmentModalOpen(true);
          }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsWaitingListModalOpen(true)}>
              <Clock className="h-4 w-4 mr-2" />
              Lista de Espera
            </Button>
            <Button variant="outline" size="sm">
              <CalendarDays className="h-4 w-4 mr-2" />
              Observações
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Imprimir Agenda
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Agendamento Online
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>HOJE</Button>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{formatDateRange()}</span>
              <Button variant="ghost" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-1 ml-auto">
              <Button variant={viewMode === "DIA" ? "default" : "outline"} size="sm" onClick={() => setViewMode("DIA")}>
                DIA
              </Button>
              <Button variant={viewMode === "SEMANA" ? "default" : "outline"} size="sm" onClick={() => setViewMode("SEMANA")}>
                SEMANA
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <div className={viewMode === "SEMANA" ? "min-w-[1200px]" : ""}>
                <div className={`grid ${gridCols} border-b`}>
                  <div className="p-2"></div>
                  {weekDays.map((day, index) => <div key={index} className={`p-2 text-center border-l ${isToday(day.fullDate) ? 'bg-primary/10 font-semibold' : ''}`}>
                      <div className={`text-sm font-medium ${isToday(day.fullDate) ? 'text-primary' : ''}`}>
                        {day.day}
                      </div>
                      <div className={`text-xs ${isToday(day.fullDate) ? 'text-primary' : 'text-muted-foreground'}`}>
                        {day.date}
                      </div>
                    </div>)}
                </div>

                <div className="relative">
                  {timeSlots.map((time, timeIndex) => <div key={timeIndex} className={`grid ${gridCols} border-b h-10 relative`}>
                      <div className="p-2 text-xs text-muted-foreground border-r">{time}</div>
                      {weekDays.map((_, dayIndex) => {
                    const appointment = getAppointmentStyle(dayIndex, time);
                    const lunchBreak = getLunchBreakStyle(dayIndex, time);
                    const isFirstSlotOfHour = time.endsWith(":00");
                    return <div key={dayIndex} className={`border-l relative ${isToday(weekDays[dayIndex].fullDate) ? 'bg-primary/5' : viewMode === "SEMANA" && dayIndex === 0 ? "bg-[#c8e6c9]" : viewMode === "SEMANA" && dayIndex === 6 ? "bg-muted/30" : ""}`}>
                            {appointment && <div className={`absolute left-0 right-0 top-0 ${appointment.className} text-white p-2 text-xs z-10 rounded border border-white/20 cursor-pointer hover:opacity-90 transition-opacity`} style={{
                        height: appointment.height
                      }} onClick={() => handleEditAppointment(dayIndex, time)}>
                                <div className="text-xs font-medium">{time} - {appointment.patient}</div>
                              </div>}
                            {lunchBreak && isFirstSlotOfHour && <div className="absolute left-0 right-0 top-0 bg-muted/50 border border-muted-foreground/20 text-muted-foreground p-2 text-xs z-10 flex items-center justify-center" style={{
                        height: lunchBreak.height
                      }}>
                                <div className="text-xs">{time} - 14:00</div>
                                <div className="text-xs">{lunchBreak.label}</div>
                              </div>}
                          </div>;
                  })}
                    </div>)}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={goToToday}>
              HOJE
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-4">Central de suporte</div>
        </main>
      </div>

      {/* Modal de Novo Agendamento */}
      <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {editingAppointment ? "Editar agendamento" : "Adicionar agendamento"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agendar" id="agendar" />
                <Label htmlFor="agendar">Agendar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bloquear" id="bloquear" />
                <Label htmlFor="bloquear">Bloquear horário</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Procedimentos</Label>
                <Select defaultValue="retorno">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="exame">Exame</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1">
                  + Adicionar
                </Button>
              </div>
              <div>
                <Label>Quant.</Label>
                <Input type="number" defaultValue="1" className="w-full" />
              </div>
            </div>

            <div>
              <Label>Paciente</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Digite 3 letras para buscar..." className="pl-9" value={formData.patient} onChange={e => setFormData({
                ...formData,
                patient: e.target.value
              })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Telefone celular</Label>
                <Input placeholder="(__)____-____" />
              </div>
              <div>
                <Label>Telefone residencial (opcional)</Label>
                <Input placeholder="(__)____-____" />
              </div>
            </div>

            <div>
              <Label>E-mail (opcional)</Label>
              <Input type="email" />
            </div>

            <div>
              <Label>Convênio</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="particular">Particular</SelectItem>
                  <SelectItem value="unimed">Unimed</SelectItem>
                  <SelectItem value="amil">Amil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2 items-end">
              <div>
                <Label>Data</Label>
                <Input type="date" value={formData.date} onChange={e => setFormData({
                ...formData,
                date: e.target.value
              })} />
              </div>
              <div>
                <Label>Horário</Label>
                <div className="flex gap-2">
                  <Input type="time" value={formData.timeStart} onChange={e => setFormData({
                  ...formData,
                  timeStart: e.target.value
                })} className="flex-1" />
                  <span className="self-center text-sm text-muted-foreground">às</span>
                  <Input type="time" value={formData.timeEnd} onChange={e => setFormData({
                  ...formData,
                  timeEnd: e.target.value
                })} className="flex-1" />
                </div>
              </div>
              <div className="flex items-end">
                
              </div>
            </div>

            <div className="px-[230px] mx-0 py-0">
              <Select defaultValue="nao-repete">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao-repete">Não se repete</SelectItem>
                  <SelectItem value="todo-dia">Repetir todo dia</SelectItem>
                  <SelectItem value="toda-semana">Repetir toda semana</SelectItem>
                  <SelectItem value="15-dias">Repetir a cada 15 dias</SelectItem>
                  <SelectItem value="todo-mes">Repetir todo mês</SelectItem>
                  <SelectItem value="todo-ano">Repetir todo ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            

            <div>
              <Label>Observações (opcional)</Label>
              <Textarea rows={3} />
            </div>
          </div>

          <DialogFooter className="gap-2">
            {editingAppointment && <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} className="mr-auto">
                DELETAR
              </Button>}
            <Button variant="outline" onClick={() => {
            setIsAppointmentModalOpen(false);
            setEditingAppointment(null);
          }}>
              CANCELAR
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveAppointment}>
              SALVAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmação de deleção */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este agendamento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAppointment} className="bg-destructive hover:bg-destructive/90">
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de Lista de Espera */}
      <Dialog open={isWaitingListModalOpen} onOpenChange={setIsWaitingListModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-primary">Lista de espera</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6 flex-1 overflow-y-auto">
            {/* Lado esquerdo - Lista vazia */}
            <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center">
              <p className="text-muted-foreground text-center">Nenhum paciente na lista de espera</p>
            </div>

            {/* Lado direito - Formulário */}
            <div className="space-y-4">
              <h3 className="font-semibold text-primary mb-4">Adicionar à lista</h3>
              
              <div>
                <Label>PACIENTE*</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Pesquisar paciente..." className="pl-9" />
                </div>
              </div>

              <div>
                <Label>CONVÊNIO</Label>
                <Select defaultValue="particular">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="particular">Particular</SelectItem>
                    <SelectItem value="unimed">Unimed</SelectItem>
                    <SelectItem value="amil">Amil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>E-MAIL</Label>
                <Input type="email" placeholder="" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>TELEFONE CELULAR</Label>
                  <Input placeholder="(__)_____-____" />
                </div>
                <div>
                  <Label>TELEFONE RESIDENCIAL</Label>
                  <Input placeholder="(__)_____-____" />
                </div>
              </div>

              <div>
                <Label>OBSERVAÇÃO</Label>
                <Textarea rows={4} placeholder="" />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                ADICIONAR PACIENTE
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Agenda;