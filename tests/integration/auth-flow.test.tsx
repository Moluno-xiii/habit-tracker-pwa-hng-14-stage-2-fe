import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import AuthContextProvider from "@/contexts/AuthContext";
import authService from "@/lib/auth";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const renderWithAuth = (ui: React.ReactElement) =>
  render(<AuthContextProvider>{ui}</AuthContextProvider>);

const seedUser = (email: string, password: string) => {
  authService.signup({
    id: crypto.randomUUID(),
    email,
    password,
    createdAt: new Date().toISOString(),
  });
  authService.logout();
};

describe("auth flow", () => {
  beforeEach(() => {
    localStorage.clear();
    replaceMock.mockClear();
  });

  afterEach(cleanup);

  it("submits the signup form and creates a session", () => {
    renderWithAuth(<SignupForm />);

    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "randomUser@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "correctPassword123" },
    });
    fireEvent.click(screen.getByTestId("auth-signup-submit"));

    const session = authService.getUserSession();
    expect(session).not.toBeNull();
    expect(session?.email).toBe("randomUser@test.com");
    expect(replaceMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows an error for duplicate signup email", () => {
    seedUser("randomUser@test.com", "correctPassword123");
    replaceMock.mockClear();

    renderWithAuth(<SignupForm />);

    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "randomUser@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "inCorrectPassword321" },
    });
    fireEvent.click(screen.getByTestId("auth-signup-submit"));

    expect(screen.getByText(/user already exists/i)).toBeTruthy();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("submits the login form and stores the active session", () => {
    seedUser("randomUser@test.com", "correctPassword123");
    replaceMock.mockClear();

    renderWithAuth(<LoginForm />);

    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "randomUser@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "correctPassword123" },
    });
    fireEvent.click(screen.getByTestId("auth-login-submit"));

    const session = authService.getUserSession();
    expect(session).not.toBeNull();
    expect(session?.email).toBe("randomUser@test.com");
    expect(replaceMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows an error for invalid login credentials", () => {
    renderWithAuth(<LoginForm />);

    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "randomUser@test.com" },
    });
    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "randomPassword" },
    });
    fireEvent.click(screen.getByTestId("auth-login-submit"));

    expect(screen.getByText(/invalid email or password/i)).toBeTruthy();
    expect(authService.getUserSession()).toBeNull();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
