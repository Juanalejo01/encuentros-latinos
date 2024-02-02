import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import { BannerGeneral } from "../components/general/BannerGeneral";
import { PaginaNoFound } from "./PaginaNoFound";

import "../css/eventos/eventosPage.css";

export const EventosPage = () => {
  const { eventos, loading, error } = useEventos();

  if (loading)
    return (
      <div className="spinner__container">
        <div className="spinner"></div>
      </div>
    );

  if (error) return <PaginaNoFound />;
  return (
    <main className="layout__eventos">
      <header className="eventos__header">
        <h2 className="eventos__title">Listado de eventos</h2>
      </header>

      <EventosList eventos={eventos} />

      <BannerGeneral />
    </main>
  );
};
