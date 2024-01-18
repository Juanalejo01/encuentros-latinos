import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import "../css/eventos/eventosPage.css";

export const EventosPage = () => {
  const { eventos, loading, error } = useEventos();

  if (loading) return <p>cargando evento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="layout__eventos">
      <h1 className="eventos__title">Listado de eventos</h1>

      <EventosList eventos={eventos} />
    </section>
  );
};
