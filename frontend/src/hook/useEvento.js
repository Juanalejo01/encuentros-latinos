import { useEffect, useState } from "react";
import { getEventoService } from "../services/eventosServices";

export const useEvento = (id) => {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvento = async () => {
      try {
        setLoading(true);

        if (id) {
          const data = await getEventoService(id);
          setDatos(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvento();
  }, [id]);

  const addListado = (nuevoUsuario) => {
    setDatos((prevEventos) => {
      return {
        ...prevEventos,
        listado: [nuevoUsuario, ...prevEventos.listado],
        total: prevEventos.total + 1, // Incrementar el total de usuarios
      };
    });
  };

  const removeListado = (id) => {
    setDatos((prevEventos) => {
      const updatedEventos = prevEventos.listado.filter((listado) => listado.id !== id);
      return {
        ...prevEventos,
        listado: updatedEventos,
        total: updatedEventos.length,
      };
    });
  };

  return { datos, loading, error, addListado, removeListado };
};
