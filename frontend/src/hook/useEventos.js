import { useEffect, useState } from "react";
import { getAllEventosService } from "../services/eventosServices";

export const useEventos = () => {
  const [tematica, setTematica] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [ordenar, setOrdenar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEventos = async () => {
      try {
        setLoading(true);
        const data = await getAllEventosService(tematica, ciudad, ordenar);

        setEventos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEventos();
  }, [tematica, ciudad, ordenar]);

  return { setTematica, setCiudad, setOrdenar, eventos, loading, error };
};
