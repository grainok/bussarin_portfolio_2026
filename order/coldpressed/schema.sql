-- Run in the Supabase SQL editor (private project).
create table if not exists public.mf_orders (
 id uuid primary key default gen_random_uuid(),
 date date not null,
 name text not null check (char_length(name) between 1 and 120),
 address text not null default '',
 product text not null default '',
 quantity integer not null check (quantity between 1 and 9999),
 amount numeric(12,2) check (amount >= 0),
 paid boolean not null default false,
 delivered boolean not null default false,
 status text not null default 'confirmed' check (status in ('confirmed','pending','cancelled')),
 notes text not null default '',
 created_at timestamptz not null default now()
);
alter table public.mf_orders enable row level security;
-- No anon/authenticated policies: only the server-side service role can access records.
create index if not exists mf_orders_date_idx on public.mf_orders(date desc);
