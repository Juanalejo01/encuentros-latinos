import { useContext, useState } from "react";
import { altaUsuarioEventoService, bajaUsuarioEventoService } from "../../services/eventosServices";
import { horaFormateada } from "../../services/fechaHoraFormateada";
import { BannerGeneral } from "../general/BannerGeneral";
import { Button } from "../general/Button";
import { FaRegClock, FaShapes, FaLocationArrow, FaCity, FaFlag, FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const Detalles = ({ datos, removeListado, addListado }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.foto}`;
  const avatarUrl = `${import.meta.env.VITE_APP_BACKEND}/${datos.evento.avatar}`;
  const inscritoUrl = `${import.meta.env.VITE_APP_BACKEND}/`;
  const { token, usuarioId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEliminarInscripcion = async (eventoId, id) => {
    try {
      setLoading(true);

      const texto = await bajaUsuarioEventoService(eventoId, token);
      toast.success(texto);
      removeListado(id);
      toast.dismiss();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInscripcion = async (eventoId) => {
    try {
      setLoading(true);

      if (!token || token === " ") {
        navigate("/register");
        toast.error("Tienes que estar registrado para poder inscribirte en este evento.");
      } else {
        const dato = await altaUsuarioEventoService(eventoId, token);
        toast.success(dato.mensaje);
        addListado(dato.usuario);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="layout__detalles">
      <header className="detalles__header">
        <h2 className="detalles__title">{datos.evento.titulo}</h2>
      </header>
      <div className="detalles__content">
        <div className="content__dleft">
          <div className="detalles__container-img">
            <img className="detalles__imagen" src={imagenUrl} alt={datos.evento.titulo} />
          </div>
          <div className="detalles__author">
            <img className="author__imagen" src={avatarUrl} alt={datos.evento.nombre} />
            <p className="author__nombre">
              Organizado por{" "}
              <strong>
                {datos.evento.nombre} {datos.evento.apellidos}
              </strong>
            </p>
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

        <div className="content__dmiddle">
          <div className="detalles__description">
            <h3 className="detalles__subtitle">Detalles:</h3>
            <p className="detalles__descripcion">{datos.evento.descripcion}</p>
          </div>
        </div>

        <div className="content__dright">
          <div className="detalles__inscritos">
            <h4 className="inscritos__title">Lista de asistentes:</h4>
            {datos.total !== 0 ? (
              <ul className="inscritos__lista">
                {loading ? (
                  <div className="spinner__lista" role="status">
                    <span className="spinner__detalles"></span>
                  </div>
                ) : null}

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
                      {usuarioId && inscrito.usuario_id === usuarioId ? (
                        <FaTrashAlt
                          className="eliminar__inscrito"
                          onClick={() => {
                            toast.custom((t) => (
                              <div className="mensaje__eliminar">
                                <h4 className="eliminar__title">
                                  ¿Estás seguro de que no puedes asistir a este evento?
                                </h4>
                                <div className="eliminar__botones">
                                  <button
                                    className="eliminar__btn"
                                    onClick={() =>
                                      handleEliminarInscripcion(datos.evento.id, inscrito.id)
                                    }
                                  >
                                    Sí
                                  </button>
                                  <button
                                    className="eliminar__btn"
                                    onClick={() => toast.dismiss(t)}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            ));
                          }}
                          title="No asistir"
                        />
                      ) : null}
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
    </main>
  );
};
