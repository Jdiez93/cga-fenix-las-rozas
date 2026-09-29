drop policy "Public read video files" on storage.objects;
create policy "Public read listed gallery videos" on storage.objects for select to anon, authenticated
using (
  bucket_id = 'videos-galeria' and exists (
    select 1 from public.videos_galeria v
    where v.storage_path = storage.objects.name
       or storage.objects.name = 'posters/' || reverse(split_part(reverse(v.storage_path), '/', 1)) || '.jpg'
  )
);