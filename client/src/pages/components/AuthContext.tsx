// AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from "react";
import { fetchWithAuth } from "../../../api/user-service";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isRoleAllowed: (roles: string[]) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userFullName");
    const role = localStorage.getItem("userRole");

    if (token && email && name && role) {
      setUser({ name, email, role });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      checkAuth();
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token || !data.user) {
        throw new Error(data.message || "Login failed");
      }

      const fullName = `${data.user.firstName} ${data.user.lastName}`;
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userFullName", fullName);
      localStorage.setItem("userRole", data.user.role);

      setUser({ name: fullName, email: data.user.email, role: data.user.role });
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetchWithAuth("/auth/logout", { method: "POST" });
    } catch (err) {
      console.warn("Logout failed", err);
    } finally {
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const isRoleAllowed = (roles: string[]) => user ? roles.includes(user.role) : false;

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    isRoleAllowed,
    login,
    logout,
  }), [user, isAuthenticated, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};