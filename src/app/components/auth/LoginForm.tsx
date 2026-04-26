"use client";

import { SubmitEvent } from "react";
import FormInput from "../ui/FormInput";

const LoginForm: React.FC = () => {
  const submitForm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("form data \n", data);
  };

  return (
    <form
      data-testid="login-form"
      onSubmit={submitForm}
      className="flex flex-col gap-y-4"
    >
      <FormInput required={true} inputTestId="auth-login-email" label="email" />
      <FormInput
        required={true}
        inputTestId="auth-login-password"
        label="password"
        type="password"
      />
      <button data-testid="auth-login-submit">Submit</button>
    </form>
  );
};

export default LoginForm;
