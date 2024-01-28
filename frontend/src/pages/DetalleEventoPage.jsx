import { useParams } from "react-router-dom";
import { useEvento } from "../hook/useEvento";
import { Detalles } from "../components/detalles/Detalles";

import "../css/detalles/detalles.css";
import { PaginaNoFound } from "./PaginaNoFound";

export const DetalleEventoPage = () => {
  const { id } = useParams();

  const { datos, loading, error, removeListado, addListado } = useEvento(id);

  if (loading) return <p>cargando evento...</p>;
  if (error) return <PaginaNoFound />;

  return <Detalles datos={datos} removeListado={removeListado} addListado={addListado} />;
};
