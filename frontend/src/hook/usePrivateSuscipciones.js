import { useContext, useEffect, useState } from "react";
import { getAllSuscripcionesByUserService } from "../services/eventosServices";
import { AuthContext } from "../context/AuthContext";

export const usePrivateSuscripciones = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadEventos = async () => {
      try {
        setLoading(true);

        const data = await getAllSuscripcionesByUserService(token);

        setEventos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEventos();
  }, [token]);

  const removeSuscripcion = (id) => {
    setEventos((prevEventos) => {
      const updatedEventos = prevEventos.datos.filter((evento) => evento.id !== id);
      return {
        ...prevEventos,
        datos: updatedEventos,
        total: updatedEventos.length,
      };
    });
  };

  return { eventos, loading, error, setEventos, removeSuscripcion, token };
};
