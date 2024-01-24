import { useEffect, useState } from "react";
import { getAllEventosByUserService } from "../services/eventosServices";

export const usePrivateEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MDg4NjgyLCJleHAiOjE3MDYxNzUwODJ9.F10Dt2536RsOEdK_olCyYDCvcW369bESgRWKTmVgQ8U";

  useEffect(() => {
    const loadEventos = async () => {
      try {
        setLoading(true);

        const data = await getAllEventosByUserService(token);

        setEventos(data);
      } catch (error) {
        setError(error.mensaje);
      } finally {
        setLoading(false);
      }
    };

    loadEventos();
  }, []);

  return { eventos, loading, error };
};
