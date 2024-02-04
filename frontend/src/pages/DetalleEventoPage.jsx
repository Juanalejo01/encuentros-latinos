import { useParams } from "react-router-dom";
import { useEvento } from "../hook/useEvento";
import { Detalles } from "../components/detalles/Detalles";
import { PaginaNoFound } from "./PaginaNoFound";

import "../css/detalles/detalles.css";

export const DetalleEventoPage = () => {
  const { id } = useParams();

  const { datos, loading, error, removeListado, addListado } = useEvento(id);

  if (loading)
    return (
      <div className="spinner__evento">
        <span className="spinner"></span>
      </div>
    );
  if (error) return <PaginaNoFound />;

  return <Detalles datos={datos} removeListado={removeListado} addListado={addListado} />;
};
