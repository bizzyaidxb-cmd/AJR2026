-- AJR — 0006 harden: lock down trigger/maintenance functions and pin search_path.
-- Trigger & maintenance functions must NOT be callable via PostgREST RPC by anon/
-- authenticated (esp. adjust_leaderboard, which would let anyone alter totals).
-- Triggers still invoke them fine after the grant is revoked.

revoke all on function public.adjust_leaderboard(uuid, uuid, uuid, uuid, bigint, int) from public, anon, authenticated;
revoke all on function public.donations_leaderboard_trg()                            from public, anon, authenticated;
revoke all on function public.set_updated_at()                                       from public, anon, authenticated;
revoke all on function public.clubs_guard_status()                                   from public, anon, authenticated;
revoke all on function public.handle_new_user()                                      from public, anon, authenticated;

-- pin search_path on the two functions the linter flagged
alter function public.set_updated_at()            set search_path = '';
alter function public.donations_leaderboard_trg() set search_path = '';
