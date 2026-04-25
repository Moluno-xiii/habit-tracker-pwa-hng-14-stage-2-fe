type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

type Session = {
  userId: string;
  email: string;
};

type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export type { User, Session, AuthenticateUserDTO };
