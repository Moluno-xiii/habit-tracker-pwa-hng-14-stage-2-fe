"use client";

import ThemeToggle from "../shared/ThemeToggle";
import { HiOutlineArrowRightOnRectangle, HiOutlinePlus } from "react-icons/hi2";

type Props = {
  onOpenCreateHabitForm: () => void;
  onOpenLogoutConfirmationModal: () => void;
};

const DashboardHeader: React.FC<Props> = ({
  onOpenCreateHabitForm,
  onOpenLogoutConfirmationModal,
}) => {
  return (
    <header className="bg-paper grain border-ink/15 sticky top-0 z-30 border-b backdrop-blur-[0.5px]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-xl italic sm:text-2xl">
            Habit Tracker
          </span>
          <span className="ledger-num text-ink-soft hidden text-[10px] tracking-[0.22em] uppercase md:inline">
            Vol. I · MMXXVI
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ThemeToggle />
          <span
            aria-hidden
            className="bg-ink/15 mx-1 hidden h-6 w-px sm:inline-block"
          />
          <button
            type="button"
            data-testid="create-habit-button"
            onClick={onOpenCreateHabitForm}
            className="bg-ink text-paper border-ink hover:bg-vermillion hover:border-vermillion ledger-num inline-flex h-10 items-center gap-2 border px-4 text-[10px] tracking-[0.22em] uppercase transition-colors"
          >
            <HiOutlinePlus className="h-4 w-4" />
            <span className="hidden sm:inline">New entry</span>
            <span className="sm:hidden">New</span>
          </button>
          <button
            type="button"
            data-testid="auth-logout-button"
            onClick={onOpenLogoutConfirmationModal}
            aria-label="Log out"
            className="border-ink/25 text-ink hover:border-ink hover:bg-ink/5 inline-flex h-10 items-center gap-2 border px-3 text-[10px] tracking-[0.22em] uppercase transition-colors sm:px-4"
          >
            <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
