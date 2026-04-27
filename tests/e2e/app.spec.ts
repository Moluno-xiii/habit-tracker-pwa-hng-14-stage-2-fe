import { expect, test, type Page } from "@playwright/test";
import type { Session, User } from "@/types/auth";
import type { Habit } from "@/types/habit";
import { HABITS_KEY, SESSION_KEY, USERS_KEY } from "@/lib/constants";
import { getHabitSlug } from "@/lib/slug";

type Seed = {
  users?: User[];
  habits?: Habit[];
  session?: Session;
};

const seedStorage = (page: Page, seed: Seed) =>
  page.addInitScript(
    ({ seed, USERS_KEY, HABITS_KEY, SESSION_KEY }) => {
      if (seed.users)
        localStorage.setItem(USERS_KEY, JSON.stringify(seed.users));
      if (seed.habits)
        localStorage.setItem(HABITS_KEY, JSON.stringify(seed.habits));
      if (seed.session)
        localStorage.setItem(SESSION_KEY, JSON.stringify(seed.session));
    },
    { seed, USERS_KEY, HABITS_KEY, SESSION_KEY },
  );

const todayString = () => new Date().toISOString().slice(0, 10);

const buildUser = (overrides: Partial<User> = {}): User => ({
  id: "escanorLionSinOfPride",
  email: "escanortheGreatest@deadly.sins",
  password: "iaMTheGreatest",
  createdAt: "2026-04-01T00:00:00.000Z",
  ...overrides,
});

const buildHabit = (overrides: Partial<Habit> = {}): Habit => ({
  id: "habit-1",
  userId: "escanorLionSinOfPride",
  name: "Drink water",
  description: "",
  frequency: "daily",
  createdAt: todayString(),
  completions: [],
  ...overrides,
});

test.describe("Habit Tracker app", () => {
  test("shows the splash screen and redirects unauthenticated users to /login", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  test("redirects authenticated users from / to /dashboard", async ({
    page,
  }) => {
    const user = buildUser();
    await seedStorage(page, {
      users: [user],
      session: { userId: user.id, email: user.email },
    });
    await page.goto("/");
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  test("prevents unauthenticated access to /dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  test("signs up a new user and lands on the dashboard", async ({ page }) => {
    await page.goto("/signup");
    await page.getByTestId("auth-signup-email").fill("fresh@journal.ink");
    await page.getByTestId("auth-signup-password").fill("ledger-12");
    await page.getByTestId("auth-signup-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  test("logs in an existing user and loads only that user's habits", async ({
    page,
  }) => {
    const userA = buildUser({ id: "user-a", email: "a@journal.ink" });
    const userB = buildUser({ id: "user-b", email: "b@journal.ink" });
    const habitA = buildHabit({
      id: "habit-a",
      userId: userA.id,
      name: "Drink water",
    });
    const habitB = buildHabit({
      id: "habit-b",
      userId: userB.id,
      name: "Stretch",
    });

    await seedStorage(page, {
      users: [userA, userB],
      habits: [habitA, habitB],
    });
    await page.goto("/login");
    await page.getByTestId("auth-login-email").fill(userA.email);
    await page.getByTestId("auth-login-password").fill(userA.password);
    await page.getByTestId("auth-login-submit").click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(
      page.getByTestId(`habit-card-${getHabitSlug(habitA.name)}`),
    ).toBeVisible();
    await expect(
      page.getByTestId(`habit-card-${getHabitSlug(habitB.name)}`),
    ).toHaveCount(0);
  });

  test("creates a habit from the dashboard", async ({ page }) => {
    const user = buildUser();
    await seedStorage(page, {
      users: [user],
      session: { userId: user.id, email: user.email },
    });
    await page.goto("/dashboard");

    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Read books");
    await page.getByTestId("habit-save-button").click();

    await expect(
      page.getByTestId(`habit-card-${getHabitSlug("Read books")}`),
    ).toBeVisible();
  });

  test("completes a habit for today and updates the streak", async ({
    page,
  }) => {
    const user = buildUser();
    const habit = buildHabit({ name: "Meditate", userId: user.id });
    await seedStorage(page, {
      users: [user],
      habits: [habit],
      session: { userId: user.id, email: user.email },
    });
    await page.goto("/dashboard");

    const slug = getHabitSlug(habit.name);
    const streak = page.getByTestId(`habit-streak-${slug}`);
    await expect(streak).toHaveText("00");

    await page.getByTestId(`habit-complete-${slug}`).click();
    await expect(streak).toHaveText("01");
  });

  test("persists session and habits after page reload", async ({ page }) => {
    const user = buildUser();
    const habit = buildHabit({ name: "Read books", userId: user.id });
    await seedStorage(page, {
      users: [user],
      habits: [habit],
      session: { userId: user.id, email: user.email },
    });
    await page.goto("/dashboard");

    const card = page.getByTestId(`habit-card-${getHabitSlug(habit.name)}`);
    await expect(card).toBeVisible();

    await page.reload();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(card).toBeVisible();
  });

  test("logs out and redirects to /login", async ({ page }) => {
    const user = buildUser();
    await seedStorage(page, {
      users: [user],
      session: { userId: user.id, email: user.email },
    });
    await page.goto("/dashboard");

    await page.getByTestId("auth-logout-button").click();
    await page.getByTestId("confirm-logout-button").click();

    await expect(page).toHaveURL(/\/login$/);
    const session = await page.evaluate(
      (key) => localStorage.getItem(key),
      SESSION_KEY,
    );
    expect(session).toBeNull();
  });

  test("loads the cached app shell when offline after the app has been loaded once", async ({
    page,
    context,
  }) => {
    await page.goto("/login");
    await page.evaluate(() => navigator.serviceWorker?.ready);

    await page.reload();
    await expect(page.getByTestId("login-form")).toBeVisible();

    await context.setOffline(true);
    await page.reload();

    await expect(page.getByTestId("login-form")).toBeVisible();
  });
});
