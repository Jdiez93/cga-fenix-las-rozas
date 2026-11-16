drop policy if exists "Authenticated can submit inscripciones" on public.inscripciones;
drop policy if exists "Public can submit inscripciones" on public.inscripciones;
create policy "Public can submit valid inscripciones" on public.inscripciones
for insert to anon, authenticated
with check (
  pagado = false
  and lista_espera = true
  and contrato_path is not null
  and contrato_path ~ '^[A-Za-z0-9-]{8,64}/FNX-[A-Za-z0-9-]+\.pdf$'
  and length(gimnasta_nombre) between 1 and 100
  and length(gimnasta_apellidos) between 1 and 150
  and length(email) between 3 and 255 and email like '%@%'
  and length(telefono) between 6 and 30
  and length(domicilio) between 1 and 300
  and length(codigo_postal) between 3 and 10
  and coalesce(length(info_adicional), 0) <= 2000
  and coalesce(length(club_nivel_anterior), 0) <= 300
  and coalesce(length(padre_nombre_apellidos), 0) <= 200
  and coalesce(length(madre_nombre_apellidos), 0) <= 200
);

drop policy if exists "Anyone can upload signed PDF contratos" on storage.objects;
create policy "Anyone can upload signed PDF contratos" on storage.objects
for insert to anon, authenticated
with check (
  bucket_id = 'contratos-firmados'
  and name ~ '^[A-Za-z0-9-]{8,64}/FNX-[A-Za-z0-9-]+\.pdf$'
  and (owner_id is null or owner_id = (select auth.uid()::text))
);