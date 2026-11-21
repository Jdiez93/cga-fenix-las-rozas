import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  ref: z.string().regex(/^FNX-[A-Z0-9]{4,20}$/),
  safeName: z.string().regex(/^[a-z0-9-]{0,80}$/),
});

// Issues a one-time signed upload URL for the signed club rules PDF.
// The path is generated server-side so visitors cannot choose or overwrite files.
export const createContratoUpload = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const path = `${crypto.randomUUID()}/${data.ref}-${data.safeName || "normativa"}.pdf`;
    const { data: signed, error } = await supabaseAdmin.storage
      .from("contratos-firmados")
      .createSignedUploadUrl(path);
    if (error || !signed) {
      console.error("createSignedUploadUrl failed", error);
      throw new Error("No se ha podido preparar la subida del documento");
    }
    return { path: signed.path, token: signed.token };
  });
