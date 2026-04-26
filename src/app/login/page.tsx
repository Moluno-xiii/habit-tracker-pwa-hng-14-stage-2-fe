import LoginForm from "@/components/auth/LoginForm";
import AuthShell from "@/components/auth/AuthShell";

const LoginPage = () => {
  return (
    <AuthShell
      eyebrow="Returning Hand"
      title="Welcome back to your ledger."
      intro="Sign in to continue the entries you've already begun. The almanac waits patiently."
      switcher={{
        label: "First time keeping a ledger?",
        href: "/signup",
        cta: "Begin a new volume",
      }}
    >
      <LoginForm />
    </AuthShell>
  );
};

export default LoginPage;
