import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  CheckCircle2,
  ClipboardList,
  Euro,
  Heart,
  Info,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-fenix.jpeg.asset.json";

export const Route = createFileRoute("/preinscripcion")({
  head: () => ({
    meta: [
      { title: "Preinscripción Temporada 26·27 · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Formulario oficial de preinscripción del CDE CGA Fénix Las Rozas para la temporada 2026-2027. Gimnasia artística desde los 3 años.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreinscripcionPage,
});

/* -------------------------------- Schema -------------------------------- */

const schema = z.object({
  gimnastaNombre: z.string().trim().min(3, "Indica nombre y apellidos").max(120),
  fechaNacimiento: z.date({ required_error: "Selecciona la fecha de nacimiento" }),
  padres: z.string().trim().min(3, "Indica nombre y apellidos de padre/madre").max(200),
  telefono: z
    .string()
    .trim()
    .min(9, "Teléfono no válido")
    .max(20)
    .regex(/^[+0-9\s]+$/, "Sólo números y +"),
  email: z.string().trim().email("Email no válido").max(160),
  domicilio: z.string().trim().min(5, "Indica el domicilio").max(240),
  codigoPostal: z
    .string()
    .trim()
    .min(5, "CP no válido")
    .max(5, "CP no válido")
    .regex(/^[0-9]{5}$/, "Debe tener 5 dígitos"),
  matriculadoAnterior: z.enum(["si", "no"], {
    required_error: "Selecciona una opción",
  }),
  grupoAnterior: z.string().trim().max(200).optional().or(z.literal("")),
  nivelPrevio: z.string().trim().max(300).optional().or(z.literal("")),
  infoAdicional: z.string().trim().max(600).optional().or(z.literal("")),
  aceptaCondiciones: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar las condiciones" }),
  }),
  aceptaPrivacidad: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

type FormData = {
  gimnastaNombre: string;
  fechaNacimiento?: Date;
  padres: string;
  telefono: string;
  email: string;
  domicilio: string;
  codigoPostal: string;
  matriculadoAnterior?: "si" | "no";
  grupoAnterior: string;
  nivelPrevio: string;
  infoAdicional: string;
  aceptaCondiciones: boolean;
  aceptaPrivacidad: boolean;
};

const initial: FormData = {
  gimnastaNombre: "",
  padres: "",
  telefono: "",
  email: "",
  domicilio: "",
  codigoPostal: "",
  grupoAnterior: "",
  nivelPrevio: "",
  infoAdicional: "",
  aceptaCondiciones: false,
  aceptaPrivacidad: false,
};

const STEPS = [
  { id: 1, title: "Gimnasta", icon: User },
  { id: 2, title: "Familia", icon: Users },
  { id: 3, title: "Experiencia", icon: Trophy },
  { id: 4, title: "Confirmación", icon: CheckCircle2 },
] as const;

/* --------------------------- Gymnast animations --------------------------- */

function GymnastFloaters() {
  // decorative SVG silhouettes floating in the background
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute -top-6 -left-10 h-40 w-40 text-primary/25 animate-float-slow"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="18" r="7" />
        <path d="M50 26 L44 48 L36 72 L42 74 L50 55 L58 74 L64 72 L56 48 Z" />
        <path d="M44 30 L20 40 L22 46 L46 40 Z" />
        <path d="M56 30 L80 40 L78 46 L54 40 Z" />
      </svg>
      <svg
        className="absolute top-24 right-4 h-32 w-32 text-primary/20 animate-float-slow [animation-delay:1.2s]"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="30" cy="30" r="6" />
        <path d="M30 36 L38 60 L46 78 L40 80 L30 64 L20 80 L14 78 L22 60 Z" />
        <path d="M36 40 L60 30 L62 36 L38 46 Z" />
      </svg>
      <svg
        className="absolute bottom-6 left-1/3 h-28 w-28 text-primary/15 animate-float-slow [animation-delay:2.4s]"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="70" cy="24" r="6" />
        <path d="M70 30 L64 52 L60 74 L66 76 L72 58 L78 76 L84 74 L80 52 Z" />
      </svg>
      {/* ring */}
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border-2 border-dashed border-primary/30 animate-[spin_40s_linear_infinite]" />
      <div className="absolute -top-32 right-1/3 h-56 w-56 rounded-full border border-primary/20 animate-[spin_60s_linear_infinite_reverse]" />
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

function PreinscripcionPage() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { ref: string; nombre: string }>(null);

  const progress = useMemo(() => (done ? 100 : (step / STEPS.length) * 100), [step, done]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      const { [key as string]: _, ...rest } = e;
      return rest;
    });
  }

  function validateStep(current: number): boolean {
    const stepErrors: Record<string, string> = {};
    if (current === 1) {
      if (!data.gimnastaNombre || data.gimnastaNombre.trim().length < 3)
        stepErrors.gimnastaNombre = "Indica nombre y apellidos";
      if (!data.fechaNacimiento) stepErrors.fechaNacimiento = "Selecciona la fecha de nacimiento";
      else {
        const age =
          (Date.now() - data.fechaNacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (age < 2 || age > 90) stepErrors.fechaNacimiento = "Fecha no válida";
      }
    }
    if (current === 2) {
      if (!data.padres || data.padres.trim().length < 3)
        stepErrors.padres = "Indica padre/madre/tutor";
      if (!/^[+0-9\s]{9,20}$/.test(data.telefono || ""))
        stepErrors.telefono = "Teléfono no válido";
      if (!/^\S+@\S+\.\S+$/.test(data.email || "")) stepErrors.email = "Email no válido";
      if (!data.domicilio || data.domicilio.trim().length < 5)
        stepErrors.domicilio = "Indica el domicilio completo";
      if (!/^[0-9]{5}$/.test(data.codigoPostal || ""))
        stepErrors.codigoPostal = "CP no válido (5 dígitos)";
    }
    if (current === 3) {
      if (!data.matriculadoAnterior) stepErrors.matriculadoAnterior = "Selecciona una opción";
    }
    if (current === 4) {
      if (!data.aceptaCondiciones)
        stepErrors.aceptaCondiciones = "Debes aceptar las condiciones";
      if (!data.aceptaPrivacidad)
        stepErrors.aceptaPrivacidad = "Debes aceptar la política de privacidad";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(STEPS.length, s + 1));
    else toast.error("Revisa los campos marcados");
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit() {
    if (!validateStep(4) || !validateStep(1) || !validateStep(2) || !validateStep(3)) {
      toast.error("Faltan datos por completar");
      return;
    }
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path.join(".")] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Revisa los campos marcados");
      return;
    }

    setSubmitting(true);
    try {
      const partes = parsed.data.gimnastaNombre.trim().split(/\s+/);
      const nombre = partes[0];
      const apellidos = partes.slice(1).join(" ") || "—";
      const ref = "FNX-" + Date.now().toString(36).toUpperCase();
      const nacimiento = parsed.data.fechaNacimiento;
      const fechaISO = `${nacimiento.getFullYear()}-${String(nacimiento.getMonth() + 1).padStart(2, "0")}-${String(nacimiento.getDate()).padStart(2, "0")}`;

      const { error } = await supabase.from("inscripciones").insert({
        gimnasta_nombre: nombre,
        gimnasta_apellidos: apellidos,
        fecha_nacimiento: fechaISO,
        padre_nombre_apellidos: parsed.data.padres,
        madre_nombre_apellidos: null,
        telefono: parsed.data.telefono,
        email: parsed.data.email,
        domicilio: parsed.data.domicilio,
        codigo_postal: parsed.data.codigoPostal,
        experiencia_previa: parsed.data.matriculadoAnterior === "si",
        club_nivel_anterior: parsed.data.grupoAnterior?.trim() || null,
        info_adicional: parsed.data.infoAdicional?.trim() || null,
      });

      if (error) throw error;

      setDone({ ref, nombre: parsed.data.gimnastaNombre });
      toast.success("¡Preinscripción enviada!");
    } catch (e) {
      console.error(e);
      const message =
        e instanceof Error && e.message
          ? `No se ha podido enviar: ${e.message}`
          : "No se ha podido enviar. Revisa tu conexión e inténtalo de nuevo.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <div className="relative bg-gradient-to-b from-background via-background to-muted/40">
      <Toaster richColors position="top-center" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-carbon text-carbon-foreground">
        <GymnastFloaters />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Temporada 2026 · 2027
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase leading-[1] tracking-tight">
              Preinscripción{" "}
              <span className="text-gradient-fire">CGA Fénix</span>
              <br />
              Las Rozas
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
              Reserva tu plaza para la nueva temporada. Gimnasia artística desde los{" "}
              <strong className="text-white">3 años</strong> en adelante. Plazo abierto desde el{" "}
              <strong className="text-white">17 de agosto de 2026</strong>. Plazas limitadas.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/70">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Reserva hasta 7 sept.
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                <Heart className="h-3.5 w-3.5 text-primary" /> Valores y competición
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                <Trophy className="h-3.5 w-3.5 text-primary" /> Alta competición
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Form column */}
        <div className="min-w-0">
          {!done ? (
            <div className="rounded-3xl border border-border bg-card shadow-[0_20px_60px_-30px_oklch(0_0_0/0.25)] overflow-hidden">
              {/* Steps header */}
              <div className="border-b border-border bg-muted/30 px-6 sm:px-8 pt-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground">
                    Paso {step} de {STEPS.length}
                  </span>
                  <span className="text-xs font-bold text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-1.5" />
                <ol className="mt-5 grid grid-cols-4 gap-2">
                  {STEPS.map((s) => {
                    const Icon = s.icon;
                    const active = step === s.id;
                    const complete = step > s.id;
                    return (
                      <li
                        key={s.id}
                        className={cn(
                          "flex flex-col items-center gap-1.5 text-center transition-all",
                          active && "scale-[1.02]"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all",
                            complete && "border-primary bg-primary text-primary-foreground",
                            active &&
                              "border-primary bg-primary/10 text-primary shadow-[0_0_0_6px_color-mix(in_oklab,var(--primary)_15%,transparent)]",
                            !active &&
                              !complete &&
                              "border-border bg-background text-muted-foreground"
                          )}
                        >
                          {complete ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-tight",
                            active ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {s.title}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Step body */}
              <div className="p-6 sm:p-8">
                <div key={step} className="animate-fade-in space-y-6">
                  {step === 1 && (
                    <StepGimnasta data={data} errors={errors} update={update} />
                  )}
                  {step === 2 && (
                    <StepFamilia data={data} errors={errors} update={update} />
                  )}
                  {step === 3 && (
                    <StepExperiencia data={data} errors={errors} update={update} />
                  )}
                  {step === 4 && (
                    <StepConfirmacion
                      data={data}
                      errors={errors}
                      update={update}
                    />
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
                  <Button
                    variant="ghost"
                    onClick={prev}
                    disabled={step === 1 || submitting}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Atrás
                  </Button>
                  {step < STEPS.length ? (
                    <Button
                      onClick={next}
                      className="gap-2 rounded-full bg-primary px-6 font-black uppercase tracking-wider text-primary-foreground hover:scale-[1.02] transition-transform"
                    >
                      Continuar <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={submit}
                      disabled={submitting}
                      className="gap-2 rounded-full bg-primary px-6 font-black uppercase tracking-wider text-primary-foreground hover:scale-[1.02] transition-transform"
                    >
                      {submitting ? "Enviando…" : "Enviar preinscripción"}
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <SuccessCard ref={done.ref} nombre={done.nombre} onReset={() => {
              setDone(null);
              setData(initial);
              setStep(1);
            }} />
          )}
        </div>

        {/* Info sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border-2 border-primary/40 bg-card p-5 shadow-[0_8px_30px_-10px_color-mix(in_oklab,var(--primary)_25%,transparent)]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Euro className="h-4 w-4" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-foreground">Matrícula 26·27</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Nuevos alumnos</span>
                <span className="font-black text-foreground">65 €</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Antiguos alumnos</span>
                <span className="font-black text-foreground">30 €</span>
              </li>
            </ul>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-destructive">
                  Transferencia con NOMBRE + APELLIDOS del gimnasta
                </p>
                <p className="mt-1 text-[11px] font-semibold text-destructive">
                  Debes abonar la tasa para tener la plaza reservada
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2.5 text-center">
              <p className="font-mono text-sm font-black text-foreground tracking-wide">
                ES57 0081 0357 4200 0209 9917
              </p>
            </div>
          </div>
          <InfoCard
            icon={ClipboardList}
            title="Cuotas mensuales"
            items={[
              { label: "Adultos · 2h/sem", value: "22 €" },
              { label: "3-5 años · 2h/sem", value: "30 €" },
              { label: "4h / semana", value: "40 €" },
              { label: "8h / semana", value: "62 €" },
              { label: "11h / semana", value: "75 €" },
            ]}
            footer="Tasas Ayto. Las Rozas · pago único 25 € por temporada"
          />
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Contacto
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@cgafenixlasrozas.es" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" /> info@cgafenixlasrozas.es
              </a>
              <a href="tel:+34679980626" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> 679 980 626
              </a>
              <a href="tel:+34695299885" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> 695 299 885
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Legal / conditions accordion */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                <strong className="text-foreground">Condiciones generales:</strong> la duración de
                las clases se ajusta al apartado horarios (mínimo dos días/semana). La inasistencia
                temporal no exime del pago. Las bajas deben tramitarse antes del día 27 del mes
                anterior mediante correo a{" "}
                <a
                  className="text-primary hover:underline"
                  href="mailto:info@cgafenixlasrozas.es"
                >
                  info@cgafenixlasrozas.es
                </a>
                . Facturación del 1 al 5 de cada mes. Retraso en el abono: recargo de 3 €.
              </p>
              <p>
                Conforme al Art. 13 del Reglamento (UE) 2016/679 y la LOPDGDD 3/2018, los datos
                serán tratados bajo la responsabilidad del Club CGA Fénix Las Rozas y no se cederán
                a terceros salvo obligación legal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- Steps --------------------------------- */

type StepProps = {
  data: FormData;
  errors: Record<string, string>;
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
};

function Field({
  label,
  required,
  error,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-black uppercase tracking-[0.12em] text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      {error && <p className="text-[11px] font-semibold text-destructive">{error}</p>}
    </div>
  );
}

function StepGimnasta({ data, errors, update }: StepProps) {
  return (
    <>
      <SectionTitle
        icon={User}
        eyebrow="Paso 1"
        title="Datos del gimnasta"
        subtitle="Cuéntanos quién va a formar parte del Fénix esta temporada."
      />
      <Field
        label="Nombre + apellidos del gimnasta"
        required
        error={errors.gimnastaNombre}
      >
        <Input
          value={data.gimnastaNombre}
          onChange={(e) => update("gimnastaNombre", e.target.value)}
          placeholder="Ej. Lucía García Martínez"
          className="h-12"
        />
      </Field>
      <Field label="Fecha de nacimiento" required error={errors.fechaNacimiento}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-12 w-full justify-start text-left font-normal",
                !data.fechaNacimiento && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {data.fechaNacimiento
                ? format(data.fechaNacimiento, "PPP", { locale: es })
                : "Selecciona una fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.fechaNacimiento}
              onSelect={(d) => update("fechaNacimiento", d as Date)}
              captionLayout="dropdown"
              fromYear={1935}
              toYear={new Date().getFullYear()}
              defaultMonth={data.fechaNacimiento ?? new Date(2018, 0, 1)}
              locale={es}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </>
  );
}

function StepFamilia({ data, errors, update }: StepProps) {
  return (
    <>
      <SectionTitle
        icon={Users}
        eyebrow="Paso 2"
        title="Familia y contacto"
        subtitle="Datos del padre, madre o tutor legal para todas las comunicaciones del club."
      />
      <Field label="Nombre + apellidos padre y madre" required error={errors.padres}>
        <Input
          value={data.padres}
          onChange={(e) => update("padres", e.target.value)}
          placeholder="Ej. Marta Martínez López / Javier García Ruiz"
          className="h-12"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Teléfono de contacto" required error={errors.telefono}>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              value={data.telefono}
              onChange={(e) => update("telefono", e.target.value)}
              placeholder="+34 600 000 000"
              className="h-12 pl-9"
              inputMode="tel"
            />
          </div>
        </Field>
        <Field label="Correo electrónico" required error={errors.email}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="familia@email.com"
              type="email"
              className="h-12 pl-9"
            />
          </div>
        </Field>
      </div>
      <Field label="Domicilio" required error={errors.domicilio}>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            value={data.domicilio}
            onChange={(e) => update("domicilio", e.target.value)}
            placeholder="Calle, número, piso, Las Rozas"
            className="h-12 pl-9"
          />
        </div>
      </Field>
      <Field label="Código postal" required error={errors.codigoPostal}>
        <Input
          value={data.codigoPostal}
          onChange={(e) => update("codigoPostal", e.target.value)}
          placeholder="28231"
          maxLength={5}
          inputMode="numeric"
          className="h-12 w-full sm:w-40"
        />
      </Field>
    </>
  );
}

function StepExperiencia({ data, errors, update }: StepProps) {
  const yes = data.matriculadoAnterior === "si";
  return (
    <>
      <SectionTitle
        icon={Trophy}
        eyebrow="Paso 3"
        title="Experiencia previa"
        subtitle="Nos ayuda a ubicar al gimnasta en el grupo adecuado."
      />

      <Field
        label="¿Has practicado gimnasia anteriormente?"
        required
        error={errors.matriculadoAnterior}
      >
        <RadioGroup
          value={data.matriculadoAnterior}
          onValueChange={(v) => update("matriculadoAnterior", v as "si" | "no")}
          className="grid grid-cols-2 gap-3"
        >
          {(["si", "no"] as const).map((opt) => (
            <label
              key={opt}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all hover:border-primary/60 hover:bg-primary/5",
                data.matriculadoAnterior === opt
                  ? "border-primary bg-primary/10 shadow-[0_0_0_6px_color-mix(in_oklab,var(--primary)_10%,transparent)]"
                  : "border-border bg-background"
              )}
            >
              <RadioGroupItem value={opt} className="sr-only" />
              <img
                src={logoAsset.url}
                alt=""
                className={cn(
                  "h-10 w-10 rounded-full object-cover ring-2 transition-all",
                  data.matriculadoAnterior === opt ? "ring-primary" : "ring-border grayscale"
                )}
              />
              <div className="flex-1">
                <p className="text-sm font-black uppercase tracking-wider">
                  {opt === "si" ? "Sí" : "No"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {opt === "si" ? "Ya he practicado" : "Nunca he practicado"}
                </p>
              </div>
              {data.matriculadoAnterior === opt && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
            </label>
          ))}
        </RadioGroup>
      </Field>

      {yes && (
        <div className="animate-fade-in">
          <Field label="¿En qué club y a qué nivel?">
            <Textarea
              value={data.nivelPrevio}
              onChange={(e) => update("nivelPrevio", e.target.value)}
              placeholder="Club, categoría, nivel, años de práctica, competiciones..."
              rows={3}
            />
          </Field>
        </div>
      )}


      <Field label="¿Alguna información adicional relevante?" hint="Problemas de salud, alergias, consideraciones para el entrenamiento…">
        <Textarea
          value={data.infoAdicional}
          onChange={(e) => update("infoAdicional", e.target.value)}
          placeholder="Cuéntanos lo que debamos tener en cuenta."
          rows={3}
        />
      </Field>
    </>
  );
}

function StepConfirmacion({ data, errors, update }: StepProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Gimnasta", value: data.gimnastaNombre || "—" },
    {
      label: "Fecha nacimiento",
      value: data.fechaNacimiento
        ? format(data.fechaNacimiento, "PPP", { locale: es })
        : "—",
    },
    { label: "Padre / Madre / Tutor", value: data.padres || "—" },
    { label: "Teléfono", value: data.telefono || "—" },
    { label: "Email", value: data.email || "—" },
    { label: "Domicilio", value: data.domicilio || "—" },
    { label: "Código postal", value: data.codigoPostal || "—" },
    {
      label: "Ha practicado gimnasia",
      value: data.matriculadoAnterior === "si" ? "Sí" : data.matriculadoAnterior === "no" ? "No" : "—",
    },
    ...(data.nivelPrevio ? [{ label: "Club y nivel", value: data.nivelPrevio }] : []),

    ...(data.infoAdicional ? [{ label: "Info adicional", value: data.infoAdicional }] : []),
  ];

  return (
    <>
      <SectionTitle
        icon={CheckCircle2}
        eyebrow="Paso 4"
        title="Revisa y confirma"
        subtitle="Comprueba que todos los datos son correctos antes de enviar."
      />

      <div className="rounded-2xl border border-border bg-muted/30 divide-y divide-border overflow-hidden">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              {r.label}
            </span>
            <span className="col-span-2 text-foreground break-words">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer hover:border-primary/60 transition-colors">
          <Checkbox
            checked={data.aceptaCondiciones}
            onCheckedChange={(v) => update("aceptaCondiciones", Boolean(v))}
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed">
            He leído y acepto las <strong>condiciones generales</strong> de la inscripción a la
            actividad (cuotas, bajas, facturación mensual y recargo por retraso).
          </span>
        </label>
        {errors.aceptaCondiciones && (
          <p className="text-[11px] font-semibold text-destructive">{errors.aceptaCondiciones}</p>
        )}
        <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer hover:border-primary/60 transition-colors">
          <Checkbox
            checked={data.aceptaPrivacidad}
            onCheckedChange={(v) => update("aceptaPrivacidad", Boolean(v))}
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed">
            Autorizo el tratamiento de mis datos según el{" "}
            <strong>Reglamento (UE) 2016/679 y la LOPDGDD 3/2018</strong>, bajo la responsabilidad
            del Club CGA Fénix Las Rozas.
          </span>
        </label>
        {errors.aceptaPrivacidad && (
          <p className="text-[11px] font-semibold text-destructive">{errors.aceptaPrivacidad}</p>
        )}
      </div>
    </>
  );
}

/* -------------------------------- Success -------------------------------- */

function SuccessCard({
  ref,
  nombre,
  onReset,
}: {
  ref: string;
  nombre: string;
  onReset: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-[0_20px_60px_-30px_oklch(0_0_0/0.25)]">
      <GymnastFloaters />
      <div className="relative">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary animate-[scale-in_0.4s_ease-out]">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="mt-6 text-3xl sm:text-4xl font-black uppercase tracking-tight">
          ¡Preinscripción enviada!
        </h2>
        <p className="mt-3 max-w-lg mx-auto text-muted-foreground">
          Hemos registrado la preinscripción de{" "}
          <strong className="text-foreground">{nombre}</strong>. En breve nos pondremos en contacto
          para formalizar la plaza.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-primary">
          Referencia · {ref}
        </div>
        <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-muted/40 p-5 text-left text-sm text-muted-foreground">
          <p className="font-bold text-foreground mb-1">Próximo paso: matrícula</p>
          <p>
            Realiza la transferencia (65 € nuevos · 30 € antiguos) indicando{" "}
            <strong className="text-foreground">Nombre + Apellidos</strong> del gimnasta a la
            cuenta:
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-[11px] font-black uppercase tracking-wider text-destructive">
              Debes abonar la tasa para tener la plaza reservada
            </p>
          </div>
          <div className="mt-3 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2.5 text-center">
            <p className="font-mono text-sm font-black text-foreground tracking-wide">
              ES57 0081 0357 4200 0209 9917
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            onClick={onReset}
            variant="outline"
            className="rounded-full font-black uppercase tracking-wider"
          >
            Nueva preinscripción
          </Button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-black uppercase tracking-wider text-primary-foreground hover:scale-[1.02] transition-transform"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- UI bits --------------------------------- */

function SectionTitle({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
        <Icon className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-black uppercase tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  items,
  footer,
  code,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: { label: string; value: string }[];
  footer?: string;
  code?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.15em] text-foreground">{title}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label} className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{i.label}</span>
            <span className="font-black text-foreground">{i.value}</span>
          </li>
        ))}
      </ul>
      {footer && <p className="mt-4 text-[11px] text-muted-foreground">{footer}</p>}
      {code && (
        <p className="mt-1 rounded-lg bg-muted px-2 py-1 font-mono text-[11px] text-foreground">
          {code}
        </p>
      )}
    </div>
  );
}
