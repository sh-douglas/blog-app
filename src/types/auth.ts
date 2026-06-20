import type { SignInData } from "../schemas/login.schema";

type Role = "reader" | "editor" | "director";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

export type { User, AuthContextData };
