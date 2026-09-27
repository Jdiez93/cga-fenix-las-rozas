import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { askAssistant } from "@/lib/assistant.functions";
import { logoFenixJpeg } from "@/lib/media";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = ["¿Qué horarios hay?", "¿Cuánto cuesta?", "¿Cómo me inscribo?", "¿Dónde entrenáis?"];

function renderText(text: string): ReactNode {
  return text.split("\n").map((line, i) => (
    <p key={i} className={line.trim() ? "" : "h-2"}>
      {line
        .replace(/^\s*[-*]\s+/, "• ")
        .split(/(\*\*[^*]+\*\*)/g)
        .map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong> : part,
        )}
    </p>
  ));
}

export function ChatAssistant() {
  const { pathname } = useLocation();
  const ask = useServerFn(askAssistant);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "¡Hola! Soy Fénix, el asistente del club. Pregúntame sobre horarios, grupos, cuotas o inscripciones." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  if (pathname.startsWith("/admin")) return null;

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await ask({ data: { messages: next.slice(1).slice(-20) } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Ha ocurrido un error. Inténtalo de nuevo." }]);
    } finally {
      setLoading(false);
    }
  };

  const Avatar = ({ size = "h-8 w-8" }: { size?: string }) => (
    <img src={logoFenixJpeg.url} alt="Fénix" className={`${size} shrink-0 rounded-full object-cover ring-1 ring-primary/50`} />
  );

  return (
    <div data-no-reveal>
      {open && (
        <div className="fixed bottom-24 right-4 z-[60] flex h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6">
          <div className="flex items-center gap-3 border-b border-border bg-carbon px-4 py-3">
            <Avatar size="h-10 w-10" />
            <div className="flex-1">
              <p className="text-sm font-bold text-primary">Asistente Fénix</p>
              <p className="text-[11px] text-muted-foreground">Resuelve tus dudas sobre el club</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Cerrar asistente" className="rounded-full p-1.5 text-muted-foreground hover:text-primary">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && <Avatar size="h-7 w-7" />}
                <div
                  className={`max-w-[80%] space-y-0.5 rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted text-foreground"
                  }`}
                >
                  {renderText(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2">
                <Avatar size="h-7 w-7" />
                <div className="rounded-2xl bg-muted px-3.5 py-2.5"><Loader2 className="h-4 w-4 animate-spin text-primary" /></div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary hover:bg-primary/10">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={2000}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Enviar" className="rounded-full bg-primary p-2.5 text-primary-foreground disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}
        className="fixed bottom-5 right-4 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-carbon shadow-elegant ring-2 ring-primary transition-transform duration-300 hover:scale-110 sm:right-6"
      >
        {open ? (
          <X className="h-7 w-7 text-primary" />
        ) : (
          <>
            <img src={logoFenixJpeg.url} alt="" className="h-full w-full rounded-full object-cover" />
            <span className="absolute -right-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="h-3.5 w-3.5" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
