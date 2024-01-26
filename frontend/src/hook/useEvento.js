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

        const data = await getEventoService(id);

        setDatos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvento();
  }, [id]);

  const addListado = (datos) => {
    setDatos([...datos.listado, datos.listado]);
  };

  const removeListado = (id) => {
    setDatos((prevEventos) => {
      const updatedEventos = prevEventos.listado.filter((evento) => evento.id !== id);
      return {
        ...prevEventos,
        listado: updatedEventos,
      };
    });
  };

  return { datos, loading, error, removeListado, addListado };
};
