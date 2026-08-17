ALTER TABLE public.inscripciones ADD COLUMN IF NOT EXISTS pagado boolean NOT NULL DEFAULT false;
GRANT SELECT, INSERT, UPDATE ON public.inscripciones TO authenticated;
CREATE POLICY "Authenticated admins can update inscripciones" ON public.inscripciones FOR UPDATE TO authenticated USING (true) WITH CHECK (true);