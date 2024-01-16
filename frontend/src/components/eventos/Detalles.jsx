import { Button } from "../general/Button";

export const Detalles = ({ evento }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.evento.foto}`;
  const avatarUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.evento.avatar}`;

  return (
    <section className="layout__detalles">
      <h2 className="detalles__title">{evento.evento.titulo}</h2>
      <div className="detalles__container-img">
        <img className="detalles__imagen" src={imagenUrl} alt={evento.evento.titulo} />
      </div>
      <div className="detalles__content">
        <h3>Descripción:</h3>
        <p className="detalles__descripcion">{evento.evento.descripcion}</p>

        <div className="detalles__tags">
          <span className="detalles__tag">Tematica: {evento.evento.tematica}</span>
          <span className="detalles__tag">Ciudad: {evento.evento.ciudad}</span>
          <span className="detalles__tag">
            Fecha: {new Date(evento.evento.fecha_hora).toLocaleString()}
          </span>
        </div>
        <div className="detalles__author">
          <img className="author__imagen" src={avatarUrl} alt={evento.evento.nombre} />
          <p className="author__nombre">
            Nombre completo del autor: {evento.evento.nombre} {evento.evento.apellidos}
          </p>
        </div>
      </div>
      <div className="detalles__inscritos">
        <span className="inscritos__total">Total de inscritos:{evento.total}</span>
        <h4>Lista de inscritos:</h4>
        <ul className="inscritos__lista">
          <li className="inscritos__item">{evento.listado.nombre}</li>
        </ul>
      </div>
      <Button
        texto={"Inscribirse"}
        onClick={() => alert("¡Botón clicado!")}
        className={"detalles__btn"}
      />
    </section>
  );
};
