import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import DashboardPageUI from "@/components/dashboard/DashboardPageUI";
import HabitForm from "@/components/habits/HabitForm";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import AuthContextProvider from "@/contexts/AuthContext";
import HabitContextProvider from "@/contexts/HabitContext";
import authService from "@/lib/auth";
import habitService from "@/lib/habits";
import { getSlicedDate } from "@/lib/date";
import { getHabitSlug } from "@/lib/slug";
import type { Habit } from "@/types/habit";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

const TEST_USER = {
  id: "test-user-id",
  email: "scribe@journal.ink",
  password: "ledger-12",
  createdAt: "2026-04-01T00:00:00.000Z",
};

const seedAuth = () => {
  authService.signup(TEST_USER);
};

const seedHabit = (overrides: Partial<Habit> = {}): Habit => {
  const habit: Habit = {
    id: crypto.randomUUID(),
    userId: TEST_USER.id,
    name: "Drink water",
    description: "Eight cups, neatly kept.",
    frequency: "daily",
    createdAt: "2026-04-20",
    completions: [],
    ...overrides,
  };
  habitService.addHabit(habit);
  return habit;
};

const renderDashboard = () =>
  render(
    <AuthContextProvider>
      <ProtectedRoute>
        <HabitContextProvider>
          <DashboardPageUI />
        </HabitContextProvider>
      </ProtectedRoute>
    </AuthContextProvider>,
  );

describe("habit form", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(cleanup);

  it("shows a validation error when habit name is empty", () => {
    const onSubmit = vi.fn();
    render(<HabitForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    fireEvent.click(screen.getByTestId("habit-save-button"));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/habit name is required/i)).toBeTruthy();
  });

  it("creates a new habit and renders it in the list", () => {
    seedAuth();
    renderDashboard();

    fireEvent.click(screen.getByTestId("create-habit-button"));

    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Read books" },
    });
    fireEvent.change(screen.getByTestId("habit-description-input"), {
      target: { value: "A page a day." },
    });
    fireEvent.click(screen.getByTestId("habit-save-button"));

    const slug = getHabitSlug("Read books");
    expect(screen.getByTestId(`habit-card-${slug}`)).toBeTruthy();
    expect(screen.getByText("Read books")).toBeTruthy();
    expect(habitService.getAllHabitsByUserId(TEST_USER.id)).toHaveLength(1);
  });

  it("edits an existing habit and preserves immutable fields", () => {
    seedAuth();
    const seeded = seedHabit({
      name: "Drink water",
      completions: ["2026-04-25"],
    });
    const oldSlug = getHabitSlug(seeded.name);

    renderDashboard();

    fireEvent.click(screen.getByTestId(`habit-edit-${oldSlug}`));

    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Drink more water" },
    });
    fireEvent.click(screen.getByTestId("habit-save-button"));

    const newSlug = getHabitSlug("Drink more water");
    expect(screen.getByTestId(`habit-card-${newSlug}`)).toBeTruthy();

    const stored = habitService.getHabitById(seeded.id);
    expect(stored).not.toBeNull();
    expect(stored!.name).toBe("Drink more water");
    expect(stored!.id).toBe(seeded.id);
    expect(stored!.userId).toBe(seeded.userId);
    expect(stored!.createdAt).toBe(seeded.createdAt);
    expect(stored!.frequency).toBe(seeded.frequency);
    expect(stored!.completions).toEqual(seeded.completions);
  });

  it("deletes a habit only after explicit confirmation", () => {
    seedAuth();
    const seeded = seedHabit({ name: "Stretch" });
    const slug = getHabitSlug(seeded.name);

    renderDashboard();

    fireEvent.click(screen.getByTestId(`habit-delete-${slug}`));

    expect(screen.getByTestId(`habit-card-${slug}`)).toBeTruthy();
    expect(habitService.getHabitById(seeded.id)).not.toBeNull();

    fireEvent.click(screen.getByTestId("confirm-delete-button"));

    expect(screen.queryByTestId(`habit-card-${slug}`)).toBeNull();
    expect(habitService.getHabitById(seeded.id)).toBeNull();
  });

  it("toggles completion and updates the streak display", () => {
    seedAuth();
    const seeded = seedHabit({ name: "Meditate", completions: [] });
    const slug = getHabitSlug(seeded.name);

    renderDashboard();

    expect(screen.getByTestId(`habit-streak-${slug}`).textContent).toBe("00");

    fireEvent.click(screen.getByTestId(`habit-complete-${slug}`));

    expect(screen.getByTestId(`habit-streak-${slug}`).textContent).toBe("01");
    const stored = habitService.getHabitById(seeded.id);
    expect(stored!.completions).toContain(getSlicedDate());
  });
});
