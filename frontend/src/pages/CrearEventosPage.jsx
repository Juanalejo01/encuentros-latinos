import { FormularioEvento } from "../components/private/FormularioEvento";
import { useCreateEvento } from "../hook/useCreateEvento";
import { toast } from "sonner";

import "../css/eventos/crearEventos.css";

export const CrearEventosPage = () => {
  const { sending, setClicked, setEvento } = useCreateEvento();

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const imagen = data.get("imagen");

    if (imagen && imagen.size === 0) {
      toast.error("Debes adjuntar una imagen.");
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
    </section>
  );
};
