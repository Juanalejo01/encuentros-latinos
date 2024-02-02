import { PrivateEventosList } from "../components/private/PrivateEventosList";
import { usePrivateEventos } from "../hook/usePrivateEventos";
import { useState } from "react";
import { toast } from "sonner";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";

import "../css/eventos/misEventos.css";

export const MisEventosPage = () => {
  const { eventos, loading, error, token, removeEvento } = usePrivateEventos();
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
        <div className="spinner"></div>
      </div>
    );
  if (error) return toast.error(error);

  return (
    <section className="layout__private-eventos">
      <header className="private-eventos__header">
        <h2 className="private-eventos__title">Lista de Eventos (Total: {eventos.total})</h2>
      </header>
      <div className="private-eventos__content">
        {eventos.total !== 0 ? (
          eventosPaginaActual.map((evento) => (
            <div className="private-eventos__item" key={evento.id}>
              <PrivateEventosList evento={evento} removeEvento={removeEvento} token={token} />
            </div>
          ))
        ) : (
          <p className="private-eventos__mensaje">No tienes ningún evento creado aún.</p>
        )}
        {eventos.total !== 0 ? (
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
      </div>
    </section>
  );
};
