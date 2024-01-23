import { Button } from "../components/general/Button";
import { FormularioEvento } from "../components/private/FormularioEvento";

export const EditarEventosPage = () => {
  return (
    <section className="layout__crear-evento">
      <header className="crear-evento__header">
        <h1 className="crear-evento__title">Crear Evento</h1>
      </header>
      <div className="crear-evento__formulario">
        <FormularioEvento />
      </div>
      <div className="crear-evento__boton">
        <Button
          texto={"Crear"}
          onClick={() => alert("¡Botón clicado!")}
          className={"crear-evento__btn"}
        />
      </div>
    </section>
  );
};
