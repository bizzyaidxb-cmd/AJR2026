-- AJR — 0007 seed: launch states + cities (mirrors the homepage ride map).
-- Ride dates left null (set per state later); hosts/targets assigned via admin.
-- Idempotent: safe to re-run.

insert into public.states (name) values
  ('Kerala'),('Maharashtra'),('Delhi NCR'),('Punjab'),('Rajasthan'),
  ('Telangana'),('Karnataka'),('West Bengal'),('Gujarat'),
  ('Uttar Pradesh'),('Assam')
on conflict (name) do nothing;

insert into public.cities (state_id, name, tier, lat, lng)
select s.id, v.name, v.tier, v.lat, v.lng
from (values
  ('Kochi',      'Kerala',        2, 9.9312,  76.2673),
  ('Palakkad',   'Kerala',        2, 10.7867, 76.6548),
  ('Thrissur',   'Kerala',        2, 10.5276, 76.2144),
  ('Mumbai',     'Maharashtra',   1, 19.0760, 72.8777),
  ('Pune',       'Maharashtra',   1, 18.5204, 73.8567),
  ('Delhi NCR',  'Delhi NCR',     1, 28.6139, 77.2090),
  ('Chandigarh', 'Punjab',        2, 30.7333, 76.7794),
  ('Jaipur',     'Rajasthan',     1, 26.9124, 75.7873),
  ('Hyderabad',  'Telangana',     1, 17.3850, 78.4867),
  ('Bengaluru',  'Karnataka',     1, 12.9716, 77.5946),
  ('Kolkata',    'West Bengal',   1, 22.5726, 88.3639),
  ('Ahmedabad',  'Gujarat',       1, 23.0225, 72.5714),
  ('Lucknow',    'Uttar Pradesh', 2, 26.8467, 80.9462),
  ('Guwahati',   'Assam',         2, 26.1445, 91.7362)
) as v(name, state, tier, lat, lng)
join public.states s on s.name = v.state
on conflict (state_id, name) do nothing;
