drop policy if exists "pqs_accuracy_history_public_delete" on public.pqs_accuracy_history;
drop policy if exists "pqs_question_stats_public_delete" on public.pqs_question_stats;
drop policy if exists "pqs_wrong_history_public_delete" on public.pqs_wrong_history;

create policy "pqs_accuracy_history_public_delete" on public.pqs_accuracy_history for delete to anon using (true);
create policy "pqs_question_stats_public_delete" on public.pqs_question_stats for delete to anon using (true);
create policy "pqs_wrong_history_public_delete" on public.pqs_wrong_history for delete to anon using (true);
