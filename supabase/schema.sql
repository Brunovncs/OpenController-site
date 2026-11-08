-- OpenController site: anonymous analytics and the /admin login.
-- Run in the Supabase SQL editor (project opencontroller-site). Safe to run again.
-- Only the server's secret key (service_role) can read or write any of this: RLS is on with no
-- policies, and anon/authenticated have no grants.
--
-- Privacy: no IP, no cookie id, no full URL of the referrer is stored. `visitor` is a hash of
-- (a salt for the day, IP, user agent) computed on the server; the salt is deleted the next day,
-- so a hash can't be linked across days or back to anyone.

create table if not exists public.events (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  visitor text not null,
  type text not null,          -- view, leave, click, search, test, funnel, app_report
  name text,
  label text,
  path text,
  lang text,
  source text,                 -- google, chatgpt, reddit, direct...
  ref_host text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  country text,
  device text,
  os text,
  browser text,
  value double precision,
  props jsonb
);
create index if not exists events_at on public.events (at);
create index if not exists events_type_at on public.events (type, at);
create index if not exists events_visitor_at on public.events (visitor, at);

create table if not exists public.salts (
  day date primary key,
  salt text not null
);

-- Search engines and AI assistants reading the pages, from proxy.ts.
create table if not exists public.bot_hits (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  bot text not null,
  path text not null
);
create index if not exists bot_hits_at on public.bot_hits (at);

create table if not exists public.admin_credentials (
  id text primary key,
  public_key text not null,
  counter bigint not null default 0,
  transports text[] not null default '{}',
  name text,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

create table if not exists public.admin_sessions (
  token_hash text primary key,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_challenges (
  id text primary key,
  challenge text not null,
  kind text not null,
  expires_at timestamptz not null
);

create table if not exists public.admin_attempts (
  id bigint generated always as identity primary key,
  key text not null,
  at timestamptz not null default now()
);
create index if not exists admin_attempts_key_at on public.admin_attempts (key, at);

alter table public.events enable row level security;
alter table public.salts enable row level security;
alter table public.bot_hits enable row level security;
alter table public.admin_credentials enable row level security;
alter table public.admin_sessions enable row level security;
alter table public.admin_challenges enable row level security;
alter table public.admin_attempts enable row level security;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
grant select, insert, update, delete on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;

-- Today's salt, made on the first event of the day. Making it also clears yesterday's salt and
-- whatever is past its keep date.
create or replace function public.day_salt() returns text
language plpgsql security invoker set search_path = public, extensions as $$
declare s text;
begin
  select salt into s from salts where day = current_date;
  if s is not null then return s; end if;
  insert into salts (day, salt) values (current_date, encode(gen_random_bytes(32), 'hex')) on conflict (day) do nothing;
  delete from salts where day < current_date;
  delete from events where at < now() - interval '400 days';
  delete from bot_hits where at < now() - interval '400 days';
  delete from admin_sessions where expires_at < now();
  delete from admin_challenges where expires_at < now();
  delete from admin_attempts where at < now() - interval '1 day';
  select salt into s from salts where day = current_date;
  return s;
end $$;

-- Everything the dashboard shows for a period, in one call. `visitor` changes every day, so
-- visitors over several days are the sum of each day's.
create or replace function public.admin_stats(p_from timestamptz, p_to timestamptz, p_tz text default 'America/Sao_Paulo')
returns jsonb language sql stable security invoker set search_path = public as $$
with e as (select * from events where at >= p_from and at < p_to),
v as (select * from e where type = 'view'),
entries as (
  select distinct on (visitor) visitor, source, ref_host, utm_source, utm_medium, utm_campaign, path, country, device, os, browser, lang
  from v order by visitor, at
),
dl as (select distinct visitor from e where type = 'click' and name = 'download'),
tst as (select distinct visitor from e where type = 'test'),
leaving as (
  select path, avg(value) as secs, avg((props->>'scroll')::numeric) as scroll
  from e where type = 'leave' group by path
),
-- Up to 8 days the timeline is hourly, beyond that daily; empty buckets stay in as zeros.
unit as (select case when p_to - p_from <= interval '8 days' then 'hour' else 'day' end as u),
buckets as (
  select g as b from unit, generate_series(date_trunc(unit.u, p_from at time zone p_tz), date_trunc(unit.u, p_to at time zone p_tz), ('1 ' || unit.u)::interval) g
),
tl as (
  select date_trunc(unit.u, at at time zone p_tz) as b,
    count(distinct visitor) filter (where type = 'view') as visitors,
    count(*) filter (where type = 'view') as views,
    count(*) filter (where type = 'click' and name = 'download') as downloads
  from e, unit group by 1
)
select jsonb_build_object(
  'totals', (select jsonb_build_object(
      'visitors', count(distinct visitor) filter (where type = 'view'),
      'views', count(*) filter (where type = 'view'),
      'downloads', count(*) filter (where type = 'click' and name = 'download'),
      'downloaders', count(distinct visitor) filter (where type = 'click' and name = 'download'),
      'testers', count(distinct visitor) filter (where type = 'test'),
      'searches', count(*) filter (where type = 'search'),
      'appReports', count(*) filter (where type = 'app_report')
    ) from e),
  'daily', (select coalesce(jsonb_agg(d order by d.day), '[]'::jsonb) from (
      select (at at time zone p_tz)::date as day,
        count(distinct visitor) filter (where type = 'view') as visitors,
        count(*) filter (where type = 'view') as views,
        count(*) filter (where type = 'click' and name = 'download') as downloads
      from e group by 1) d),
  'unit', (select u from unit),
  'timeline', (select coalesce(jsonb_agg(jsonb_build_object(
        't', to_char(bk.b, 'YYYY-MM-DD"T"HH24:MI'),
        'visitors', coalesce(tl.visitors, 0), 'views', coalesce(tl.views, 0), 'downloads', coalesce(tl.downloads, 0)
      ) order by bk.b), '[]'::jsonb)
      from buckets bk left join tl on tl.b = bk.b),
  'hours', (select jsonb_agg(jsonb_build_object('h', h, 'visitors', coalesce(x.visitors, 0), 'views', coalesce(x.views, 0)) order by h)
      from generate_series(0, 23) h left join (
        select extract(hour from at at time zone p_tz)::int as h, count(distinct visitor) as visitors, count(*) as views
        from v group by 1) x using (h)),
  'recent', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select to_char(at at time zone p_tz, 'YYYY-MM-DD"T"HH24:MI') as at, path, coalesce(source, 'direct') as source,
        ref_host, utm_campaign as campaign, country, device
      from v order by v.at desc limit 60) s),
  'sources', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select coalesce(en.source, 'direct') as source, count(*) as visitors,
        count(dl.visitor) as downloaders, count(tst.visitor) as testers
      from entries en left join dl using (visitor) left join tst using (visitor)
      group by 1 order by 2 desc limit 40) s),
  'referrers', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select en.ref_host as host, count(*) as visitors, count(dl.visitor) as downloaders
      from entries en left join dl using (visitor)
      where en.ref_host is not null group by 1 order by 2 desc limit 40) s),
  'campaigns', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select en.utm_source as source, en.utm_medium as medium, en.utm_campaign as campaign,
        count(*) as visitors, count(dl.visitor) as downloaders
      from entries en left join dl using (visitor)
      where en.utm_source is not null group by 1, 2, 3 order by 4 desc limit 40) s),
  'landing', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select en.path, count(*) as visitors, count(dl.visitor) as downloaders
      from entries en left join dl using (visitor) group by 1 order by 2 desc limit 30) s),
  'pages', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select v.path, count(*) as views, count(distinct v.visitor) as visitors,
        round(max(l.secs)::numeric, 0) as secs, round(max(l.scroll)::numeric, 0) as scroll
      from v left join leaving l using (path) group by 1 order by 2 desc limit 60) s),
  'clicks', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select name, label, count(*) as n, count(distinct visitor) as visitors
      from e where type = 'click' group by 1, 2 order by 3 desc limit 80) s),
  'searches', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select name, lower(label) as query, count(*) as n, count(*) filter (where value = 0) as empty
      from e where type = 'search' group by 1, 2 order by 3 desc limit 80) s),
  'tests', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select name, label, count(distinct visitor) as visitors
      from e where type = 'test' group by 1, 2 order by 3 desc limit 60) s),
  'funnels', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select name, label, count(*) as n, count(distinct visitor) as visitors
      from e where type = 'funnel' group by 1, 2) s),
  'appReports', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select coalesce(label, '?') as version, name as system, count(*) as n
      from e where type = 'app_report' group by 1, 2 order by 3 desc) s),
  'countries', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select coalesce(country, '?') as key, count(*) as visitors from entries group by 1 order by 2 desc limit 40) s),
  'systems', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select coalesce(os, '?') as key, count(*) as visitors from entries group by 1 order by 2 desc) s),
  'devices', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select coalesce(device, '?') as key, count(*) as visitors from entries group by 1 order by 2 desc) s),
  'browsers', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select coalesce(browser, '?') as key, count(*) as visitors from entries group by 1 order by 2 desc) s),
  'langs', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select coalesce(lang, '?') as key, count(*) as visitors from entries group by 1 order by 2 desc) s),
  'bots', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select bot, count(*) as hits, count(distinct path) as pages, to_char(max(at) at time zone p_tz, 'YYYY-MM-DD"T"HH24:MI') as last
      from bot_hits where at >= p_from and at < p_to group by 1 order by 2 desc) s),
  'botPages', (select coalesce(jsonb_agg(s), '[]'::jsonb) from (
      select bot, path, count(*) as hits
      from bot_hits where at >= p_from and at < p_to group by 1, 2 order by 3 desc limit 60) s)
);
$$;

revoke execute on function public.day_salt() from public, anon, authenticated;
revoke execute on function public.admin_stats(timestamptz, timestamptz, text) from public, anon, authenticated;
grant execute on function public.day_salt() to service_role;
grant execute on function public.admin_stats(timestamptz, timestamptz, text) to service_role;
