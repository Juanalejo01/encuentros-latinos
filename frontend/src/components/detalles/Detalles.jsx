import { BannerGeneral } from "../general/BannerGeneral";
import { Button } from "../general/Button";
import { FaRegClock, FaShapes, FaLocationArrow, FaCity, FaFlag } from "react-icons/fa";

export const Detalles = ({ datos }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.foto}`;
  const avatarUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.avatar}`;
  const inscritoUrl = `${import.meta.env.VITE_APP_BACKEND}/`;

  return (
    <section className="layout__detalles">
      <header className="detalles__header">
        <h2 className="detalles__title">{datos.evento.titulo}</h2>
      </header>
      <div className="detalles__content">
        <div className="content__dleft">
          <div className="detalles__container-img">
            <img className="detalles__imagen" src={imagenUrl} alt={datos.evento.titulo} />
          </div>
          <div className="detalles__author">
            <h3 className="author__title">Organizador: </h3>
            <p className="author__nombre">
              {datos.evento.nombre} {datos.evento.apellidos}
            </p>
            <img className="author__imagen" src={avatarUrl} alt={datos.evento.nombre} />
          </div>
        </div>

        <div className="content__dmiddle">
          <div className="detalles__description">
            <h3 className="detalles__subtitle">Detalles:</h3>
            <p className="detalles__descripcion">{datos.evento.descripcion}</p>
          </div>
          <div className="detalles__tags">
            <div className="detalles__tag-cuando">
              <span className="detalles__tag-fecha">
                <FaRegClock /> {new Date(datos.evento.fecha_hora).toLocaleString()}
              </span>
              <span className="detalles__tag-tematica">
                <FaShapes /> {datos.evento.tematica}
              </span>
            </div>

            <div className="detalles__tag-ubicacion">
              <span className="detalles__tag-pais">
                <FaFlag /> {datos.evento.pais}
              </span>
              <span className="detalles__tag-ciudad">
                <FaCity /> {datos.evento.ciudad}
              </span>
              <span className="detalles__tag-localizacion">
                <FaLocationArrow /> {datos.evento.localizacion}
              </span>
            </div>
          </div>
        </div>

        <div className="content__dright">
          <div className="detalles__inscritos">
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
              <p className="inscritos__lista inscritos__vacio">
                {" "}
                No hay nadie inscrito a este evento...
              </p>
            )}
          </div>
          <div className="inscritos__footer">
            <Button
              texto={"Asistir"}
              onClick={() => alert("¡Botón clicado!")}
              className={"detalles__btn"}
            />
            <span className="inscritos__total">Nº de asistentes: {datos.total}</span>
          </div>
        </div>
      </div>

      <BannerGeneral />
    </section>
  );
};
