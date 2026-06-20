import { useState, useEffect, createContext, type ReactNode } from "react";
import type { User, AuthContextData } from "../types/auth";
import type { SignInData } from "../schemas/login.schema";
import api from "../api";

interface ProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("@BlogRoles:Token");

    if (!token) {
      setLoading(false);
      return;
    }

    async function getUserData() {
      try {
        const userData = await api.get("/users/me");
        setUser(userData.data);
      } catch {
        localStorage.removeItem("@BlogRoles:Token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  async function signIn(data: SignInData) {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.token;
      localStorage.setItem("@BlogRoles:Token", token);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    localStorage.removeItem("@BlogRoles:Token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
