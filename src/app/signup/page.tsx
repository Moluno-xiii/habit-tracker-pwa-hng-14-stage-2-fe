import SignupForm from "@/components/auth/SignupForm";
import AuthShell from "@/components/auth/AuthShell";

const SignupPage = () => {
  return (
    <AuthShell
      eyebrow="A New Hand"
      title="Begin a fresh volume."
      intro="Open the cover of a brand-new ledger. Each day from here forward will be a small mark, kept honestly."
      switcher={{
        label: "Already have a volume in progress?",
        href: "/login",
        cta: "Open the ledger",
      }}
    >
      <SignupForm />
    </AuthShell>
  );
};

export default SignupPage;
