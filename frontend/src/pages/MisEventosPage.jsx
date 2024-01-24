import { PrivateEventosList } from "../components/private/PrivateEventosList";
import { usePrivateEventos } from "../hook/usePrivateEventos";

export const MisEventosPage = () => {
  const { eventos, loading, error } = usePrivateEventos();

  if (loading) return <p>cargando evento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="layout__private-eventos">
      <header className="private-eventos__header">
        <h1 className="private-eventos__title">Lista de Eventos (Total: {eventos.total})</h1>
      </header>
      {eventos.total !== 0 ? (
        eventos.datos.map((evento) => (
          <div className="private-eventos__item" key={evento.id}>
            <PrivateEventosList evento={evento} />
          </div>
        ))
      ) : (
        <p className="private-eventos__mensaje">No tienes ningún evento creado aún.</p>
      )}
    </section>
  );
};
