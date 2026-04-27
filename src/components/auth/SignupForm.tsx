"use client";

import { SubmitEvent, useState } from "react";
import FormInput from "../ui/FormInput";
import { HiArrowRight } from "react-icons/hi2";
import useAuth from "@/hooks/useAuth";
import { AuthenticateUserDTO } from "@/types/auth";
import ErrorDisplay from "../ui/ErrorDisplay";

const SignupForm = () => {
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const submitForm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as AuthenticateUserDTO;

    try {
      setError(null);
      signup(data);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Unexpected error, try again";
      setError(errorMessage);
    }
  };

  return (
    <form
      data-testid="signup-form"
      onSubmit={submitForm}
      className="flex flex-col gap-7"
    >
      <FormInput
        required
        inputTestId="auth-signup-email"
        label="email"
        type="email"
        autoComplete="email"
        placeholder="hand@journal.ink"
      />
      <FormInput
        required
        inputTestId="auth-signup-password"
        label="password"
        type="password"
        autoComplete="new-password"
        hint="min. 8 characters"
        placeholder="choose carefully"
        minLength={8}
      />
      <ErrorDisplay error={error} />
      <button
        type="submit"
        data-testid="auth-signup-submit"
        className="bg-vermillion text-paper border-vermillion hover:bg-vermillion-deep hover:border-vermillion-deep ledger-num group inline-flex h-12 items-center justify-center gap-3 border text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        Begin the volume
        <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
};

export default SignupForm;
