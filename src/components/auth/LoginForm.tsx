"use client";

import { SubmitEvent } from "react";
import FormInput from "../ui/FormInput";
import { HiArrowRight } from "react-icons/hi2";

const LoginForm = () => {
  const submitForm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("login form data \n", data);
  };

  return (
    <form
      data-testid="login-form"
      onSubmit={submitForm}
      className="flex flex-col gap-7"
      noValidate
    >
      <FormInput
        required
        inputTestId="auth-login-email"
        label="email"
        type="email"
        autoComplete="email"
        placeholder="hand@journal.ink"
      />
      <FormInput
        required
        inputTestId="auth-login-password"
        label="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
      />
      <button
        type="submit"
        data-testid="auth-login-submit"
        className="bg-ink text-paper border-ink hover:bg-vermillion hover:border-vermillion ledger-num group inline-flex h-12 items-center justify-center gap-3 border text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        Open the ledger
        <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
};

export default LoginForm;
