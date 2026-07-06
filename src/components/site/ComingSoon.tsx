import { Construction, ArrowLeft } from "lucide-react";

type ComingSoonProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function ComingSoon({
  title,
  eyebrow = "Página en construcción",
  description = "Estamos trabajando en esta sección de la web. Muy pronto podrás disfrutar de todo el contenido aquí. Gracias por tu paciencia.",
}: ComingSoonProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-8">
        <Construction className="h-7 w-7" />
      </div>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        {eyebrow}
      </span>
      <h1 className="mt-6 text-4xl sm:text-5xl font-black uppercase tracking-tight leading-[1.05]">
        {title}
      </h1>
      <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-black uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-elegant)] hover:scale-[1.03] active:scale-[0.98] transition-transform"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </a>
        <a
          href="tel:+34679980626"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-[13px] font-black uppercase tracking-[0.1em] text-foreground hover:bg-accent transition-colors"
        >
          Contáctanos
        </a>
      </div>
    </section>
  );
}
