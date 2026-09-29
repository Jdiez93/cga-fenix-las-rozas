create type public.app_role as enum ('admin', 'moderator', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users
where lower(email) in ('gymembajador@hotmail.com','miguelalvarezcalles@gmail.com')
on conflict do nothing;

-- inscripciones
drop policy "Authenticated admins can read inscripciones" on public.inscripciones;
drop policy "Authenticated admins can update inscripciones" on public.inscripciones;
create policy "Admins can read inscripciones" on public.inscripciones for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins can update inscripciones" on public.inscripciones for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- videos_galeria
drop policy "Authenticated can delete videos_galeria" on public.videos_galeria;
drop policy "Authenticated can update videos_galeria" on public.videos_galeria;
drop policy "Authenticated can insert videos_galeria" on public.videos_galeria;
create policy "Admins can delete videos_galeria" on public.videos_galeria for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins can update videos_galeria" on public.videos_galeria for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins can insert videos_galeria" on public.videos_galeria for insert to authenticated with check (public.has_role(auth.uid(),'admin'));

-- storage: contratos
drop policy "Authenticated can read contratos firmados" on storage.objects;
drop policy "Authenticated can delete contratos firmados" on storage.objects;
drop policy "Authenticated can upload contratos firmados" on storage.objects;
drop policy "Public can upload contratos firmados" on storage.objects;
create policy "Admins can read contratos firmados" on storage.objects for select to authenticated using (bucket_id = 'contratos-firmados' and public.has_role(auth.uid(),'admin'));
create policy "Admins can delete contratos firmados" on storage.objects for delete to authenticated using (bucket_id = 'contratos-firmados' and public.has_role(auth.uid(),'admin'));
create policy "Anyone can upload signed PDF contratos" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'contratos-firmados' and lower(storage.extension(name)) = 'pdf' and position('/' in name) = 0);

-- storage: videos
drop policy "Authenticated delete video files" on storage.objects;
drop policy "Authenticated update video files" on storage.objects;
drop policy "Authenticated upload video files" on storage.objects;
create policy "Admins delete video files" on storage.objects for delete to authenticated using (bucket_id = 'videos-galeria' and public.has_role(auth.uid(),'admin'));
create policy "Admins update video files" on storage.objects for update to authenticated using (bucket_id = 'videos-galeria' and public.has_role(auth.uid(),'admin')) with check (bucket_id = 'videos-galeria' and public.has_role(auth.uid(),'admin'));
create policy "Admins upload video files" on storage.objects for insert to authenticated with check (bucket_id = 'videos-galeria' and public.has_role(auth.uid(),'admin'));