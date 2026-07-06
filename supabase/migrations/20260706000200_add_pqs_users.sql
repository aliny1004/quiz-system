create table if not exists public.pqs_users (
    username text primary key,
    display_name text not null,
    created_at timestamptz not null default now(),
    last_seen_at timestamptz not null default now()
);

alter table public.pqs_quiz_banks add column if not exists username text not null default 'default';
alter table public.pqs_accuracy_history add column if not exists username text not null default 'default';
alter table public.pqs_question_stats add column if not exists username text not null default 'default';
alter table public.pqs_wrong_history add column if not exists username text not null default 'default';
alter table public.pqs_correct_questions add column if not exists username text not null default 'default';

alter table public.pqs_accuracy_history drop constraint if exists pqs_accuracy_history_quiz_storage_key_fkey;
alter table public.pqs_question_stats drop constraint if exists pqs_question_stats_quiz_storage_key_fkey;
alter table public.pqs_wrong_history drop constraint if exists pqs_wrong_history_quiz_storage_key_fkey;

alter table public.pqs_quiz_banks drop constraint if exists pqs_quiz_banks_pkey;
alter table public.pqs_quiz_banks add constraint pqs_quiz_banks_pkey primary key (username, storage_key);

alter table public.pqs_question_stats drop constraint if exists pqs_question_stats_pkey;
alter table public.pqs_question_stats add constraint pqs_question_stats_pkey primary key (username, quiz_storage_key, question_id);

alter table public.pqs_correct_questions drop constraint if exists pqs_correct_questions_pkey;
alter table public.pqs_correct_questions add constraint pqs_correct_questions_pkey primary key (username, question_id);

alter table public.pqs_accuracy_history
    add constraint pqs_accuracy_history_quiz_storage_key_fkey
    foreign key (username, quiz_storage_key)
    references public.pqs_quiz_banks(username, storage_key)
    on delete cascade;

alter table public.pqs_question_stats
    add constraint pqs_question_stats_quiz_storage_key_fkey
    foreign key (username, quiz_storage_key)
    references public.pqs_quiz_banks(username, storage_key)
    on delete cascade;

alter table public.pqs_wrong_history
    add constraint pqs_wrong_history_quiz_storage_key_fkey
    foreign key (username, quiz_storage_key)
    references public.pqs_quiz_banks(username, storage_key)
    on delete cascade;

alter table public.pqs_users enable row level security;

drop policy if exists "pqs_users_public_select" on public.pqs_users;
drop policy if exists "pqs_users_public_insert" on public.pqs_users;
drop policy if exists "pqs_users_public_update" on public.pqs_users;
create policy "pqs_users_public_select" on public.pqs_users for select to anon using (true);
create policy "pqs_users_public_insert" on public.pqs_users for insert to anon with check (true);
create policy "pqs_users_public_update" on public.pqs_users for update to anon using (true) with check (true);
