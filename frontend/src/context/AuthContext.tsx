// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { setAuthToken } from "../api/axiosInstance";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = (token: string | null) => {
    setTokenState(token);
    setAuthToken(token); // Configura el token en Axios
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
