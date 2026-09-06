-- AJR — 0004 ops: host applications, orientation, per-ride event team,
-- on-site notifications + multi-channel send log, and DPDP consent log.

do $$ begin create type public.host_application_status as enum ('pending','approved','rejected'); exception when duplicate_object then null; end $$;
do $$ begin create type public.notification_channel   as enum ('whatsapp','sms','email','onsite'); exception when duplicate_object then null; end $$;
do $$ begin create type public.notification_status    as enum ('queued','sent','delivered','failed'); exception when duplicate_object then null; end $$;
do $$ begin create type public.consent_action        as enum ('granted','withdrawn'); exception when duplicate_object then null; end $$;

-- ── host_applications (spec §9: become a ride host → super-admin approval) ────
create table if not exists public.host_applications (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  city_id      uuid references public.cities(id) on delete set null,   -- chosen city (may already have a host)
  address      text,
  pincode      text,
  state_name   text,
  answers      jsonb not null default '{}'::jsonb,     -- q1–q10 long-form
  status       public.host_application_status not null default 'pending',
  reviewed_by  uuid references public.profiles(id) on delete set null,
  reviewed_at  timestamptz,
  calendly_url text,                                    -- sent on approval
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists host_applications_user_idx   on public.host_applications(user_id);
create index if not exists host_applications_city_idx   on public.host_applications(city_id);
create index if not exists host_applications_status_idx on public.host_applications(status);

-- ── orientation_progress (spec §9.5: video modules → quiz, fail loops back) ──
create table if not exists public.orientation_progress (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  application_id uuid references public.host_applications(id) on delete set null,
  videos_watched jsonb not null default '[]'::jsonb,    -- [{video_id, watched_at}]
  quiz_attempts  int not null default 0,
  passed         boolean not null default false,
  completed_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (user_id)
);

-- ── ride_event_team (spec §2/§9.6: host adds ride-day helpers per edition) ───
create table if not exists public.ride_event_team (
  ride_edition_id uuid not null references public.ride_editions(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  added_by        uuid references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now(),
  primary key (ride_edition_id, user_id)
);
create index if not exists ride_event_team_user_idx on public.ride_event_team(user_id);

-- ── notifications (on-site feed, spec §10) ──────────────────────────────────
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  type       text,
  title      text,
  body       text,
  url        text,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx   on public.notifications(user_id);
create index if not exists notifications_unread_idx on public.notifications(user_id) where read_at is null;

-- ── notification_log (multi-channel send audit; n8n writes status back) ──────
create table if not exists public.notification_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references public.profiles(id) on delete set null,   -- nullable: donor may not be a user
  channel      public.notification_channel not null,
  event_type   text,
  provider     text,                                   -- msg91 / aisensy / resend ...
  status       public.notification_status not null default 'queued',
  provider_ref text,
  error        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists notification_log_user_idx   on public.notification_log(user_id);
create index if not exists notification_log_status_idx on public.notification_log(status);

-- ── consent_log (DPDP: append-only record of consent grants/withdrawals) ────
create table if not exists public.consent_log (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  notice_version text not null,
  purposes       text[] not null default '{}',
  action         public.consent_action not null default 'granted',
  created_at     timestamptz not null default now()
);
create index if not exists consent_log_user_idx on public.consent_log(user_id);

-- ── updated_at triggers ─────────────────────────────────────────────────────
create trigger host_applications_set_updated_at   before update on public.host_applications   for each row execute function public.set_updated_at();
create trigger orientation_progress_set_updated_at before update on public.orientation_progress for each row execute function public.set_updated_at();
create trigger notification_log_set_updated_at     before update on public.notification_log     for each row execute function public.set_updated_at();

-- ── RLS: enabled, policies added in a later migration ───────────────────────
alter table public.host_applications    enable row level security;
alter table public.orientation_progress enable row level security;
alter table public.ride_event_team      enable row level security;
alter table public.notifications        enable row level security;
alter table public.notification_log     enable row level security;
alter table public.consent_log          enable row level security;
