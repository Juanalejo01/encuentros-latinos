import { useEffect, useState } from "react";
import { getAllEventosByUserService } from "../services/eventosServices";

export const usePrivateEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MzQ5MDQyLCJleHAiOjE3MDY0MzU0NDJ9.8EvKdaYV-ABxUsTZohR8EoLxXA0oBW-HHQsgbvS-YKM";

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

  const removeEvento = (id) => {
    setEventos((prevEventos) => {
      const updatedEventos = prevEventos.datos.filter((evento) => evento.id !== id);
      return {
        ...prevEventos,
        datos: updatedEventos,
        total: updatedEventos.length,
      };
    });
  };

  return { eventos, loading, error, setEventos, removeEvento, token };
};
