import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import { BannerGeneral } from "../components/general/BannerGeneral";
import { PaginaNoFound } from "./PaginaNoFound";
import { FaUserFriends } from "react-icons/fa";

import "../css/eventos/eventosPage.css";
import { useState } from "react";

export const EventosPage = () => {
  const { eventos, loading, error, setOrdenar } = useEventos();
  const [clickeado, setClickeado] = useState(false);

  if (loading)
    return (
      <div className="spinner__container">
        <span className="spinner"></span>
      </div>
    );

  if (error) return <PaginaNoFound />;

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
        <h2 className="eventos__title">Listado de eventos</h2>
        <div className="ordenar__inscritos">
          <h3 className="ordenar__title">
            Ordenar Por <FaUserFriends />
          </h3>
          <button
            onClick={handleClickSi}
            className={`ordenar__btn ${clickeado ? "active__ordenar" : ""}`}
          >
            Sí
          </button>
          <button
            onClick={handleClickNo}
            className={`ordenar__btn ${!clickeado ? "active__ordenar" : ""}`}
          >
            No
          </button>
        </div>
      </header>

      <EventosList eventos={eventos} />

      <BannerGeneral />
    </main>
  );
};
