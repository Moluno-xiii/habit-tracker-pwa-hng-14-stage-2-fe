"use client";

import { SubmitEvent } from "react";
import FormInput from "../ui/FormInput";
import { HiArrowRight } from "react-icons/hi2";

const SignupForm = () => {
  const submitForm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("signup form data \n", data);
  };

  return (
    <form
      data-testid="signup-form"
      onSubmit={submitForm}
      className="flex flex-col gap-7"
      noValidate
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
      />
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
