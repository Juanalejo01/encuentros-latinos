import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedId = localStorage.getItem("Id");
  const storedAvatar = localStorage.getItem("avatar");

  const [token, setToken] = useState(storedToken || " ");
  const [usuarioId, setUsuarioId] = useState(storedId || null);
  const [avatar, setAvatar] = useState(storedAvatar || null);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("Id", usuarioId);
    localStorage.setItem("avatar", avatar);

    if (token !== " ") {
      try {
        const decodedToken = jwtDecode(token);
        setUsuarioId(decodedToken.id);
      } catch (error) {
        toast.error("Error decodificando token:", error);
        setUsuarioId(null);
      }
    } else {
      setUsuarioId(null);
    }
  }, [token, usuarioId, avatar]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    localStorage.removeItem("avatar");

    setUsuarioId(null);
    return setToken(" ");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, usuarioId, logoutHandler, avatar, setAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};
