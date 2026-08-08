ALTER TABLE public.inscripciones ADD COLUMN IF NOT EXISTS contrato_path text;

CREATE POLICY "Public can upload contratos firmados"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'contratos-firmados');

CREATE POLICY "Authenticated can upload contratos firmados"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'contratos-firmados');

CREATE POLICY "Authenticated can read contratos firmados"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'contratos-firmados');

CREATE POLICY "Authenticated can delete contratos firmados"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'contratos-firmados');