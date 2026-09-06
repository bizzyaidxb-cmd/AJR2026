-- AJR — 0001 foundation: identity, geography, global roles, clubs
-- Amar Jawan Ride Events · Supabase project AJR2026 (ap-south-1)
-- RLS is enabled on every table with NO policies yet (server/service-role only);
-- access policies + the JWT roles hook come in a later migration.

create extension if not exists pgcrypto;   -- gen_random_uuid()
create extension if not exists citext;     -- case-insensitive email

-- ── updated_at helper ───────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ── enums ───────────────────────────────────────────────────────────────────
do $$ begin create type public.app_role as enum ('event_team','super_admin'); exception when duplicate_object then null; end $$;
do $$ begin create type public.club_member_role as enum ('member','admin'); exception when duplicate_object then null; end $$;
do $$ begin create type public.club_status as enum ('pending','approved','rejected','suspended'); exception when duplicate_object then null; end $$;
do $$ begin create type public.membership_status as enum ('invited','pending','approved','left'); exception when duplicate_object then null; end $$;
do $$ begin create type public.profile_status as enum ('registered','card_complete'); exception when duplicate_object then null; end $$;

-- ── states ──────────────────────────────────────────────────────────────────
-- Ride dates are set per state (spec §1): every city in a state rides the same day.
create table if not exists public.states (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  ride_date   date,
  theme       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── cities ──────────────────────────────────────────────────────────────────
create table if not exists public.cities (
  id                       uuid primary key default gen_random_uuid(),
  state_id                 uuid not null references public.states(id) on delete restrict,
  name                     text not null,
  tier                     smallint,
  host_id                  uuid,        -- FK to profiles added after profiles exists
  fundraising_target_paise bigint not null default 0,
  lat                      double precision,
  lng                      double precision,
  status                   text not null default 'active',
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  unique (state_id, name)
);
create index if not exists cities_state_id_idx on public.cities(state_id);

-- ── profiles (1:1 with auth.users) ──────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text,
  second_name text,
  email       citext,
  phone       text,
  city_id     uuid,        -- FK to cities added below
  status      public.profile_status not null default 'registered',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists profiles_city_id_idx on public.profiles(city_id);

-- resolve the circular profiles <-> cities references
alter table public.profiles
  add constraint profiles_city_id_fkey foreign key (city_id) references public.cities(id) on delete set null;
alter table public.cities
  add constraint cities_host_id_fkey foreign key (host_id) references public.profiles(id) on delete set null;

-- ── rider_profiles ──────────────────────────────────────────────────────────
-- The "complete your rider card" data (spec §4.6). blood_group is sensitive —
-- it will be locked down to city host / event team via RLS in a later migration.
create table if not exists public.rider_profiles (
  id          uuid primary key references public.profiles(id) on delete cascade,
  bike_make   text,
  bike_model  text,
  blood_group text,
  instagram   text,
  photo_url   text,
  level       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── emergency_contacts (THIRD-PARTY PII — DPDP-restricted) ───────────────────
create table if not exists public.emergency_contacts (
  id                      uuid primary key default gen_random_uuid(),
  rider_id                uuid not null references public.profiles(id) on delete cascade,
  name                    text not null,
  relation                text,
  phone                   text not null,
  rider_confirmed_consent boolean not null default false,   -- rider affirms they informed the contact
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index if not exists emergency_contacts_rider_id_idx on public.emergency_contacts(rider_id);

-- ── global roles ────────────────────────────────────────────────────────────
create table if not exists public.app_roles (
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       public.app_role not null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- ── clubs ───────────────────────────────────────────────────────────────────
create table if not exists public.clubs (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  year_formed int,
  logo_url    text,
  banner_url  text,
  city_id     uuid references public.cities(id) on delete set null,
  status      public.club_status not null default 'pending',   -- super admin approves
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists clubs_city_id_idx on public.clubs(city_id);
create index if not exists clubs_status_idx on public.clubs(status);

-- ── club_members ────────────────────────────────────────────────────────────
create table if not exists public.club_members (
  id         uuid primary key default gen_random_uuid(),
  club_id    uuid not null references public.clubs(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  role       public.club_member_role not null default 'member',
  status     public.membership_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists club_members_club_id_idx on public.club_members(club_id);
-- One club at a time (spec §5): only one active membership per user; 'left' rows kept for history.
create unique index if not exists club_members_one_active_per_user
  on public.club_members(user_id) where status in ('invited','pending','approved');

-- ── club_invitations (email-keyed link, spec §5) ────────────────────────────
create table if not exists public.club_invitations (
  id         uuid primary key default gen_random_uuid(),
  club_id    uuid not null references public.clubs(id) on delete cascade,
  email      citext not null,
  invited_by uuid references public.profiles(id) on delete set null,
  status     public.membership_status not null default 'invited',
  token      uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);
create index if not exists club_invitations_club_id_idx on public.club_invitations(club_id);
create index if not exists club_invitations_email_idx on public.club_invitations(email);

-- ── city_hosts ──────────────────────────────────────────────────────────────
create table if not exists public.city_hosts (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  city_id    uuid not null references public.cities(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, city_id)
);

-- ── updated_at triggers ─────────────────────────────────────────────────────
create trigger states_set_updated_at             before update on public.states             for each row execute function public.set_updated_at();
create trigger cities_set_updated_at              before update on public.cities             for each row execute function public.set_updated_at();
create trigger profiles_set_updated_at            before update on public.profiles           for each row execute function public.set_updated_at();
create trigger rider_profiles_set_updated_at      before update on public.rider_profiles     for each row execute function public.set_updated_at();
create trigger emergency_contacts_set_updated_at  before update on public.emergency_contacts for each row execute function public.set_updated_at();
create trigger clubs_set_updated_at               before update on public.clubs              for each row execute function public.set_updated_at();
create trigger club_members_set_updated_at        before update on public.club_members       for each row execute function public.set_updated_at();

-- ── auto-create a profile row when an auth user signs up ─────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, first_name, second_name, email, phone)
  values (new.id,
          new.raw_user_meta_data->>'first_name',
          new.raw_user_meta_data->>'second_name',
          new.email,
          new.phone)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- ── Row Level Security: enabled everywhere, policies added in a later migration.
alter table public.states             enable row level security;
alter table public.cities             enable row level security;
alter table public.profiles           enable row level security;
alter table public.rider_profiles     enable row level security;
alter table public.emergency_contacts enable row level security;
alter table public.app_roles          enable row level security;
alter table public.clubs              enable row level security;
alter table public.club_members       enable row level security;
alter table public.club_invitations   enable row level security;
alter table public.city_hosts         enable row level security;
