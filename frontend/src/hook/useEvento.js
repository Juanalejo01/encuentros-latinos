import { useEffect, useState } from "react";
import { getEventoService } from "../services/eventosServices";

export const useEvento = (id) => {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvento = async () => {
      try {
        setLoading(true);

        const data = await getEventoService(id);

        setDatos(data);
      } catch (error) {
        setError(error.mensaje);
      } finally {
        setLoading(false);
      }
    };

    loadEvento();
  }, [id]);

  return { datos, loading, error };
};
