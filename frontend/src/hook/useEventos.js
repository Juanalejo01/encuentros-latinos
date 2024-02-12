import { useEffect, useState } from "react";
import { getAllEventosService } from "../services/eventosServices";
import { useSearchParams } from "react-router-dom";

export const useEventos = () => {
  const [searchParams] = useSearchParams();
  const [tematica, setTematica] = useState(searchParams.get("tematica") || "");
  const [ciudad, setCiudad] = useState(searchParams.get("ciudad") || "");
  const [ordenar, setOrdenar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchParams) {
      setTematica(searchParams.get("tematica"));
      setCiudad(searchParams.get("ciudad"));
    }
  }, [searchParams]);

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

  return { setCiudad, setTematica, setOrdenar, eventos, loading, error };
};
