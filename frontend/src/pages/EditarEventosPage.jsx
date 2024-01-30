import { useParams } from "react-router-dom";
import { FormularioEvento } from "../components/private/FormularioEvento";
import { usePrivateEvento } from "../hook/usePrivateEvento";
import { useUpdateEvento } from "../hook/useUpdateEvento";
import { PaginaNoFound } from "./PaginaNoFound";
import { toast } from "sonner";

export const EditarEventosPage = () => {
  const { id } = useParams();
  const { evento, loading, error } = usePrivateEvento(id);
  const { fallo, setClicked, setEventoModificado } = useUpdateEvento(id);

  if (error) {
    return <PaginaNoFound />;
  }

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    setClicked(true);
    setEventoModificado(data);
    toast.error(fallo);
  };

  return (
    <section className="layout__crear-evento">
      <header className="crear-evento__header">
        <h1 className="crear-evento__title">Crear Evento</h1>
      </header>
      <div className="crear-evento__formulario">
        <FormularioEvento handleForm={handleForm} evento={evento} accion={"Editar"} />
      </div>
      {loading ? <p>Cargando datos del evento...</p> : null}
    </section>
  );
};
