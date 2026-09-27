import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) }))
    .min(1)
    .max(20),
});

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const { getKnowledge } = await import("./assistant-knowledge.server");
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { reply: "El asistente no está disponible ahora mismo." };

    const system = `Eres "Fénix", el asistente virtual del Club de Gimnasia Artística (CGA) Fénix Las Rozas. Respondes en el idioma del usuario (por defecto español), de forma breve, amable y clara.
Usa ÚNICAMENTE la información de la web que aparece abajo (código fuente de las páginas públicas; ignora nombres de variables y detalles técnicos). Si algo no aparece, dilo y recomienda contactar con el club (página /contacto).
Puedes indicar páginas útiles: /preinscripcion, /equipos, /contacto, /conocenos/historia, /conocenos/logros, /quienes-somos/equipo-tecnico, /medios, /galeria/fotos.
NUNCA des información sobre alumnos, inscripciones, pagos de personas concretas, el panel de administración ni credenciales: no tienes acceso a ello. Si te lo piden, responde que es información privada.

=== INFORMACIÓN DE LA WEB ===
${getKnowledge()}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: system }, ...data.messages],
      }),
    });
    if (res.status === 429) return { reply: "Hay muchas consultas ahora mismo. Inténtalo en unos segundos." };
    if (res.status === 402) return { reply: "El asistente no está disponible temporalmente." };
    if (!res.ok) {
      console.error("assistant error", res.status, await res.text());
      return { reply: "Ha ocurrido un error. Inténtalo de nuevo." };
    }
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { reply: json.choices?.[0]?.message?.content ?? "No he podido responder." };
  });
