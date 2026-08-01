CREATE TABLE public.videos_galeria (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text,
  storage_path text NOT NULL,
  orden integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.videos_galeria TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos_galeria TO authenticated;
GRANT ALL ON public.videos_galeria TO service_role;

ALTER TABLE public.videos_galeria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read videos_galeria" ON public.videos_galeria FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated can read videos_galeria" ON public.videos_galeria FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert videos_galeria" ON public.videos_galeria FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update videos_galeria" ON public.videos_galeria FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete videos_galeria" ON public.videos_galeria FOR DELETE TO authenticated USING (true);

CREATE POLICY "Public read video files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'videos-galeria');
CREATE POLICY "Authenticated upload video files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos-galeria');
CREATE POLICY "Authenticated update video files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'videos-galeria') WITH CHECK (bucket_id = 'videos-galeria');
CREATE POLICY "Authenticated delete video files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos-galeria');