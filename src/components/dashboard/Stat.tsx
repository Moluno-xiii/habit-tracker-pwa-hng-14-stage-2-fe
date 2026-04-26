type Props = {
  label: string;
  value: number | string;
  align?: "left" | "right";
  accent?: boolean;
};

const Stat: React.FC<Props> = ({
  label,
  value,
  align = "left",
  accent = false,
}) => (
  <div
    className={`border-ink/15 flex flex-col gap-1 py-5 sm:py-6 ${
      align === "right" ? "items-end text-right" : "items-start text-left"
    } not-last:border-r ${align === "right" ? "" : "pr-4"}`}
  >
    <p className="ledger-num text-ink-soft text-[10px] tracking-[0.22em] uppercase">
      {label}
    </p>
    <p
      className={`font-display text-[clamp(1.5rem,3.5vw,2.25rem)] leading-none italic ${
        accent ? "text-vermillion" : "text-ink"
      }`}
    >
      {value}
    </p>
  </div>
);

export default Stat;
