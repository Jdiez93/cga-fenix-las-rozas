import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Play, Video, X } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/galeria/videos")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Galería de vídeos · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Vídeos de entrenamientos, exhibiciones y competiciones de las gimnastas del CGA Fénix Las Rozas.",
      },
      { property: "og:title", content: "Galería de vídeos · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content: "Momentos en vídeo del Club de Gimnasia Artística Fénix Las Rozas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GaleriaVideosPage,
});

type VideoRow = {
  id: string;
  titulo: string | null;
  storage_path: string;
  orden: number;
  created_at: string;
};

type VideoItem = VideoRow & { url: string; poster: string | null };

const BUCKET = "videos-galeria";

function posterPath(storagePath: string): string {
  const name = storagePath.split("/").pop() ?? storagePath;
  return `posters/${name}.jpg`;
}

async function fetchVideos(): Promise<VideoItem[]> {
  const { data, error } = await supabase
    .from("videos_galeria")
    .select("*")
    .order("orden", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;

  const rows = (data ?? []) as VideoRow[];
  if (rows.length === 0) return [];

  const paths = rows.map((r) => r.storage_path);
  const posters = rows.map((r) => posterPath(r.storage_path));

  const [signedVideos, signedPosters] = await Promise.all([
    supabase.storage.from(BUCKET).createSignedUrls(paths, 60 * 60 * 6),
    supabase.storage.from(BUCKET).createSignedUrls(posters, 60 * 60 * 6),
  ]);

  if (signedVideos.error) throw signedVideos.error;

  return rows.map((r, i) => ({
    ...r,
    url: signedVideos.data?.[i]?.signedUrl ?? "",
    poster: signedPosters.data?.[i]?.signedUrl ?? null,
  }));
}

function GaleriaVideosPage() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<VideoItem | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const data = await fetchVideos();
        if (!cancel) setItems(data);
      } catch (e) {
        console.error(e);
        if (!cancel) setError("No se han podido cargar los vídeos. Inténtalo de nuevo más tarde.");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
            <Video className="h-3.5 w-3.5" />
            Galería
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Vídeos del club
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Entrenamientos, ejercicios y competiciones de nuestras gimnastas. Pulsa en cualquier
            vídeo para verlo a pantalla completa.
          </p>
        </header>

        {error && (
          <p className="mt-10 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Cargando vídeos…
          </div>
        ) : items.length === 0 ? (
          <p className="mt-20 text-center text-sm text-muted-foreground">
            Todavía no hay vídeos publicados.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, i) => (
              <VideoTile key={item.id} item={item} index={i} onOpen={() => setActive(item)} />
            ))}
          </div>
        )}
      </div>

      {active && <VideoModal item={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function VideoTile({
  item,
  index,
  onOpen,
}: {
  item: VideoItem;
  index: number;
  onOpen: () => void;
}) {
  const [posterReady, setPosterReady] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="group animate-[fadeUp_.6s_ease-out_both] overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary/70 focus:outline-none focus-visible:border-primary"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {!posterReady && (
          <div className="absolute inset-0 grid place-items-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary/70" />
          </div>
        )}
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.titulo ?? "Vídeo del club"}
            loading="lazy"
            onLoad={() => setPosterReady(true)}
            onError={() => setPosterReady(true)}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04] ${
              posterReady ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <video
            src={item.url}
            preload="metadata"
            muted
            playsInline
            onLoadedMetadata={() => setPosterReady(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </span>
      </div>

      <div className="px-4 py-3">
        <p className="truncate text-sm font-black uppercase tracking-wide text-foreground">
          {item.titulo ?? "Vídeo del club"}
        </p>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          CGA Fénix Las Rozas
        </p>
      </div>
    </button>
  );
}

function VideoModal({ item, onClose }: { item: VideoItem; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  const stop = useCallback(() => {
    ref.current?.pause();
    onClose();
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-[fadeUp_.25s_ease-out_both]"
      onClick={stop}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-primary/40 bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={stop}
          aria-label="Cerrar vídeo"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative grid max-h-[78vh] place-items-center bg-black">
          {!ready && (
            <div className="absolute inset-0 grid place-items-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          <video
            ref={ref}
            src={item.url}
            poster={item.poster ?? undefined}
            controls
            autoPlay
            playsInline
            onLoadedData={() => setReady(true)}
            className="max-h-[78vh] w-auto max-w-full"
          />
        </div>

        <div className="border-t border-border px-5 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-foreground">
            {item.titulo ?? "Vídeo del club"}
          </p>
        </div>
      </div>
    </div>
  );
}
