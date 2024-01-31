import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import { BannerGeneral } from "../components/general/BannerGeneral";
import { PaginaNoFound } from "./PaginaNoFound";

import "../css/eventos/eventosPage.css";

export const EventosPage = () => {
  const { eventos, loading, error } = useEventos();

  if (loading)
    return (
      <p className="spinner__eventos">
        <div className="spinner"></div>
      </p>
    );

  if (error) return <PaginaNoFound />;
  return (
    <main className="layout__eventos">
      <header className="eventos__header">
        <h1 className="eventos__title">Listado de eventos</h1>
      </header>

      <EventosList eventos={eventos} />

      <BannerGeneral />
    </main>
  );
};
