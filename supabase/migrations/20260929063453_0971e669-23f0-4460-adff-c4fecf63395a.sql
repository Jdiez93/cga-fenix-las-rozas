drop policy "Anyone can upload signed PDF contratos" on storage.objects;
create policy "Anyone can upload signed PDF contratos" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'contratos-firmados' and lower(storage.extension(name)) = 'pdf');