import { useEffect, useState } from "react";
import { getEventoByUserService } from "../services/eventosServices";
import { useToken } from "../services/useToken";

export const usePrivateEvento = (id) => {
  const [evento, setEvento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useToken();

  useEffect(() => {
    const loadEvento = async () => {
      try {
        setLoading(true);

        const data = await getEventoByUserService(id, token);

        setEvento(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvento();
  }, [id, token]);

  return { evento, loading, error };
};
