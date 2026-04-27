"use client";

import useHabits from "@/hooks/useHabits";
import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { getDateInLongFormat } from "@/lib/date";
import DashboardStats from "./DashboardStats";
import HabitList from "../habits/HabitList";
import EmptyState from "./EmptyState";
import CreateHabitModal from "./CreateHabitModal";
import ConfirmDialog from "../shared/ConfirmDialog";
import useAuth from "@/hooks/useAuth";

const DashboardPageUI = () => {
  const { logout } = useAuth();
  const { habits, today } = useHabits();
  const [createOpen, setCreateOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <div
      data-testid="dashboard-page"
      className="bg-paper text-ink relative flex flex-1 flex-col"
    >
      <DashboardHeader
        onOpenCreateHabitForm={() => setCreateOpen(true)}
        onOpenLogoutConfirmationModal={() => setLogoutOpen(true)}
      />
      <section className="border-ink/15 border-b">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pt-10 pb-10 sm:px-10 sm:pt-14 sm:pb-12">
          <hr className="rule-double" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="ledger-num text-vermillion text-[10px] tracking-[0.22em] uppercase">
                ❦ Today&apos;s Folio
              </p>
              <h1 className="font-display text-ink mt-2 text-[clamp(2.25rem,6vw,4rem)] leading-[0.98] text-balance italic">
                A clean page,
                <br />
                <span className="text-vermillion">awaiting your hand.</span>
              </h1>
            </div>
            <p className="ledger-num text-ink-soft text-[11px] tracking-[0.18em] uppercase">
              {getDateInLongFormat(today)}
            </p>
          </div>
        </div>
      </section>

      {habits.length > 0 && <DashboardStats />}

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-10 pb-20 sm:px-10 sm:pt-14">
        {habits.length ? (
          <HabitList habits={habits} today={today} />
        ) : (
          <EmptyState onOpenCreateHabitModal={() => setCreateOpen(true)} />
        )}
      </main>

      <footer className="border-ink/15 border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="ledger-num text-ink-soft text-[10px] tracking-[0.22em] uppercase">
            ✦ Kept by hand · No notifications · No streak shaming
          </p>
          <p className="ledger-num text-ink-soft text-[10px] tracking-[0.22em] uppercase">
            Folio 003 — Verso
          </p>
        </div>
      </footer>

      <CreateHabitModal
        isModalOpen={createOpen}
        onCloseModal={() => setCreateOpen(false)}
      />
      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={logout}
        title="Close the ledger for today?"
        eyebrow="Sign out"
        message="Your entries remain. You can return whenever the day asks for another mark."
        confirmLabel="Close it"
        cancelLabel="Stay a while"
        confirmTestId="confirm-logout-button"
      />
    </div>
  );
};

export default DashboardPageUI;
