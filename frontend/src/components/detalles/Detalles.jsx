import { Button } from "../general/Button";

export const Detalles = ({ datos }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.foto}`;
  const avatarUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.avatar}`;
  const inscritoUrl = `${import.meta.env.VITE_APP_BACKEND}/`;

  return (
    <section className="layout__detalles">
      <h2 className="detalles__title">{datos.evento.titulo}</h2>
      <div className="detalles__container-img">
        <img className="detalles__imagen" src={imagenUrl} alt={datos.evento.titulo} />
      </div>
      <div className="detalles__content">
        <h3>Descripción:</h3>
        <p className="detalles__descripcion">{datos.evento.descripcion}</p>

        <div className="detalles__tags">
          <span className="detalles__tag">Tematica: {datos.evento.tematica}</span>
          <span className="detalles__tag">Ciudad: {datos.evento.ciudad}</span>
          <span className="detalles__tag">
            Fecha: {new Date(datos.evento.fecha_hora).toLocaleString()}
          </span>
        </div>
        <div className="detalles__author">
          <img className="author__imagen" src={avatarUrl} alt={datos.evento.nombre} />
          <p className="author__nombre">
            Organizador: {datos.evento.nombre} {datos.evento.apellidos}
          </p>
        </div>
      </div>
      <div className="detalles__inscritos">
        <span className="inscritos__total">Nº de asistentes:{datos.total}</span>
        <h4 className="inscritos__title">Lista de asistentes:</h4>

        {datos.listado.length ? (
          <ul className="inscritos__lista">
            {datos.listado.map((inscrito) => (
              <li className="inscritos__item" key={inscrito.id}>
                <img
                  className="item__avatar"
                  src={inscritoUrl + inscrito.avatar}
                  alt={inscrito.nombre}
                />
                <p className="item__nombre">
                  {inscrito.nombre} {inscrito.apellidos}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay nadie inscrito a este evento</p>
        )}
      </div>
      <Button
        texto={"Inscribirse"}
        onClick={() => alert("¡Botón clicado!")}
        className={"detalles__btn"}
      />
    </section>
  );
};

/* 

 <ul className="inscritos__lista">
          <li className="inscritos__item">{datos.listado.nombre}</li>
        </ul>

 {datos.listado.length ? (
        <ul className="eventos__list">
          {eventos.map((evento) => (
            <li className="eventos__item" key={evento.id}>
              <Link className="eventos__link" to={`/evento/${evento.id}`}>
                <Evento evento={evento} />
              </Link>
            </li>
          ))}
        </ul>
        ) : (<p className="eventos__mensaje">No hay eventos en este momento para mostrar</p>
        );}

*/
