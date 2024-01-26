import { useEffect, useState } from "react";
import { getAllEventosByUserService } from "../services/eventosServices";

export const usePrivateEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MjYyMTIyLCJleHAiOjE3MDYzNDg1MjJ9.xv2gqvDlfs9Q03owhlYLHyI_ZMKoiDVx-lBN_Z8-drQ";

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
