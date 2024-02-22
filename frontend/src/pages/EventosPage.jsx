import { EventosList } from "../components/eventos/EventosList";
import { useEventos } from "../hook/useEventos";
import { BannerGeneral } from "../components/general/BannerGeneral";
import { useState } from "react";

import "../css/eventos/eventosPage.css";

export const EventosPage = ({ tematicaHeader, ciudadHeader }) => {
  const { eventos, loading, error, setOrdenar } = useEventos();
  const [orden, setOrden] = useState("recientes");

  const handleChangeOrden = (e) => {
    setOrden(e.target.value);

    // Actualizar ordenamiento
    if (e.target.value === "asistentes") {
      setOrdenar(true);
    } else {
      setOrdenar(false);
    }
  };

  return (
    <main className="layout__eventos">
      <header className="eventos__header">
        <h2 className="eventos__title">
          {!tematicaHeader && !ciudadHeader ? "Todos los eventos" : "Eventos"}
          {tematicaHeader ? ` de ${tematicaHeader}` : null}
          {ciudadHeader ? ` cerca de ${ciudadHeader}` : null}
        </h2>

        {eventos.length > 1 ? (
          <div className="ordenar__inscritos">
            <h3 className="ordenar__title">Ordenado por</h3>
            <select value={orden} onChange={handleChangeOrden} className="ordenar__select">
              <option value="recientes">Fecha</option>
              <option value="asistentes">Relevancia</option>
            </select>
          </div>
        ) : null}
      </header>

      {loading ? (
        <div className="spinner__container">
          <span className="spinner"></span>
        </div>
      ) : error ? null : eventos.length ? (
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

/* 

     {!loading ? (
       
             <p className="eventos__title-total">(Total: {eventos.length})</p>
         
        ) : null}

*/
