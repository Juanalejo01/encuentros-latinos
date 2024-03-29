import { useParams } from "react-router-dom";
import { useEvento } from "../hook/useEvento";
import { Detalles } from "../components/detalles/Detalles";
import { PaginaNoFound } from "./PaginaNoFound";

import "../css/detalles/detalles.css";
import { BannerGeneral } from "../components/general/BannerGeneral";

export const DetalleEventoPage = () => {
  const { id } = useParams();

  const { datos, loading, error, removeListado, addListado } = useEvento(id);

  if (error) return <PaginaNoFound />;

  return (
    <main className="layout__detalles">
      {loading ? (
        <div className="spinner__evento">
          <span className="spinner"></span>
        </div>
      ) : (
        <Detalles datos={datos} removeListado={removeListado} addListado={addListado} />
      )}

      <BannerGeneral />
    </main>
  );
};
