CREATE TABLE public.inscripciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gimnasta_nombre text NOT NULL,
  gimnasta_apellidos text NOT NULL,
  fecha_nacimiento date NOT NULL,
  padre_nombre_apellidos text,
  madre_nombre_apellidos text,
  telefono text NOT NULL,
  email text NOT NULL,
  domicilio text NOT NULL,
  codigo_postal text NOT NULL,
  experiencia_previa boolean NOT NULL DEFAULT false,
  club_nivel_anterior text,
  info_adicional text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.inscripciones TO anon;
GRANT SELECT, INSERT ON public.inscripciones TO authenticated;
GRANT ALL ON public.inscripciones TO service_role;

ALTER TABLE public.inscripciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit inscripciones"
  ON public.inscripciones FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Authenticated can submit inscripciones"
  ON public.inscripciones FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated admins can read inscripciones"
  ON public.inscripciones FOR SELECT TO authenticated USING (true);

CREATE INDEX inscripciones_created_at_idx ON public.inscripciones (created_at DESC);

ALTER PUBLICATION supabase_realtime ADD TABLE public.inscripciones;