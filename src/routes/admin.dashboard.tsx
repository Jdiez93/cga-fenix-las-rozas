import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Download,
  Loader2,
  LogOut,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import { Toaster, toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    return { adminUser: data.user };
  },
  head: () => ({
    meta: [
      { title: "Preinscripciones · Panel CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Panel privado de gestión de preinscripciones del CGA Fénix Las Rozas: listado, búsqueda y exportación a Excel.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Preinscripciones · Panel CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content: "Gestión interna de las preinscripciones del club.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDashboardPage,
});

type Inscripcion = {
  id: string;
  gimnasta_nombre: string;
  gimnasta_apellidos: string;
  fecha_nacimiento: string;
  padre_nombre_apellidos: string | null;
  madre_nombre_apellidos: string | null;
  telefono: string;
  email: string;
  domicilio: string;
  codigo_postal: string;
  experiencia_previa: boolean;
  club_nivel_anterior: string | null;
  info_adicional: string | null;
  created_at: string;
};

function calcularEdad(fecha: string): number | "—" {
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return "—";
  const hoy = new Date();
  let edad = hoy.getFullYear() - d.getFullYear();
  const m = hoy.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < d.getDate())) edad--;
  return edad;
}

function fmtFecha(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("es-ES");
}

function fmtFechaHora(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" });
}

async function fetchInscripciones(): Promise<Inscripcion[]> {
  const { data, error } = await supabase
    .from("inscripciones")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Inscripcion[];
}

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [exporting, setExporting] = useState(false);
  const [nuevas, setNuevas] = useState(0);
  const firstLoad = useRef(true);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await fetchInscripciones();
      setRows(data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error
          ? `No se han podido cargar las inscripciones: ${e.message}`
          : "No se han podido cargar las inscripciones.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime: nuevas inscripciones sin recargar la página
  useEffect(() => {
    const channel = supabase
      .channel("inscripciones-admin")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inscripciones" },
        (payload) => {
          const nueva = payload.new as Inscripcion;
          setRows((prev) =>
            prev.some((r) => r.id === nueva.id) ? prev : [nueva, ...prev],
          );
          setNuevas((n) => n + 1);
          toast.success("Nueva inscripción recibida", {
            description: `${nueva.gimnasta_nombre} ${nueva.gimnasta_apellidos}`,
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (firstLoad.current) firstLoad.current = false;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      `${r.gimnasta_nombre} ${r.gimnasta_apellidos}`.toLowerCase().includes(q),
    );
  }, [rows, query]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  async function handleExport() {
    setExporting(true);
    try {
      // Fetch fresco en el momento del click
      const fresh = await fetchInscripciones();
      setRows(fresh);
      setNuevas(0);

      const XLSX = await import("xlsx");
      const sheetData = fresh.map((r) => ({
        "Fecha de solicitud": fmtFechaHora(r.created_at),
        Nombre: r.gimnasta_nombre,
        Apellidos: r.gimnasta_apellidos,
        "Fecha de nacimiento": fmtFecha(r.fecha_nacimiento),
        Edad: calcularEdad(r.fecha_nacimiento),
        "Padre (nombre y apellidos)": r.padre_nombre_apellidos ?? "",
        "Madre (nombre y apellidos)": r.madre_nombre_apellidos ?? "",
        Teléfono: r.telefono,
        Email: r.email,
        Domicilio: r.domicilio,
        "Código postal": r.codigo_postal,
        "Experiencia previa": r.experiencia_previa ? "Sí" : "No",
        "Club / nivel anterior": r.club_nivel_anterior ?? "",
        "Información adicional": r.info_adicional ?? "",
      }));

      const ws = XLSX.utils.json_to_sheet(sheetData);
      ws["!cols"] = [
        { wch: 18 }, { wch: 16 }, { wch: 22 }, { wch: 18 }, { wch: 7 },
        { wch: 26 }, { wch: 26 }, { wch: 14 }, { wch: 28 }, { wch: 34 },
        { wch: 14 }, { wch: 16 }, { wch: 28 }, { wch: 40 },
      ];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Inscripciones");

      const hoy = new Date();
      const stamp = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
      XLSX.writeFile(wb, `inscripciones_cga_fenix_${stamp}.xlsx`);
      toast.success(`Excel generado con ${fresh.length} inscripciones`);
    } catch (e) {
      console.error(e);
      toast.error(
        e instanceof Error ? `No se ha podido exportar: ${e.message}` : "No se ha podido exportar.",
      );
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Toaster richColors position="top-right" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Cabecera */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-primary/30 pb-6">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
              <Users className="h-3.5 w-3.5" />
              Panel interno
            </p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
              Preinscripciones
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {rows.length} solicitudes registradas · ordenadas de más reciente a más antigua
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {nuevas > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-primary">
                <Bell className="h-3.5 w-3.5 animate-pulse" />
                {nuevas} nueva{nuevas > 1 ? "s" : ""}
              </span>
            )}
            <button
              onClick={() => void load()}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-black uppercase tracking-wider text-foreground transition-colors hover:bg-accent"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refrescar
            </button>
            <button
              onClick={() => void handleExport()}
              disabled={exporting}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-black uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {exporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              Descargar Excel
            </button>
            <button
              onClick={() => void handleSignOut()}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-black uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent"
            >
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre del gimnasta…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <span className="shrink-0 text-xs font-bold text-muted-foreground">
              {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
            </span>
          )}
        </div>

        {/* Contenido */}
        {error && (
          <p className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-16 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Cargando inscripciones…
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            {rows.length === 0
              ? "Todavía no hay preinscripciones registradas."
              : "Ningún gimnasta coincide con la búsqueda."}
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-primary/30 bg-card">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-primary/10 text-[11px] uppercase tracking-wider text-primary">
                <tr>
                  <th className="px-4 py-3 font-black">Recibida</th>
                  <th className="px-4 py-3 font-black">Gimnasta</th>
                  <th className="px-4 py-3 font-black">Nacimiento</th>
                  <th className="px-4 py-3 font-black">Edad</th>
                  <th className="px-4 py-3 font-black">Padre / Madre</th>
                  <th className="px-4 py-3 font-black">Contacto</th>
                  <th className="px-4 py-3 font-black">Domicilio</th>
                  <th className="px-4 py-3 font-black">Experiencia</th>
                  <th className="px-4 py-3 font-black">Info adicional</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-border/60 align-top transition-colors hover:bg-primary/5"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                      {fmtFechaHora(r.created_at)}
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">
                      {r.gimnasta_nombre} {r.gimnasta_apellidos}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {fmtFecha(r.fecha_nacimiento)}
                    </td>
                    <td className="px-4 py-3 font-black text-primary">
                      {calcularEdad(r.fecha_nacimiento)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {[r.padre_nombre_apellidos, r.madre_nombre_apellidos]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <a href={`tel:${r.telefono}`} className="block hover:text-primary">
                        {r.telefono}
                      </a>
                      <a href={`mailto:${r.email}`} className="block hover:text-primary">
                        {r.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.domicilio}
                      <span className="block text-xs">CP {r.codigo_postal}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider ${
                          r.experiencia_previa
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {r.experiencia_previa ? "Sí" : "No"}
                      </span>
                      {r.club_nivel_anterior && (
                        <span className="mt-1 block max-w-[220px] text-xs text-muted-foreground">
                          {r.club_nivel_anterior}
                        </span>
                      )}
                    </td>
                    <td className="max-w-[260px] px-4 py-3 text-xs text-muted-foreground">
                      {r.info_adicional || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
