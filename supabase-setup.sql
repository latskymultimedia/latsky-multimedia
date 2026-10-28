-- AWIEF 2026 photo wall. Run once in Supabase > SQL Editor. Safe to run again.
-- Paste ONLY the SQL below (not this file's name) and press Run.
create table if not exists moments (
  id bigint generated always as identity primary key,
  path text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
alter table moments enable row level security;

drop policy if exists "submit" on moments;
create policy "submit" on moments for insert to anon with check (approved = false);
drop policy if exists "view approved" on moments;
create policy "view approved" on moments for select to anon using (approved = true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('moments','moments',true,2097152,array['image/jpeg'])
on conflict (id) do nothing;

drop policy if exists "upload" on storage.objects;
create policy "upload" on storage.objects for insert to anon with check (bucket_id = 'moments');
