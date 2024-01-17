import { useEffect, useState } from "react";
import { getAllEventosService } from "../services/eventosServices";

export const useEventos = () => {
  const [tematica, setTematica] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEventos = async () => {
      try {
        setLoading(true);

        const data = await getAllEventosService(tematica, ciudad);

        setEventos(data);
      } catch (error) {
        setError(error.mensaje);
      } finally {
        setLoading(false);
      }
    };

    loadEventos();
  }, [tematica, ciudad]);

  return { setTematica, setCiudad, eventos, loading, error };
};
