-- Remove anonymous read/overwrite access to signed documents
drop policy if exists "Public can read own contratos firmados" on storage.objects;
drop policy if exists "Public can update contratos firmados" on storage.objects;
drop policy if exists "Public can upload contratos firmados" on storage.objects;

-- Anonymous applicants may only create a new file (no read, no overwrite)
create policy "Public can upload contratos firmados"
on storage.objects
for insert
to anon
with check (bucket_id = 'contratos-firmados');

-- Only authenticated club staff can read/delete, and only files
-- actually referenced by an inscripción record
drop policy if exists "Authenticated can read contratos firmados" on storage.objects;
create policy "Authenticated can read contratos firmados"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'contratos-firmados'
  and exists (
    select 1 from public.inscripciones i where i.contrato_path = storage.objects.name
  )
);

drop policy if exists "Authenticated can delete contratos firmados" on storage.objects;
create policy "Authenticated can delete contratos firmados"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'contratos-firmados'
  and exists (
    select 1 from public.inscripciones i where i.contrato_path = storage.objects.name
  )
);