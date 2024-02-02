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
import { eliminarEventoService } from "../../services/eventosServices";

export const PrivateEventosList = ({ evento, removeEvento, token }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}`;
  const eventoCaducado = new Date() > new Date(evento.fecha_hora);

  const handleEliminarEvento = async (eventoId) => {
    try {
      await eliminarEventoService(eventoId, token);
      removeEvento(eventoId);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <article className="private-eventos__pevento">
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

      <div className="private-eventos__iconos">
        <Link className="private-eventos__editar" to={`/dashboard/evento/${evento.id}`}>
          <FaPencilAlt className="private-eventos__editar-icono" title="Editar evento" />
        </Link>
        <div className="private-eventos__eliminar" title="Eliminar evento">
          <FaTrashAlt
            className="private-eventos__eliminar-icono"
            onClick={() => handleEliminarEvento(evento.id)}
          />
        </div>
      </div>
    </article>
  );
};
