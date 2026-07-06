create table if not exists public.pqs_quiz_banks (
    storage_key text primary key,
    display_name text not null,
    question_count integer not null default 0,
    questions jsonb not null default '[]'::jsonb,
    uploaded_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.pqs_accuracy_history (
    id uuid primary key default gen_random_uuid(),
    quiz_storage_key text not null references public.pqs_quiz_banks(storage_key) on delete cascade,
    completed_at timestamptz not null default now(),
    correct_count integer not null default 0,
    total_count integer not null default 0,
    accuracy_rate integer not null default 0,
    duration_seconds integer not null default 0,
    mode text not null default 'exam',
    created_at timestamptz not null default now()
);

create table if not exists public.pqs_question_stats (
    quiz_storage_key text not null references public.pqs_quiz_banks(storage_key) on delete cascade,
    question_id text not null,
    attempts integer not null default 0,
    correct integer not null default 0,
    wrong integer not null default 0,
    last_answered_at timestamptz,
    updated_at timestamptz not null default now(),
    primary key (quiz_storage_key, question_id)
);

create table if not exists public.pqs_wrong_history (
    id uuid primary key default gen_random_uuid(),
    quiz_storage_key text not null references public.pqs_quiz_banks(storage_key) on delete cascade,
    recorded_at timestamptz not null default now(),
    wrong_ids jsonb not null default '[]'::jsonb
);

create table if not exists public.pqs_correct_questions (
    question_id text primary key,
    marked_at timestamptz not null default now()
);

alter table public.pqs_quiz_banks enable row level security;
alter table public.pqs_accuracy_history enable row level security;
alter table public.pqs_question_stats enable row level security;
alter table public.pqs_wrong_history enable row level security;
alter table public.pqs_correct_questions enable row level security;

drop policy if exists "pqs_quiz_banks_public_select" on public.pqs_quiz_banks;
drop policy if exists "pqs_quiz_banks_public_insert" on public.pqs_quiz_banks;
drop policy if exists "pqs_quiz_banks_public_update" on public.pqs_quiz_banks;
drop policy if exists "pqs_quiz_banks_public_delete" on public.pqs_quiz_banks;
create policy "pqs_quiz_banks_public_select" on public.pqs_quiz_banks for select to anon using (true);
create policy "pqs_quiz_banks_public_insert" on public.pqs_quiz_banks for insert to anon with check (true);
create policy "pqs_quiz_banks_public_update" on public.pqs_quiz_banks for update to anon using (true) with check (true);
create policy "pqs_quiz_banks_public_delete" on public.pqs_quiz_banks for delete to anon using (true);

drop policy if exists "pqs_accuracy_history_public_select" on public.pqs_accuracy_history;
drop policy if exists "pqs_accuracy_history_public_insert" on public.pqs_accuracy_history;
create policy "pqs_accuracy_history_public_select" on public.pqs_accuracy_history for select to anon using (true);
create policy "pqs_accuracy_history_public_insert" on public.pqs_accuracy_history for insert to anon with check (true);

drop policy if exists "pqs_question_stats_public_select" on public.pqs_question_stats;
drop policy if exists "pqs_question_stats_public_insert" on public.pqs_question_stats;
drop policy if exists "pqs_question_stats_public_update" on public.pqs_question_stats;
create policy "pqs_question_stats_public_select" on public.pqs_question_stats for select to anon using (true);
create policy "pqs_question_stats_public_insert" on public.pqs_question_stats for insert to anon with check (true);
create policy "pqs_question_stats_public_update" on public.pqs_question_stats for update to anon using (true) with check (true);

drop policy if exists "pqs_wrong_history_public_select" on public.pqs_wrong_history;
drop policy if exists "pqs_wrong_history_public_insert" on public.pqs_wrong_history;
create policy "pqs_wrong_history_public_select" on public.pqs_wrong_history for select to anon using (true);
create policy "pqs_wrong_history_public_insert" on public.pqs_wrong_history for insert to anon with check (true);

drop policy if exists "pqs_correct_questions_public_select" on public.pqs_correct_questions;
drop policy if exists "pqs_correct_questions_public_insert" on public.pqs_correct_questions;
drop policy if exists "pqs_correct_questions_public_update" on public.pqs_correct_questions;
create policy "pqs_correct_questions_public_select" on public.pqs_correct_questions for select to anon using (true);
create policy "pqs_correct_questions_public_insert" on public.pqs_correct_questions for insert to anon with check (true);
create policy "pqs_correct_questions_public_update" on public.pqs_correct_questions for update to anon using (true) with check (true);
