import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import { BannerGeneral } from "../components/general/BannerGeneral";

import "../css/eventos/eventosPage.css";

export const EventosPage = () => {
  const { eventos, loading, error } = useEventos();

  if (loading)
    return (
      <p className="spinner__eventos">
        <div className="spinner"></div>
      </p>
    );
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
