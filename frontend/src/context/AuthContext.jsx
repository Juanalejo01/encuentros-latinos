import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedId = localStorage.getItem("Id");

  const [token, setToken] = useState(storedToken || " ");
  const [usuarioId, setUsuarioId] = useState(storedId || null);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("Id", usuarioId);

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
  }, [token, usuarioId]);

  const logoutHandler = () => {
    localStorage.removeItem(storedToken);
    localStorage.removeItem(storedId);

    setUsuarioId(null);
    return setToken(" ");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, usuarioId, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
