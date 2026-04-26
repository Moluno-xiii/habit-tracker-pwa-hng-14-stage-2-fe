import { SubmitEvent } from "react";
import FormInput from "../ui/FormInput";

const SignupForm: React.FC = () => {
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
      className="flex flex-col gap-y-4"
    >
      <FormInput inputTestId="auth-signup-email" label="email" />
      <FormInput
        inputTestId="auth-signup-password"
        label="password"
        type="password"
      />
      <button data-testid="auth-signup-submit">Submit</button>
    </form>
  );
};

export default SignupForm;
