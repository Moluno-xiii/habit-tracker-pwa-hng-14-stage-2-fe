"use client";

import { CreateHabitDTO } from "@/types/habit";
import { SubmitEvent, useState } from "react";
import { HiLockClosed, HiOutlineBookmark } from "react-icons/hi2";
import FormInput from "../ui/FormInput";
import { validateHabitName } from "@/lib/validators";
import ErrorDisplay from "../ui/ErrorDisplay";

type Props = {
  onSubmit: (data: CreateHabitDTO) => void;
  onCancel: () => void;
  defaultValues?: { name: string; description: string };
};

const HabitForm = ({ onSubmit, onCancel, defaultValues }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const submitForm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as CreateHabitDTO;

    try {
      setError(null);
      const { error: validationError, valid } = validateHabitName(data.name);
      if (!valid) throw new Error(validationError!);

      onSubmit(data);
    } catch (e) {
      const errMessage =
        e instanceof Error ? e.message : "Unexpected error, try again";
      setError(errMessage);
    }
  };

  return (
    <form
      data-testid="habit-form"
      onSubmit={submitForm}
      className="flex flex-col gap-7"
    >
      <FormInput
        inputTestId="habit-name-input"
        label="Habit"
        name="name"
        placeholder="e.g. Drink water"
        defaultValue={defaultValues?.name}
      />

      <div className="group flex flex-col gap-1.5">
        <label
          htmlFor="habit-description"
          className="text-ink-soft ledger-num text-[10px] tracking-[0.22em] uppercase"
        >
          Notation
          <span className="text-vermillion ml-2 text-[10px] normal-case italic">
            optional
          </span>
        </label>
        <div className="border-ink/25 group-focus-within:border-ink border-b transition-colors">
          <textarea
            id="habit-description"
            data-testid="habit-description-input"
            name="description"
            rows={3}
            placeholder="Why this matters, in one breath."
            className="text-ink placeholder:text-ink-soft/50 min-h-22 w-full resize-none bg-transparent py-2 text-base outline-none"
            defaultValue={defaultValues?.description}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="habit-frequency"
          className="text-ink-soft ledger-num text-[10px] tracking-[0.22em] uppercase"
        >
          Frequency
          <span className="text-vermillion ml-2 text-[10px] normal-case italic">
            locked
          </span>
        </label>
        <div className="border-ink/25 bg-ink/2.5 relative flex items-center border-b">
          <select
            id="habit-frequency"
            name="frequency"
            data-testid="habit-frequency-select"
            defaultValue="daily"
            disabled
            aria-readonly="true"
            className="text-ink h-11 w-full cursor-not-allowed appearance-none bg-transparent pr-8 text-base opacity-100 outline-none"
          >
            <option value="daily">Daily</option>
          </select>
          <HiLockClosed
            aria-hidden
            className="text-ink-soft pointer-events-none absolute top-1/2 right-1 h-3.5 w-3.5 -translate-y-1/2"
          />
        </div>
      </div>
      <ErrorDisplay error={error} />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="border-ink/25 text-ink hover:bg-ink/5 inline-flex h-11 items-center justify-center border px-5 text-[11px] tracking-[0.2em] uppercase transition-colors"
        >
          Discard
        </button>
        <button
          type="submit"
          data-testid="habit-save-button"
          className="bg-ink text-paper border-ink hover:bg-vermillion hover:border-vermillion inline-flex h-11 items-center justify-center gap-2 border px-5 text-[11px] tracking-[0.2em] uppercase transition-colors"
        >
          <HiOutlineBookmark className="h-4 w-4" />
          Inscribe
        </button>
      </div>
    </form>
  );
};

export default HabitForm;
