import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Trash2, UploadCloud, Video } from "lucide-react";
import { Toaster, toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/videos")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    return { adminUser: data.user };
  },
  head: () => ({
    meta: [
      { title: "Vídeos · Panel CGA Fénix Las Rozas" },
      {
        name: "description",
        content: "Panel privado para subir y gestionar los vídeos de la galería del club.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Vídeos · Panel CGA Fénix Las Rozas" },
      { property: "og:description", content: "Gestión interna de la galería de vídeos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminVideosPage,
});

const BUCKET = "videos-galeria";

type VideoRow = {
  id: string;
  titulo: string | null;
  storage_path: string;
  orden: number;
  created_at: string;
};

function slugFile(name: string): string {
  const clean = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .toLowerCase();
  return `${Date.now()}-${clean}`;
}

async function grabPoster(file: File): Promise<Blob | null> {
  try {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.playsInline = true;
    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error("poster"));
      setTimeout(() => reject(new Error("timeout")), 8000);
    });
    video.currentTime = Math.min(0.6, (video.duration || 1) / 2);
    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve();
      setTimeout(resolve, 3000);
    });
    const canvas = document.createElement("canvas");
    const w = video.videoWidth || 720;
    const h = video.videoHeight || 405;
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")?.drawImage(video, 0, 0, w, h);
    URL.revokeObjectURL(url);
    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", 0.82),
    );
  } catch {
    return null;
  }
}

function AdminVideosPage() {
  const [rows, setRows] = useState<VideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("videos_galeria")
      .select("*")
      .order("orden", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(`No se han podido cargar los vídeos: ${error.message}`);
    } else {
      setRows((data ?? []) as VideoRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("video/"));
      if (list.length === 0) {
        toast.error("Selecciona archivos de vídeo.");
        return;
      }
      setUploading(true);
      try {
        for (let i = 0; i < list.length; i++) {
          const file = list[i];
          setProgress(`Subiendo ${i + 1}/${list.length}: ${file.name}`);
          const fileName = slugFile(file.name);
          const storagePath = `videos/${fileName}`;

          const up = await supabase.storage.from(BUCKET).upload(storagePath, file, {
            contentType: file.type,
            upsert: false,
          });
          if (up.error) throw up.error;

          const poster = await grabPoster(file);
          if (poster) {
            await supabase.storage
              .from(BUCKET)
              .upload(`posters/${fileName}.jpg`, poster, {
                contentType: "image/jpeg",
                upsert: true,
              });
          }

          const ins = await supabase.from("videos_galeria").insert({
            titulo: file.name.replace(/\.[^.]+$/, ""),
            storage_path: storagePath,
            orden: 0,
          });
          if (ins.error) throw ins.error;
        }
        toast.success(`${list.length} vídeo(s) subido(s)`);
        await load();
      } catch (e) {
        console.error(e);
        toast.error(
          e instanceof Error ? `Error al subir: ${e.message}` : "No se ha podido subir el vídeo.",
        );
      } finally {
        setProgress("");
        setUploading(false);
      }
    },
    [load],
  );

  async function updateRow(id: string, patch: Partial<VideoRow>) {
    const { error } = await supabase.from("videos_galeria").update(patch).eq("id", id);
    if (error) toast.error(`No se ha podido guardar: ${error.message}`);
    else toast.success("Guardado");
  }

  async function removeRow(row: VideoRow) {
    if (!confirm(`¿Eliminar "${row.titulo ?? row.storage_path}"?`)) return;
    const name = row.storage_path.split("/").pop();
    await supabase.storage.from(BUCKET).remove([row.storage_path, `posters/${name}.jpg`]);
    const { error } = await supabase.from("videos_galeria").delete().eq("id", row.id);
    if (error) {
      toast.error(`No se ha podido eliminar: ${error.message}`);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    toast.success("Vídeo eliminado");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Toaster richColors position="top-right" />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="border-b border-primary/30 pb-6">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al panel
          </Link>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
            Galería de vídeos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} vídeo(s) publicados en la web
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`mt-8 cursor-pointer rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragging ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            multiple
            hidden
            onChange={(e) => e.target.files && void handleFiles(e.target.files)}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3 text-sm font-bold text-primary">
              <Loader2 className="h-6 w-6 animate-spin" />
              {progress || "Subiendo…"}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-8 w-8 text-primary" />
              <p className="text-sm font-black uppercase tracking-wider text-foreground">
                Arrastra vídeos aquí o haz clic
              </p>
              <p className="text-xs text-muted-foreground">
                Se genera la miniatura automáticamente
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Cargando…
          </div>
        ) : rows.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Todavía no hay vídeos subidos.
          </p>
        ) : (
          <ul className="mt-8 space-y-3">
            {rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
              >
                <Video className="h-4 w-4 shrink-0 text-primary" />
                <input
                  defaultValue={row.titulo ?? ""}
                  placeholder="Título del vídeo"
                  onBlur={(e) =>
                    e.target.value !== (row.titulo ?? "") &&
                    void updateRow(row.id, { titulo: e.target.value || null })
                  }
                  className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary"
                />
                <input
                  type="number"
                  defaultValue={row.orden}
                  title="Orden"
                  onBlur={(e) =>
                    Number(e.target.value) !== row.orden &&
                    void updateRow(row.id, { orden: Number(e.target.value) || 0 })
                  }
                  className="w-20 shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary"
                />
                <button
                  onClick={() => void removeRow(row)}
                  aria-label="Eliminar vídeo"
                  className="shrink-0 rounded-lg border border-destructive/40 p-2 text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
