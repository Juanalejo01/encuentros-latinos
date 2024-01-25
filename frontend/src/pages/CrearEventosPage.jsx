import { FormularioEvento } from "../components/private/FormularioEvento";
import { useCreateEvento } from "../hook/useCreateEvento";

export const CrearEventosPage = () => {
  const { sending, error, setClicked, setError, setEvento } = useCreateEvento();

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const imagen = data.get("imagen");

    if (imagen && imagen.size === 0) {
      setError("Debes adjuntar una imagen.");
      return;
    }

    setClicked(true);
    setEvento(data);
  };

  return (
    <section className="layout__crear-evento">
      <header className="crear-evento__header">
        <h1 className="crear-evento__title">Crear Evento</h1>
      </header>
      <div className="crear-evento__formulario">
        <FormularioEvento handleForm={handleForm} accion={"Crear"} />
      </div>
      {sending ? <p>Creando nuevo evento...</p> : null}
      {error ? <p>{error}</p> : null}
    </section>
  );
};
