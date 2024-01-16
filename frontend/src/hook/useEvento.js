import { useEffect, useState } from "react";
import { getEventoService } from "../services/eventosServices";

export const useEvento = (id) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvento = async () => {
      try {
        setLoading(true);

        const data = await getEventoService(id);

        setEvento(data);
      } catch (error) {
        setError(error.mensaje);
      } finally {
        setLoading(false);
      }
    };

    loadEvento();
  }, [id]);

  return { evento, loading, error };
};
