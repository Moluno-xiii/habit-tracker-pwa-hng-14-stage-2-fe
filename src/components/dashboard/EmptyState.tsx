"use client";

import { HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi2";

const EmptyState = ({
  onOpenCreateHabitModal,
}: {
  onOpenCreateHabitModal: () => void;
}) => (
  <div
    data-testid="empty-state"
    className="border-ink/15 mx-auto flex max-w-2xl flex-col items-center border px-6 py-16 text-center sm:py-20"
  >
    <span className="border-ink/25 text-ink-soft mb-7 inline-flex h-16 w-16 items-center justify-center rounded-full border">
      <HiOutlineSparkles className="h-7 w-7" />
    </span>
    <p className="ledger-num text-vermillion text-[10px] tracking-[0.22em] uppercase">
      Empty pages
    </p>
    <h2 className="font-display text-ink mt-3 text-[clamp(2rem,5vw,3rem)] leading-[1.05] text-balance italic">
      Begin tomorrow&apos;s history
      <br />
      with a single mark.
    </h2>
    <p className="text-ink-soft mt-4 max-w-md text-pretty">
      No habits yet. Inscribe your first ritual — small, honest, the kind you
      can keep when nothing&apos;s watching.
    </p>
    <button
      type="button"
      onClick={onOpenCreateHabitModal}
      className="bg-vermillion text-paper border-vermillion hover:bg-vermillion-deep ledger-num mt-8 inline-flex h-12 items-center gap-2 border px-6 text-[11px] tracking-[0.22em] uppercase transition-colors"
    >
      <HiOutlinePlus className="h-4 w-4" />
      Inscribe first habit
    </button>
  </div>
);

export default EmptyState;
