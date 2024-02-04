import {
  FaRegClock,
  FaMapMarkerAlt,
  FaUserFriends,
  FaShapes,
  FaPencilAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { horaFormateada } from "../../services/fechaHoraFormateada";
import { Link } from "react-router-dom";
import { bajaUsuarioEventoService, eliminarEventoService } from "../../services/eventosServices";
import { toast } from "sonner";
import { useEvento } from "../../hook/useEvento";

export const PrivateEventosList = ({ evento, removeEvento, token, opcion }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}`;
  const eventoCaducado = new Date() > new Date(evento.fecha_hora);
  const { removeListado } = useEvento(evento.id);

  const handleEliminarInscripcion = async (eventoId, id) => {
    try {
      const texto = await bajaUsuarioEventoService(eventoId, token);
      toast.success(texto);
      removeListado(id);
      removeEvento(eventoId);
      toast.dismiss();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEliminarEvento = async (eventoId) => {
    try {
      await eliminarEventoService(eventoId, token);
      removeEvento(eventoId);
      toast.dismiss();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <article className="private-eventos__pevento">
      <Link className="private-eventos__link" to={`/evento/${evento.id}`} title="Mostrar">
        <div className="pevento__container-img">
          <img className="pevento__imagen" src={imagenUrl} alt={evento.titulo} />
        </div>

        <div className="pevento__content">
          <div className="content__tags">
            <h3 className="pevento__title">{evento.titulo}</h3>

            <div className="pevento__tags">
              <span className="pevento__tag-tematica">
                <FaShapes /> {evento.tematica}
              </span>
              <span className="pevento__tag-ciudad">
                <FaMapMarkerAlt /> {evento.ciudad}
              </span>

              <div className="pevento__tag-bottom">
                <span className="pevento__tag-fecha">
                  <FaRegClock />
                  {horaFormateada(evento.fecha_hora)} h
                </span>
                <span className="pevento__tag-inscritos">
                  <FaUserFriends /> {evento.totalInscritos}
                </span>
              </div>
              {eventoCaducado && <p className="pvento__caducado">Caducado</p>}
            </div>
          </div>
        </div>
      </Link>

      <div
        className={
          opcion === "Eventos" ? "private-eventos__iconos" : "private-suscripciones__icono"
        }
      >
        {opcion === "Eventos" && (
          <Link
            className="private-eventos__editar"
            to={`/dashboard/evento/${evento.id}`}
            title="Editar"
          >
            <FaPencilAlt className="private-eventos__editar-icono" />
            Editar
          </Link>
        )}

        <button
          className={
            opcion === "Eventos" ? "private-eventos__eliminar" : "private-suscripciones__noasistir"
          }
          title="Eliminar"
          onClick={() => {
            toast.custom((t) => (
              <div className="mensaje__eliminar">
                {opcion === "Suscripcion" ? (
                  <h4 className="eliminar__title">
                    ¿Estás seguro de que no quieres asistir a este evento?
                  </h4>
                ) : (
                  <h4 className="eliminar__title">
                    ¿Estás seguro de que quieres eliminar este evento?
                  </h4>
                )}

                <div className="eliminar__botones">
                  {opcion === "Eventos" && (
                    <button
                      className="eliminar__btn"
                      onClick={() => handleEliminarEvento(evento.id)}
                    >
                      Sí
                    </button>
                  )}
                  {opcion === "Suscripcion" && (
                    <button
                      className="eliminar__btn"
                      onClick={() => handleEliminarInscripcion(evento.id, evento.inscrito)}
                    >
                      Sí
                    </button>
                  )}

                  <button className="eliminar__btn" onClick={() => toast.dismiss(t)}>
                    No
                  </button>
                </div>
              </div>
            ));
          }}
        >
          <FaTrashAlt className="private-eventos__eliminar-icono" />
          {opcion === "Eventos" ? <spam>Eliminar</spam> : <spam>No asistir</spam>}
        </button>
      </div>
    </article>
  );
};
