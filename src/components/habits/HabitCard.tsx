"use client";

import { useState } from "react";
import { getHabitSlug } from "@/lib/slug";
import { calculateCurrentStreak } from "@/lib/streaks";
import { CreateHabitDTO, Habit } from "@/types/habit";
import ConfirmDialog from "../shared/ConfirmDialog";
import Modal from "../shared/Modal";
import HabitForm from "./HabitForm";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiCheck,
} from "react-icons/hi2";
import useHabits from "@/hooks/useHabits";

type Props = {
  habit: Habit;
  today?: string;
};

const HabitCard = ({
  habit,
  today = new Date().toISOString().slice(0, 10),
}: Props) => {
  const { deleteHabit, updateHabit, toggleHabitCompletionStatus } = useHabits();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const slug = getHabitSlug(habit.name);
  const streak = calculateCurrentStreak(habit.completions, today);
  const completedToday = habit.completions.includes(today);

  return (
    <li
      data-testid={`habit-card-${slug}`}
      className="bg-paper-soft/40 border-ink/15 hover:border-ink/30 group relative flex flex-col border transition-colors"
    >
      <span
        aria-hidden
        className={`bg-vermillion absolute top-6 left-0 h-10 w-0.75 transition-opacity ${
          completedToday ? "opacity-100" : "opacity-25 group-hover:opacity-60"
        }`}
      />

      <div className="flex flex-col gap-6 px-6 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-8 sm:pt-7">
        <div className="min-w-0 flex-1">
          <p className="ledger-num text-ink-soft mb-1.5 text-[10px] tracking-[0.22em] uppercase">
            Entry No. {String(habit.id).slice(-4)} · {habit.frequency}
          </p>
          <h3 className="font-display text-ink text-[1.625rem] leading-[1.1] text-balance italic sm:text-[1.875rem]">
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-ink-soft mt-3 max-w-md text-[0.95rem] leading-relaxed text-pretty">
              {habit.description}
            </p>
          )}
        </div>
        <div className="flex items-start gap-5 sm:flex-col sm:items-end sm:gap-1">
          <div className="text-left sm:text-right">
            <p
              data-testid={`habit-streak-${slug}`}
              className="ledger-num text-ink text-[3.25rem] leading-[0.85] tabular-nums"
            >
              {String(streak).padStart(2, "0")}
            </p>
            <p className="ledger-num text-ink-soft mt-1 text-[10px] tracking-[0.22em] uppercase">
              {streak === 1 ? "Day streak" : "Days streak"}
            </p>
          </div>
          {completedToday && (
            <span className="seal anim-stamp ledger-num h-14 w-14 text-[9px] tracking-[0.18em]">
              KEPT
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 sm:px-8">
        <button
          onClick={() => toggleHabitCompletionStatus(habit)}
          type="button"
          data-testid={`habit-complete-${slug}`}
          aria-pressed={completedToday}
          className={`group/btn ledger-num inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors ${
            completedToday ? "text-sage-deep" : "text-ink hover:text-vermillion"
          }`}
        >
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
              completedToday
                ? "border-sage-deep bg-sage/20 text-sage-deep"
                : "border-ink/40 group-hover/btn:border-vermillion group-hover/btn:bg-vermillion/5 group-hover/btn:text-vermillion"
            }`}
          >
            <HiCheck className="h-3.5 w-3.5" />
          </span>
          {completedToday ? "Marked today" : "Mark complete"}
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            data-testid={`habit-edit-${slug}`}
            aria-label={`Edit ${habit.name}`}
            onClick={() => setEditOpen(true)}
            className="text-ink-soft hover:text-ink hover:bg-ink/5 inline-flex h-9 w-9 items-center justify-center transition-colors"
          >
            <HiOutlinePencilSquare className="h-4 w-4" />
          </button>
          <button
            type="button"
            data-testid={`habit-delete-${slug}`}
            aria-label={`Delete ${habit.name}`}
            onClick={() => setConfirmOpen(true)}
            className="text-ink-soft hover:text-vermillion hover:bg-vermillion/5 inline-flex h-9 w-9 items-center justify-center transition-colors"
          >
            <HiOutlineTrash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Amend the entry."
        eyebrow={`Editing · ${habit.name}`}
      >
        <HabitForm
          defaultValues={{
            name: habit.name,
            description: habit.description,
          }}
          onSubmit={(data: CreateHabitDTO) => {
            updateHabit({
              ...habit,
              name: data.name,
              description: data.description,
            });
            setEditOpen(false);
          }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteHabit(habit.id)}
        title={`Erase “${habit.name}” from the ledger?`}
        eyebrow="Permanent action"
        message="This entry and every mark beneath it will be removed. The pages will not remember."
        confirmLabel="Erase entry"
        cancelLabel="Keep it"
        destructive
      />
    </li>
  );
};

export default HabitCard;
