-- AJR — 0005 RLS: helper functions, policies, public views.
-- Model: helper functions (no JWT hook) for role checks; public reads via anon +
-- curated views; sensitive reads + privileged writes via server/service-role.

-- ── schema tweak: move blood_group into its own restricted table ─────────────
create table if not exists public.rider_medical (
  rider_id    uuid primary key references public.profiles(id) on delete cascade,
  blood_group text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.rider_profiles drop column if exists blood_group;
alter table public.rider_medical enable row level security;
create trigger rider_medical_set_updated_at before update on public.rider_medical for each row execute function public.set_updated_at();

-- ── make the leaderboard maintainer bulletproof under RLS ───────────────────
alter function public.adjust_leaderboard(uuid, uuid, uuid, uuid, bigint, int) security definer set search_path = '';

-- ── helper functions (SECURITY DEFINER STABLE; bypass RLS, avoid recursion) ─
create or replace function public.is_super_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.app_roles where user_id = (select auth.uid()) and role = 'super_admin');
$$;

create or replace function public.is_event_team() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.app_roles where user_id = (select auth.uid()) and role in ('event_team','super_admin'));
$$;

create or replace function public.is_city_host(p_city uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.city_hosts where user_id = (select auth.uid()) and city_id = p_city);
$$;

create or replace function public.is_club_admin(p_club uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.club_members
    where user_id = (select auth.uid()) and club_id = p_club and role = 'admin' and status = 'approved');
$$;

create or replace function public.is_club_member(p_club uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.club_members
    where user_id = (select auth.uid()) and club_id = p_club and status = 'approved');
$$;

create or replace function public.can_access_rider(p_rider uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) = p_rider
      or public.is_event_team()
      or exists (
        select 1 from public.profiles pr
        join public.city_hosts ch on ch.city_id = pr.city_id
        where pr.id = p_rider and ch.user_id = (select auth.uid())
      );
$$;

create or replace function public.hosts_edition(p_edition uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select public.is_super_admin()
      or exists (select 1 from public.ride_event_team t
                 where t.ride_edition_id = p_edition and t.user_id = (select auth.uid()))
      or exists (select 1 from public.ride_editions re
                 join public.city_hosts ch on ch.city_id = re.city_id
                 where re.id = p_edition and ch.user_id = (select auth.uid()));
$$;

-- ══ POLICIES ════════════════════════════════════════════════════════════════

-- states ---------------------------------------------------------------------
create policy states_read      on public.states for select to anon, authenticated using (true);
create policy states_admin_ins on public.states for insert to authenticated with check (public.is_super_admin());
create policy states_admin_upd on public.states for update to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
create policy states_admin_del on public.states for delete to authenticated using (public.is_super_admin());

-- cities ---------------------------------------------------------------------
create policy cities_read      on public.cities for select to anon, authenticated using (true);
create policy cities_admin_ins on public.cities for insert to authenticated with check (public.is_super_admin());
create policy cities_write     on public.cities for update to authenticated using (public.is_super_admin() or public.is_city_host(id)) with check (public.is_super_admin() or public.is_city_host(id));
create policy cities_admin_del on public.cities for delete to authenticated using (public.is_super_admin());

-- ride_editions --------------------------------------------------------------
create policy rides_read on public.ride_editions for select to anon, authenticated using (true);
create policy rides_ins  on public.ride_editions for insert to authenticated with check (public.is_super_admin() or public.is_city_host(city_id));
create policy rides_upd  on public.ride_editions for update to authenticated using (public.hosts_edition(id)) with check (public.hosts_edition(id));
create policy rides_del  on public.ride_editions for delete to authenticated using (public.is_super_admin() or public.is_city_host(city_id));

-- leaderboard totals (public aggregates; writes via trigger only) ------------
create policy rider_totals_read on public.rider_totals for select to anon, authenticated using (true);
create policy club_totals_read  on public.club_totals  for select to anon, authenticated using (true);
create policy city_totals_read  on public.city_totals  for select to anon, authenticated using (true);

-- profiles -------------------------------------------------------------------
create policy profiles_read on public.profiles for select to authenticated using (public.can_access_rider(id));
create policy profiles_ins  on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_upd  on public.profiles for update to authenticated using ((select auth.uid()) = id or public.is_super_admin()) with check ((select auth.uid()) = id or public.is_super_admin());

-- rider_profiles -------------------------------------------------------------
create policy rider_profiles_read on public.rider_profiles for select to authenticated using (public.can_access_rider(id));
create policy rider_profiles_ins  on public.rider_profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy rider_profiles_upd  on public.rider_profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- rider_medical (blood group — locked to rider + city host + event team) -----
create policy rider_medical_read on public.rider_medical for select to authenticated using (public.can_access_rider(rider_id));
create policy rider_medical_ins  on public.rider_medical for insert to authenticated with check ((select auth.uid()) = rider_id);
create policy rider_medical_upd  on public.rider_medical for update to authenticated using ((select auth.uid()) = rider_id) with check ((select auth.uid()) = rider_id);

-- emergency_contacts (third-party PII) ---------------------------------------
create policy ec_read on public.emergency_contacts for select to authenticated using (public.can_access_rider(rider_id));
create policy ec_ins  on public.emergency_contacts for insert to authenticated with check ((select auth.uid()) = rider_id);
create policy ec_upd  on public.emergency_contacts for update to authenticated using ((select auth.uid()) = rider_id) with check ((select auth.uid()) = rider_id);
create policy ec_del  on public.emergency_contacts for delete to authenticated using ((select auth.uid()) = rider_id);

-- ride_registrations ---------------------------------------------------------
create policy reg_read on public.ride_registrations for select to authenticated using ((select auth.uid()) = user_id or public.hosts_edition(ride_edition_id));
create policy reg_ins  on public.ride_registrations for insert to authenticated with check ((select auth.uid()) = user_id);
create policy reg_upd  on public.ride_registrations for update to authenticated using ((select auth.uid()) = user_id or public.hosts_edition(ride_edition_id)) with check ((select auth.uid()) = user_id or public.hosts_edition(ride_edition_id));
create policy reg_del  on public.ride_registrations for delete to authenticated using ((select auth.uid()) = user_id or public.is_super_admin());

-- orientation_progress -------------------------------------------------------
create policy orient_read on public.orientation_progress for select to authenticated using ((select auth.uid()) = user_id or public.is_super_admin());
create policy orient_ins  on public.orientation_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy orient_upd  on public.orientation_progress for update to authenticated using ((select auth.uid()) = user_id or public.is_super_admin()) with check ((select auth.uid()) = user_id or public.is_super_admin());

-- notifications --------------------------------------------------------------
create policy notif_read on public.notifications for select to authenticated using ((select auth.uid()) = user_id);
create policy notif_upd  on public.notifications for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- consent_log (append-only) --------------------------------------------------
create policy consent_read on public.consent_log for select to authenticated using ((select auth.uid()) = user_id or public.is_super_admin());
create policy consent_ins  on public.consent_log for insert to authenticated with check ((select auth.uid()) = user_id);

-- clubs ----------------------------------------------------------------------
create policy clubs_read on public.clubs for select to anon, authenticated
  using (status = 'approved' or public.is_club_member(id) or public.is_club_admin(id) or public.is_super_admin());
create policy clubs_ins  on public.clubs for insert to authenticated
  with check ((select auth.uid()) = created_by and status = 'pending');
create policy clubs_upd  on public.clubs for update to authenticated
  using (public.is_club_admin(id) or public.is_super_admin())
  with check (public.is_club_admin(id) or public.is_super_admin());
create policy clubs_del  on public.clubs for delete to authenticated using (public.is_super_admin());

-- prevent non-super-admins (incl. club admins) from changing club status;
-- server/service-role approvals are allowed.
create or replace function public.clubs_guard_status() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.status is distinct from old.status
     and not public.is_super_admin()
     and coalesce((select auth.role()), '') <> 'service_role' then
    raise exception 'Only a super admin can change club status';
  end if;
  return new;
end $$;
create trigger clubs_guard_status before update on public.clubs for each row execute function public.clubs_guard_status();

-- club_members ---------------------------------------------------------------
create policy cm_read on public.club_members for select to authenticated
  using ((select auth.uid()) = user_id or public.is_club_admin(club_id) or public.is_super_admin());
create policy cm_join on public.club_members for insert to authenticated
  with check ((select auth.uid()) = user_id and status = 'pending' and role = 'member');
create policy cm_admin_manage on public.club_members for update to authenticated
  using (public.is_club_admin(club_id) or public.is_super_admin())
  with check (public.is_club_admin(club_id) or public.is_super_admin());
create policy cm_self_leave on public.club_members for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id and status = 'left');
create policy cm_del on public.club_members for delete to authenticated
  using (public.is_club_admin(club_id) or public.is_super_admin());

-- club_invitations -----------------------------------------------------------
create policy ci_read  on public.club_invitations for select to authenticated using (public.is_club_admin(club_id) or public.is_super_admin());
create policy ci_write on public.club_invitations for all    to authenticated using (public.is_club_admin(club_id) or public.is_super_admin()) with check (public.is_club_admin(club_id) or public.is_super_admin());

-- city_hosts / app_roles (super-admin managed) -------------------------------
create policy ch_read on public.city_hosts for select to authenticated using ((select auth.uid()) = user_id or public.is_super_admin());
create policy ch_write on public.city_hosts for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
create policy ar_read on public.app_roles for select to authenticated using ((select auth.uid()) = user_id or public.is_super_admin());
create policy ar_write on public.app_roles for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- ride_event_team ------------------------------------------------------------
create policy ret_read  on public.ride_event_team for select to authenticated using ((select auth.uid()) = user_id or public.hosts_edition(ride_edition_id));
create policy ret_write on public.ride_event_team for all to authenticated using (public.hosts_edition(ride_edition_id)) with check (public.hosts_edition(ride_edition_id));

-- host_applications ----------------------------------------------------------
create policy ha_read on public.host_applications for select to authenticated using ((select auth.uid()) = user_id or public.is_super_admin());
create policy ha_ins  on public.host_applications for insert to authenticated with check ((select auth.uid()) = user_id);
create policy ha_upd  on public.host_applications for update to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- donors / donations / logs (finance staff read; writes service-role only) ---
create policy donors_admin_read     on public.donors         for select to authenticated using (public.is_event_team());
create policy donations_admin_read  on public.donations      for select to authenticated using (public.is_event_team());
create policy notiflog_admin_read   on public.notification_log for select to authenticated using (public.is_event_team());
-- webhook_events: no policies → service-role only.

-- ══ PUBLIC VIEWS (curated columns; run as owner to expose safe data) ═════════
create or replace view public.public_riders with (security_invoker = off) as
  select p.id as rider_id,
         nullif(trim(coalesce(p.first_name,'') || ' ' || coalesce(p.second_name,'')), '') as display_name,
         p.city_id, rp.level, rp.instagram, rp.photo_url
  from public.profiles p
  left join public.rider_profiles rp on rp.id = p.id;

create or replace view public.public_clubs with (security_invoker = off) as
  select c.id, c.name, c.logo_url, c.banner_url, c.city_id, c.year_formed
  from public.clubs c where c.status = 'approved';

create or replace view public.public_donations with (security_invoker = off) as
  select d.id, d.rider_id, d.club_id, d.city_id, d.ride_edition_id, d.amount_paise, d.created_at,
         case when d.is_anonymous then 'Anonymous' else dn.name end as display_name
  from public.donations d
  left join public.donors dn on dn.id = d.donor_id
  where d.status = 'captured';

grant select on public.public_riders, public.public_clubs, public.public_donations to anon, authenticated;
