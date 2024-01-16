import { useParams } from "react-router-dom";
import { useEvento } from "../hook/useEvento";
import { Detalles } from "../components/eventos/Detalles";

export const DetalleEventoPage = () => {
  const { id } = useParams();

  const { evento, loading, error } = useEvento(id);

  if (loading) return <p>cargando evento...</p>;
  if (error) return <p>{error}</p>;

  return <Detalles className="evento__detalles" evento={evento} />;
};
