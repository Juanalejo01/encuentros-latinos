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
        <h2 className="pevento__title">{evento.titulo}</h2>

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
        </div>
      </div>
      <div className="private-eventos__iconos">
        <Link className="private-eventos__editar" to={`/dashboard/evento/${evento.id}`}>
          <FaPencilAlt />
        </Link>

        <FaTrashAlt
          className="private-eventos__eliminar"
          onClick={() => handleEliminarEvento(evento.id)}
        />
      </div>
    </article>
  );
};
