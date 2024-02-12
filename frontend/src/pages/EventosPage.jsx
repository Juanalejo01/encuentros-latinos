import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import { BannerGeneral } from "../components/general/BannerGeneral";
import { PaginaNoFound } from "./PaginaNoFound";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";

import "../css/eventos/eventosPage.css";

export const EventosPage = () => {
  const { eventos, loading, error, setOrdenar } = useEventos();
  const [clickeado, setClickeado] = useState(false);

  const handleClickSi = () => {
    setOrdenar(true);
    setClickeado(true);
  };

  const handleClickNo = () => {
    setOrdenar(false);
    setClickeado(false);
  };

  return (
    <main className="layout__eventos">
      <header className="eventos__header">
        <h2 className="eventos__title">
          Listado de eventos <span className="eventos__title-total">(Total: {eventos.length})</span>
        </h2>

        {eventos.length > 1 ? (
          <div className="ordenar__inscritos">
            <h3 className="ordenar__title">
              Ordenado Por <FaUserFriends />
            </h3>
            <button
              onClick={handleClickSi}
              className={`ordenar__btn ${clickeado ? "active__ordenar" : ""}`}
            >
              <span className={`${clickeado ? "cambiar__escala" : ""}`}>Sí</span>
            </button>
            <button
              onClick={handleClickNo}
              className={`ordenar__btn ${!clickeado ? "active__ordenar" : ""}`}
            >
              <span className={!clickeado ? "cambiar__escala" : ""}>No</span>
            </button>
          </div>
        ) : null}
      </header>

      {loading ? (
        <div className="spinner__container">
          <span className="spinner"></span>
        </div>
      ) : error ? (
        <PaginaNoFound />
      ) : eventos.length ? (
        <EventosList eventos={eventos} />
      ) : (
        <h2 className="eventos__mensaje">
          ¡Vaya! No hay eventos disponibles en este momento o que coincidan con tu búsqueda...
        </h2>
      )}

      <BannerGeneral />
    </main>
  );
};
