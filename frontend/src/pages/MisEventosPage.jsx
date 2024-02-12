import { PrivateEventosList } from "../components/private/PrivateEventosList";
import { usePrivateEventos } from "../hook/usePrivateEventos";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaChevronRight, FaChevronLeft, FaBan } from "react-icons/fa";
import ReactPaginate from "react-paginate";

import "../css/eventos/misEventos.css";

export const MisEventosPage = () => {
  const { eventos, loading, error, token, removeEvento } = usePrivateEventos();
  const [paginaActual, setPaginaActual] = useState(0);

  const [eventosPorPagina, setEventosPorPagina] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1475) {
        setEventosPorPagina(3);
      } else {
        setEventosPorPagina(6);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <h2 className="private-eventos__title">Lista de Eventos (Total: {eventos.total})</h2>
      </header>
      <ul className="private-eventos__content">
        {eventos.total !== 0 ? (
          eventosPaginaActual.map((evento) => (
            <li className="private-eventos__item" key={evento.id}>
              <PrivateEventosList
                evento={evento}
                removeEvento={removeEvento}
                token={token}
                opcion={"Eventos"}
              />
            </li>
          ))
        ) : (
          <p className="private-eventos__mensaje">
            <FaBan className="private-eventos__icono-faban" />
            No tienes ningún evento creado.
          </p>
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
