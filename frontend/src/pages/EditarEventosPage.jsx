import { FormularioEvento } from "../components/private/FormularioEvento";

export const EditarEventosPage = () => {
  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <section className="layout__crear-evento">
      <header className="crear-evento__header">
        <h1 className="crear-evento__title">Crear Evento</h1>
      </header>
      <div className="crear-evento__formulario">
        <FormularioEvento handleForm={handleForm} accion={"Editar"} />
      </div>
    </section>
  );
};
