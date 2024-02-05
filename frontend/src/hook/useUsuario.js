import { useContext, useEffect, useState } from "react";
import { getUserService } from "../services/gestionUserServices";
import { AuthContext } from "../context/AuthContext";

export const useUsuario = () => {
  const { token } = useContext(AuthContext);
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendUsuario = async () => {
      try {
        setLoading(true);

        const data = await getUserService(token);
        setUsuario(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    sendUsuario();
  }, [token]);

  const actualizaUsuario = (usuarioData) => {
    setUsuario(usuarioData);
  };

  return {
    actualizaUsuario,
    error,
    usuario,
    loading,
  };
};
