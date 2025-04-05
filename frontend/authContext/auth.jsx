import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios_Node } from "../src/Axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartSize, setCartSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await Axios_Node.get("/logout");
    setUser(null);
    setCartSize(0);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, cartSize, setCartSize, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
