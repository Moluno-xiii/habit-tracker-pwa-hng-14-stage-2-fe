import { AuthenticateUserDTO, Session, User } from "@/types/auth";
import storageService from "./storage";
import { SESSION_KEY, USERS_KEY } from "./constants";

class AuthService {
  private USERS_INFO_KEY: string = USERS_KEY;
  private USER_SESSION_KEY: string = SESSION_KEY;

  constructor() {}

  signup(user: User) {
    const existingUser = this.getUserByEmail(user.email);
    if (existingUser) throw new Error("User already exists.");
    this.saveUserData(user);
    this.saveUserSession({ email: user.email, userId: user.id });
  }

  login({ email, password }: AuthenticateUserDTO) {
    const existingUser = this.getUserByEmail(email);
    if (!existingUser) throw new Error("Invalid email or password.");
    if (existingUser.password.toLowerCase() !== password.toLowerCase())
      throw new Error("Invalid email or password");
    this.saveUserSession({ email, userId: existingUser.id });
  }

  logout() {
    storageService.clearStoredData(this.USER_SESSION_KEY);
  }

  getUserByEmail(email: string): User | null {
    const allUsers = this.getAllUsers();
    return (
      allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) ??
      null
    );
  }

  getUserSession(): Session | null {
    return storageService.getStoredData<Session>(this.USER_SESSION_KEY);
  }

  private saveUserSession(session: Session): void {
    storageService.storeData<Session>(this.USER_SESSION_KEY, session);
  }

  private saveUserData(user: User) {
    const allUsers = this.getAllUsers();
    storageService.storeData<Array<User>>(this.USERS_INFO_KEY, [
      ...allUsers,
      user,
    ]);
  }

  private getAllUsers(): Array<User> {
    return storageService.getStoredData<Array<User>>(this.USERS_INFO_KEY) ?? [];
  }
}

const authService = new AuthService();

export default authService;
