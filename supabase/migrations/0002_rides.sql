-- AJR — 0002 rides: ride editions (per-city ride instances) + registrations
-- A "ride edition" is one city's ride on its date. It is the unit the leaderboard
-- edition filter (spec §7) and donation attribution hang off. Ride dates come from
-- the state (spec §1) but are copied onto the edition for per-instance flexibility.

do $$ begin create type public.ride_state as enum ('draft','live','started','ended'); exception when duplicate_object then null; end $$;
do $$ begin create type public.registration_status as enum ('registered','cancelled','checked_in'); exception when duplicate_object then null; end $$;

-- ── ride_editions ───────────────────────────────────────────────────────────
create table if not exists public.ride_editions (
  id           uuid primary key default gen_random_uuid(),
  city_id      uuid not null references public.cities(id) on delete cascade,
  title        text,                                   -- e.g. "Amar Jawan Ride — Kochi 2027"
  season       text,                                   -- grouping label, e.g. "2027" (leaderboard "all rides")
  ride_date    date,
  venue_name   text,
  start_point  text,
  start_lat    double precision,
  start_lng    double precision,
  route_url    text,                                   -- link to route map / GPX
  schedule     jsonb not null default '[]'::jsonb,     -- [{label, time}] assembly → flag-off → tribute → end
  capacity     int,
  status       public.ride_state not null default 'draft',
  started_at   timestamptz,
  ended_at     timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists ride_editions_city_id_idx on public.ride_editions(city_id);
create index if not exists ride_editions_status_idx  on public.ride_editions(status);
create index if not exists ride_editions_season_idx  on public.ride_editions(season);

-- ── ride_registrations ──────────────────────────────────────────────────────
-- A rider joining a city's ride. Drives capacity / "Almost full / Full" and ride-day check-in.
create table if not exists public.ride_registrations (
  id              uuid primary key default gen_random_uuid(),
  ride_edition_id uuid not null references public.ride_editions(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  status          public.registration_status not null default 'registered',
  has_pillion     boolean not null default false,      -- one pillion allowed (safety page)
  checked_in_at   timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (ride_edition_id, user_id)                    -- one registration per rider per edition
);
create index if not exists ride_registrations_edition_idx on public.ride_registrations(ride_edition_id);
create index if not exists ride_registrations_user_idx    on public.ride_registrations(user_id);

-- ── updated_at triggers ─────────────────────────────────────────────────────
create trigger ride_editions_set_updated_at      before update on public.ride_editions      for each row execute function public.set_updated_at();
create trigger ride_registrations_set_updated_at before update on public.ride_registrations for each row execute function public.set_updated_at();

-- ── RLS: enabled, policies added in a later migration ───────────────────────
alter table public.ride_editions      enable row level security;
alter table public.ride_registrations enable row level security;
