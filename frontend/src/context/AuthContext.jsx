import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedId = localStorage.getItem("Id");
  const storedAvatar = localStorage.getItem("avatar");
  const storedNombre = localStorage.getItem("nombre");

  const [token, setToken] = useState(storedToken || " ");
  const [usuarioId, setUsuarioId] = useState(storedId || null);
  const [avatar, setAvatar] = useState(storedAvatar || null);
  const [nombre, setNombre] = useState(storedNombre || null);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("Id", usuarioId);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("nombre", nombre);

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
  }, [token, usuarioId, avatar, nombre]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    localStorage.removeItem("avatar");
    localStorage.removeItem("nombre");
    localStorage.removeItem("tematica");
    localStorage.removeItem("ciudad");

    setUsuarioId(null);
    setAvatar(null);
    setNombre(null);
    return setToken(" ");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        usuarioId,
        logoutHandler,
        avatar,
        setAvatar,
        nombre,
        setNombre,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
