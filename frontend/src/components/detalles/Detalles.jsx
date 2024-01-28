import { useState } from "react";
import { altaUsuarioEventoService, bajaUsuarioEventoService } from "../../services/eventosServices";
import { horaFormateada } from "../../services/fechaHoraFormateada";
import { useToken } from "../../services/useToken";
import { BannerGeneral } from "../general/BannerGeneral";
import { Button } from "../general/Button";
import { FaRegClock, FaShapes, FaLocationArrow, FaCity, FaFlag, FaTrashAlt } from "react-icons/fa";

export const Detalles = ({ datos, removeListado, addListado }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.foto}`;
  const avatarUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.avatar}`;
  const inscritoUrl = `${import.meta.env.VITE_APP_BACKEND}/`;
  const { token } = useToken();
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEliminarInscripcion = async (eventoId, id) => {
    try {
      setLoading(true);

      if (error) {
        setError("");
      }

      const texto = await bajaUsuarioEventoService(eventoId, token);

      removeListado(id);
      setTexto(texto);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInscripcion = async (eventoId) => {
    try {
      setLoading(true);

      if (error) {
        setError("");
      }

      const dato = await altaUsuarioEventoService(eventoId, token);

      addListado(dato.usuario);
      setTexto(dato.mensaje);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
                <FaRegClock /> {horaFormateada(datos.evento.fecha_hora)} h
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
            {texto ? <p>{texto}</p> : null}
            {error ? <p>{error}</p> : null}
            {datos.total !== 0 ? (
              <ul className="inscritos__lista">
                {loading ? <p>Cargando listado...</p> : null}

                {datos.listado.map((inscrito, index) => (
                  <li className="inscritos__item" key={index}>
                    <div className="item__usuario">
                      <img
                        className="item__avatar"
                        src={inscritoUrl + inscrito.avatar}
                        alt={inscrito.nombre}
                      />
                      <p className="item__nombre">
                        {inscrito.nombre} {inscrito.apellidos}
                      </p>
                    </div>
                    <div className="item__eliminar">
                      <FaTrashAlt
                        className="eliminar__inscrito"
                        onClick={() => handleEliminarInscripcion(datos.evento.id, inscrito.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="inscritos__lista inscritos__vacio">
                No hay nadie inscrito a este evento...
              </p>
            )}
          </div>
          <div className="inscritos__footer">
            <Button
              texto={"Asistir"}
              onClick={() => handleAddInscripcion(datos.evento.id)}
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
