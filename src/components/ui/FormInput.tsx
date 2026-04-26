"use client";

import { InputHTMLAttributes, useId, useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

interface Props extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name"
> {
  label: string;
  inputTestId: string;
  type?: string;
  name?: string;
  hint?: string;
}

const FormInput = ({
  label,
  inputTestId,
  type = "text",
  name,
  hint,
  required = false,
  ...rest
}: Props) => {
  const id = useId();
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && reveal ? "text" : type;
  const resolvedName = name ?? label.toLowerCase();

  return (
    <div className="group flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="text-ink-soft ledger-num text-[10px] tracking-[0.22em] uppercase"
        >
          {label}
          {required && <span className="text-vermillion ml-1">*</span>}
        </label>
        {hint && (
          <span className="text-ink-soft/70 text-[11px] italic">{hint}</span>
        )}
      </div>
      <div className="border-ink/25 group-focus-within:border-ink relative flex items-center border-b transition-colors">
        <input
          {...rest}
          id={id}
          name={resolvedName}
          required={required}
          data-testid={inputTestId}
          type={resolvedType}
          className="text-ink placeholder:text-ink-soft/50 h-11 w-full bg-transparent text-base outline-none"
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "Hide password" : "Show password"}
            className="text-ink-soft hover:text-ink ml-2 inline-flex h-9 w-9 shrink-0 items-center justify-center transition-colors"
          >
            {reveal ? (
              <HiOutlineEyeSlash className="h-4.5 w-4.5" />
            ) : (
              <HiOutlineEye className="h-4.5 w-4.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
