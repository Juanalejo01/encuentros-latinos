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
import { toast } from "sonner";

export const PrivateEventosList = ({ evento, removeEvento, token }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}`;
  const eventoCaducado = new Date() > new Date(evento.fecha_hora);

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

      <div className="private-eventos__iconos">
        <Link
          className="private-eventos__editar"
          to={`/dashboard/evento/${evento.id}`}
          title="Editar"
        >
          <FaPencilAlt className="private-eventos__editar-icono" />
          Editar
        </Link>
        <button
          className="private-eventos__eliminar"
          title="Eliminar"
          onClick={() => {
            toast.custom((t) => (
              <div className="mensaje__eliminar">
                <h4 className="eliminar__title">
                  ¿Estás seguro de que quieres eliminar este evento?
                </h4>
                <div className="eliminar__botones">
                  <button className="eliminar__btn" onClick={() => handleEliminarEvento(evento.id)}>
                    Sí
                  </button>
                  <button className="eliminar__btn" onClick={() => toast.dismiss(t)}>
                    No
                  </button>
                </div>
              </div>
            ));
          }}
        >
          <FaTrashAlt className="private-eventos__eliminar-icono" />
          Eliminar
        </button>
      </div>
    </article>
  );
};
