import { useParams } from "react-router-dom";
import { FormularioEvento } from "../components/private/FormularioEvento";
import { usePrivateEvento } from "../hook/usePrivateEvento";
import { useUpdateEvento } from "../hook/useUpdateEvento";
import { PaginaNoFound } from "./PaginaNoFound";

export const EditarEventosPage = () => {
  const { id } = useParams();
  const { evento, loading, error } = usePrivateEvento(id);
  const { setClicked, setEventoModificado } = useUpdateEvento(id);

  if (error) {
    return <PaginaNoFound />;
  }

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    setClicked(true);
    setEventoModificado(data);
  };

  return (
    <section className="layout__crear-evento">
      <header className="crear-evento__header">
        <h2 className="crear-evento__title">Editar Evento</h2>
      </header>
      <div className="crear-evento__formulario">
        <FormularioEvento
          handleForm={handleForm}
          evento={evento}
          accion={"Editar"}
          loading={loading}
        />
      </div>
      {loading ? <p>Cargando datos del evento...</p> : null}
    </section>
  );
};
