import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  eyebrow: string;
  title: string;
  intro: string;
  switcher: { label: string; href: string; cta: string };
}>;

const AuthShell = ({ eyebrow, title, intro, switcher, children }: Props) => {
  return (
    <main className="bg-paper text-ink relative flex min-h-screen flex-1 flex-col lg:flex-row">
      <aside className="border-ink/15 relative hidden flex-col justify-between border-r p-10 lg:flex lg:w-[42%] xl:w-[46%]">
        <div className="flex items-center justify-between">
          <p className="font-display text-ink text-2xl italic hover:no-underline">
            Habit Tracker
          </p>
          <span className="ledger-num text-ink-soft text-[10px] tracking-[0.22em] uppercase">
            Vol. I · MMXXVI
          </span>
        </div>

        <div className="space-y-6">
          <p className="ledger-num text-vermillion text-[10px] tracking-[0.22em] uppercase">
            ❦ The Almanac
          </p>
          <h2 className="font-display text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] text-balance italic">
            Small disciplines.
            <br />
            <span className="text-vermillion">Long lives.</span>
          </h2>
          <hr className="rule max-w-56" />
          <p className="text-ink-soft max-w-md text-base leading-relaxed text-pretty">
            A quiet ledger for the rituals you keep. No notifications, no
            streak-shaming; just a record, neatly kept, of the days you showed
            up.
          </p>
        </div>

        <div className="ledger-num text-ink-soft text-[10px] tracking-[0.22em] uppercase">
          Folio 002 — Recto
        </div>
      </aside>

      <section className="relative flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-14">
        <div className="mb-10 flex items-center justify-between lg:hidden">
          <p className="font-display text-2xl italic">Habit Tracker</p>
          <span className="ledger-num text-ink-soft text-[10px] tracking-[0.22em] uppercase">
            Vol. I
          </span>
        </div>

        <div className="anim-rise mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <p className="ledger-num text-vermillion mb-4 text-[10px] tracking-[0.22em] uppercase">
            {eyebrow}
          </p>
          <h1 className="font-display text-ink text-[clamp(2rem,5vw,3rem)] leading-[1.05] text-balance italic">
            {title}
          </h1>
          <p className="text-ink-soft mt-4 text-base leading-relaxed text-pretty">
            {intro}
          </p>
          <hr className="rule my-8" />
          {children}
          <div className="mt-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-ink-soft text-sm">{switcher.label}</span>
            <Link
              href={switcher.href}
              className="text-ink hover:text-vermillion ledger-num inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase underline-offset-4 hover:underline"
            >
              {switcher.cta} →
            </Link>
          </div>
        </div>

        <p className="ledger-num text-ink-soft mt-10 text-center text-[10px] tracking-[0.22em] uppercase lg:mt-0">
          ✦ Kept by hand ✦
        </p>
      </section>
    </main>
  );
};

export default AuthShell;
