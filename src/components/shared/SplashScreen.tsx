import { getDateInLongFormat } from "@/lib/date";

const SplashScreen = () => {
  const date = getDateInLongFormat(new Date().toISOString());

  return (
    <main
      data-testid="splash-screen"
      className="grain bg-paper text-ink relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16"
    >
      <div className="text-ink-soft ledger-num anim-rise absolute top-6 left-6 text-[10px] tracking-[0.22em] uppercase sm:top-10 sm:left-10">
        Vol. I
      </div>
      <div className="text-ink-soft ledger-num anim-rise absolute top-6 right-6 text-[10px] tracking-[0.22em] uppercase sm:top-10 sm:right-10">
        MMXXVI
      </div>

      <div className="relative flex flex-col items-center text-center">
        <p
          className="text-ink-soft anim-letter mb-6 text-[11px] tracking-[0.4em] uppercase"
          style={{ animationDelay: "60ms" }}
        >
          The Daily Ledger
        </p>
        <h1 className="font-display text-ink text-[clamp(3.5rem,14vw,9rem)] leading-[0.9] font-light text-balance italic">
          <span
            className="anim-rise inline-block"
            style={{ animationDelay: "120ms" }}
          >
            Habit
          </span>
          <br />
          <span
            className="anim-rise text-vermillion -mt-2 inline-block"
            style={{ animationDelay: "260ms" }}
          >
            Tracker
          </span>
        </h1>
        <div
          className="anim-fade mt-10 flex items-center gap-4"
          style={{ animationDelay: "520ms" }}
        >
          <span className="bg-ink/30 h-px w-10" />
          <p className="ledger-num text-ink-soft text-[11px] tracking-[0.18em] uppercase">
            {date}
          </p>
          <span className="bg-ink/30 h-px w-10" />
        </div>
        <p
          className="text-ink-soft anim-fade mt-6 max-w-xs text-sm leading-relaxed text-pretty"
          style={{ animationDelay: "620ms" }}
        >
          An almanac for the small disciplines that compound into a life.
        </p>
      </div>

      <div className="text-ink-soft ledger-num anim-rise absolute bottom-6 left-6 text-[10px] tracking-[0.22em] uppercase sm:bottom-10 sm:left-10">
        Folio 001
      </div>
      <div className="text-ink-soft ledger-num anim-rise absolute right-6 bottom-6 text-[10px] tracking-[0.22em] uppercase sm:right-10 sm:bottom-10">
        ✦
      </div>
    </main>
  );
};

export default SplashScreen;
