CREATE POLICY "Public can update contratos firmados" ON storage.objects FOR UPDATE TO anon USING (bucket_id = 'contratos-firmados') WITH CHECK (bucket_id = 'contratos-firmados');
CREATE POLICY "Public can read own contratos firmados" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'contratos-firmados');
DELETE FROM public.inscripciones WHERE email = 'a@b.c';