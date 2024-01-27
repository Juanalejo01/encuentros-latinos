import { useParams } from "react-router-dom";
import { FormularioEvento } from "../components/private/FormularioEvento";
import { usePrivateEvento } from "../hook/usePrivateEvento";
import { useUpdateEvento } from "../hook/useUpdateEvento";

export const EditarEventosPage = () => {
  const { id } = useParams();
  const { evento, loading, error } = usePrivateEvento(id);
  const { fallo, setClicked, setFallo, setEventoModificado } = useUpdateEvento(id);

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const imagen = data.get("imagen");

    if (imagen && imagen.size === 0) {
      setFallo("Debes adjuntar una imagen.");
      return;
    }

    setClicked(true);
    setEventoModificado(data);
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
      {error ? <p>{error}</p> : null}
      {fallo ? <p>{fallo}</p> : null}
    </section>
  );
};
