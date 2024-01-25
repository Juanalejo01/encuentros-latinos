import { useEffect, useState } from "react";
import { getAllEventosByUserService } from "../services/eventosServices";

export const usePrivateEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MTc3NDkxLCJleHAiOjE3MDYyNjM4OTF9.tpR_1noCyu3zzoLue-9Jq3sbYilt8UboTcgNo8QRh-g";

  useEffect(() => {
    const loadEventos = async () => {
      try {
        setLoading(true);

        const data = await getAllEventosByUserService(token);

        setEventos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEventos();
  }, []);

  return { eventos, loading, error };
};
