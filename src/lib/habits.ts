import { Habit } from "@/types/habit";
import storageService from "./storage";

class HabitsService {
  private HABIT_TRACKER_KEY: string = "habit-tracker-habits";

  constructor() {}

  addHabit(habit: Habit): void {
    const existingHabits = this.getAllHabits();
    this.storeHabits([...existingHabits, habit]);
  }

  getHabitById(habitId: string): Habit | null {
    const allHabits = this.getAllHabits();
    return allHabits.find((h) => h.id === habitId) ?? null;
  }

  getAllHabits(): Habit[] {
    return storageService.getStoredData<Habit[]>(this.HABIT_TRACKER_KEY) ?? [];
  }

  updateHabit(habitId: string, updatedData: Habit): void {
    const existingHabits = this.getAllHabits();
    const newHabits = existingHabits.map((h) => {
      if (h.id !== habitId) return h;
      return updatedData;
    });
    this.storeHabits(newHabits);
  }

  deleteHabit(habitId: string): void {
    const existingHabits = this.getAllHabits();
    const newHabits = existingHabits.filter((h) => h.id !== habitId);
    this.storeHabits(newHabits);
  }

  private storeHabits(habits: Array<Habit>): void {
    storageService.storeData<Array<Habit>>(this.HABIT_TRACKER_KEY, habits);
  }
}

const habitService = new HabitsService();
export default habitService;
