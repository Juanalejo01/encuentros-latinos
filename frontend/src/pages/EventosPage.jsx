import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import "../css/eventos/eventosPage.css";
import { BannerGeneral } from "../components/general/BannerGeneral";

export const EventosPage = () => {
  const { eventos, loading, error } = useEventos();

  if (loading) return <p className="eventos__cargando">Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="layout__eventos">
      <header className="eventos__header">
        <h1 className="eventos__title">Listado de eventos</h1>
      </header>

      <EventosList eventos={eventos} />

      <BannerGeneral />
    </section>
  );
};
