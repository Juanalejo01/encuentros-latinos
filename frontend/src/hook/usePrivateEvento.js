import { useEffect, useState } from "react";
import { getEventoByUserService } from "../services/eventosServices";

export const usePrivateEvento = (id) => {
  const [evento, setEvento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MzQ5MDQyLCJleHAiOjE3MDY0MzU0NDJ9.8EvKdaYV-ABxUsTZohR8EoLxXA0oBW-HHQsgbvS-YKM";

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
  }, [id]);

  return { evento, loading, error };
};
