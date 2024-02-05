import { useEffect, useState } from "react";
import { getAllEventosService } from "../services/eventosServices";

export const useEventos = () => {
  const storedTematica = localStorage.getItem("tematica");
  const storedCiudad = localStorage.getItem("ciudad");

  const [tematica, setTematica] = useState(storedTematica || "");
  const [ciudad, setCiudad] = useState(storedCiudad || "");
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

  const actualizarBusqueda = (nuevaTematica, nuevaCiudad) => {
    setTematica(nuevaTematica);
    setCiudad(nuevaCiudad);
  };

  return { actualizarBusqueda, setCiudad, setTematica, setOrdenar, eventos, loading, error };
};
