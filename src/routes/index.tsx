import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Club de Gimnasia Artística
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-black uppercase leading-[0.95] tracking-tight">
          CGA <span className="text-gradient-fire">Fénix</span>
          <br />
          Las Rozas
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
          Rediseño en curso — por ahora hemos renovado el <strong>Header</strong> y el{" "}
          <strong>Footer</strong>. Desplázate para ver el pie de página y prueba el menú
          en mobile.
        </p>
      </div>
      <div className="mt-16 h-[60vh] rounded-2xl border border-dashed border-border grid place-items-center text-muted-foreground text-sm">
        Contenido del body / hero pendiente
      </div>
    </section>
  );
}
