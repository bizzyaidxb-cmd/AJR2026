-- AJR — 0003 donations: donors, donations (Razorpay lifecycle), webhook idempotency,
-- and edition-keyed leaderboard totals maintained incrementally by triggers.
-- Model A: all funds settle to AJR ("Amar Jawan Ride Events"), disbursed to NGOs
-- off-platform. AJR absorbs the gateway fee (fee/tax still tracked for reconciliation).

do $$ begin
  create type public.donation_status as enum
    ('created','authorized','captured','failed','refunded','partially_refunded');
exception when duplicate_object then null; end $$;

-- ── donors (normalised so repeat donors link across donations) ───────────────
create table if not exists public.donors (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      citext not null unique,     -- upsert key for repeat donors
  phone      text,
  pan        text,                        -- nullable; stored for future 80G via partner NGO
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── donations ───────────────────────────────────────────────────────────────
-- Attribution dims are all nullable: a donation may target a rider, a club, a city,
-- and/or a ride edition (or be a plain donation). is_anonymous controls PUBLIC display
-- only — donor PII is always retained internally for receipts/compliance.
create table if not exists public.donations (
  id                  uuid primary key default gen_random_uuid(),
  donor_id            uuid references public.donors(id) on delete set null,
  rider_id            uuid references public.profiles(id) on delete set null,
  club_id             uuid references public.clubs(id) on delete set null,
  city_id             uuid references public.cities(id) on delete set null,
  ride_edition_id     uuid references public.ride_editions(id) on delete set null,
  is_anonymous        boolean not null default false,
  amount_paise        bigint not null check (amount_paise > 0),
  currency            text not null default 'INR',
  status              public.donation_status not null default 'created',
  method              text,                         -- upi / card / netbanking / wallet
  fee_paise           bigint,                       -- Razorpay fee (AJR absorbs)
  tax_paise           bigint,                       -- GST on the fee
  razorpay_order_id   text unique,
  razorpay_payment_id text,
  razorpay_signature  text,                         -- audit only
  settlement_id       text,                         -- populated at settlement (T+2)
  notes               jsonb not null default '{}'::jsonb,
  captured_at         timestamptz,
  refunded_at         timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists donations_donor_idx     on public.donations(donor_id);
create index if not exists donations_rider_idx      on public.donations(rider_id);
create index if not exists donations_club_idx       on public.donations(club_id);
create index if not exists donations_city_idx       on public.donations(city_id);
create index if not exists donations_edition_idx    on public.donations(ride_edition_id);
create index if not exists donations_status_idx     on public.donations(status);
create index if not exists donations_payment_id_idx on public.donations(razorpay_payment_id);

-- ── webhook_events (Razorpay is at-least-once; dedupe on event id) ───────────
create table if not exists public.webhook_events (
  event_id     text primary key,          -- X-Razorpay-Event-Id
  event_type   text,
  payload      jsonb,
  processed_at timestamptz not null default now()
);

-- ── leaderboard totals (edition-keyed; incrementally maintained) ─────────────
create table if not exists public.rider_totals (
  rider_id        uuid not null references public.profiles(id) on delete cascade,
  ride_edition_id uuid not null references public.ride_editions(id) on delete cascade,
  total_paise     bigint not null default 0,
  donation_count  int    not null default 0,
  primary key (rider_id, ride_edition_id)
);
create index if not exists rider_totals_edition_idx on public.rider_totals(ride_edition_id);

create table if not exists public.club_totals (
  club_id         uuid not null references public.clubs(id) on delete cascade,
  ride_edition_id uuid not null references public.ride_editions(id) on delete cascade,
  total_paise     bigint not null default 0,
  donation_count  int    not null default 0,
  primary key (club_id, ride_edition_id)
);
create index if not exists club_totals_edition_idx on public.club_totals(ride_edition_id);

create table if not exists public.city_totals (
  city_id         uuid not null references public.cities(id) on delete cascade,
  ride_edition_id uuid not null references public.ride_editions(id) on delete cascade,
  total_paise     bigint not null default 0,
  donation_count  int    not null default 0,
  primary key (city_id, ride_edition_id)
);
create index if not exists city_totals_edition_idx on public.city_totals(ride_edition_id);

-- ── incremental maintenance ─────────────────────────────────────────────────
-- Applies a signed delta (amount + count) to whichever dims are present. Only
-- edition-keyed rows are maintained; a donation with no ride_edition_id is still
-- recorded in `donations` but does not appear on edition leaderboards.
create or replace function public.adjust_leaderboard(
  p_rider uuid, p_club uuid, p_city uuid, p_edition uuid, p_amount bigint, p_count int
) returns void language plpgsql as $$
begin
  if p_edition is null then return; end if;

  if p_rider is not null then
    insert into public.rider_totals(rider_id, ride_edition_id, total_paise, donation_count)
    values (p_rider, p_edition, p_amount, p_count)
    on conflict (rider_id, ride_edition_id) do update
      set total_paise    = public.rider_totals.total_paise + excluded.total_paise,
          donation_count = public.rider_totals.donation_count + excluded.donation_count;
  end if;

  if p_club is not null then
    insert into public.club_totals(club_id, ride_edition_id, total_paise, donation_count)
    values (p_club, p_edition, p_amount, p_count)
    on conflict (club_id, ride_edition_id) do update
      set total_paise    = public.club_totals.total_paise + excluded.total_paise,
          donation_count = public.club_totals.donation_count + excluded.donation_count;
  end if;

  if p_city is not null then
    insert into public.city_totals(city_id, ride_edition_id, total_paise, donation_count)
    values (p_city, p_edition, p_amount, p_count)
    on conflict (city_id, ride_edition_id) do update
      set total_paise    = public.city_totals.total_paise + excluded.total_paise,
          donation_count = public.city_totals.donation_count + excluded.donation_count;
  end if;
end $$;

-- Only 'captured' donations count. Any transition into/out of captured (incl. amount
-- or attribution changes, refunds, deletes) is handled as remove-old-then-add-new.
create or replace function public.donations_leaderboard_trg()
returns trigger language plpgsql as $$
declare
  old_counted boolean := (tg_op in ('UPDATE','DELETE')) and old.status = 'captured';
  new_counted boolean := (tg_op in ('INSERT','UPDATE')) and new.status = 'captured';
begin
  if old_counted then
    perform public.adjust_leaderboard(old.rider_id, old.club_id, old.city_id, old.ride_edition_id, -old.amount_paise, -1);
  end if;
  if new_counted then
    perform public.adjust_leaderboard(new.rider_id, new.club_id, new.city_id, new.ride_edition_id, new.amount_paise, 1);
  end if;
  return null;
end $$;

create trigger donations_leaderboard
  after insert or update or delete on public.donations
  for each row execute function public.donations_leaderboard_trg();

create trigger donations_set_updated_at before update on public.donations for each row execute function public.set_updated_at();
create trigger donors_set_updated_at    before update on public.donors    for each row execute function public.set_updated_at();

-- ── RLS: enabled, policies added in a later migration ───────────────────────
alter table public.donors         enable row level security;
alter table public.donations      enable row level security;
alter table public.webhook_events enable row level security;
alter table public.rider_totals   enable row level security;
alter table public.club_totals    enable row level security;
alter table public.city_totals    enable row level security;
