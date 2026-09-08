import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    api
      .get("/auth/me/")
      .then((response) => {
        setUser(response.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        delete api.defaults.headers.common.Authorization;

        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login/", {
      email,
      password,
    });

    const { access, refresh } = response.data;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    api.defaults.headers.common.Authorization = `Bearer ${access}`;

    const userResponse = await api.get("/auth/me/");

    setUser(userResponse.data);
    setIsAuthenticated(true);

    return userResponse.data;
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    delete api.defaults.headers.common.Authorization;

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}