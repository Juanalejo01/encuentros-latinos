import { PrivateEventosList } from "../components/private/PrivateEventosList";
import { usePrivateSuscripciones } from "../hook/usePrivateSuscipciones";
import { useState } from "react";
import { toast } from "sonner";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";

import "../css/eventos/misEventos.css";

export const MisSuscripcionesPage = () => {
  const { eventos, loading, error, token, removeSuscripcion } = usePrivateSuscripciones();
  const [paginaActual, setPaginaActual] = useState(0);

  const eventosPorPagina = 6;

  const handlePageChange = ({ selected }) => {
    setPaginaActual(selected);
  };

  const indiceInicial = paginaActual * eventosPorPagina;
  const indiceFinal = indiceInicial + eventosPorPagina;
  const eventosPaginaActual = eventos.total
    ? eventos.datos.slice(indiceInicial, indiceFinal)
    : null;

  if (loading)
    return (
      <div className="spinner__container-private">
        <span className="spinner"></span>
      </div>
    );
  if (error) return toast.error(error);

  return (
    <section className="layout__private-eventos">
      <header className="private-eventos__header">
        <h2 className="private-eventos__title">Lista de Suscripciones (Total: {eventos.total})</h2>
      </header>
      <ul className="private-eventos__content">
        {eventos.total !== 0 ? (
          eventosPaginaActual.map((evento) => (
            <li className="private-eventos__item" key={evento.id}>
              <PrivateEventosList
                evento={evento}
                removeEvento={removeSuscripcion}
                token={token}
                opcion={"Suscripcion"}
              />
            </li>
          ))
        ) : (
          <p className="private-eventos__mensaje">No tienes ningún evento creado aún.</p>
        )}
        {eventos.total > 6 ? (
          <ReactPaginate
            previousLabel={<FaChevronLeft className="icono__anterior" title="Anterior" />}
            nextLabel={<FaChevronRight className="icono__siguiente" title="Siguiente" />}
            breakLabel={"..."}
            pageCount={Math.ceil(eventos.datos.length / eventosPorPagina)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active__pagination"}
          />
        ) : null}
      </ul>
    </section>
  );
};
