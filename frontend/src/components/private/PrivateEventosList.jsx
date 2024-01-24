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

export const PrivateEventosList = ({ evento }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}`;
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
        <Link className="private-eventos__eliminar" to={`/evento/${evento.id}`}>
          <FaTrashAlt />
        </Link>
      </div>
    </article>
  );
};

/* 

import { Link } from "react-router-dom";
import { FaRegClock, FaMapMarkerAlt, FaUserFriends, FaShapes } from "react-icons/fa";
import { horaFormateada } from "../../services/fechaHoraFormateada";

export const Evento = ({ evento }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}`;
  return (
    <article className="eventos__evento">
      <Link className="eventos__link" to={`/evento/${evento.id}`}>
        <div className="evento__container-img">
          <img className="evento__imagen" src={imagenUrl} alt={evento.titulo} />
        </div>
        <div className="evento__content">
          <h2 className="evento__title">{evento.titulo}</h2>

          <div className="evento__tags">
            <span className="evento__tag-tematica">
              <FaShapes /> {evento.tematica}
            </span>
            <span className="evento__tag-ciudad">
              <FaMapMarkerAlt /> {evento.ciudad}
            </span>

            <div className="evento__tag-bottom">
              <span className="evento__tag-fecha">
                <FaRegClock />
                {horaFormateada(evento.fecha_hora)} h
              </span>
              <span className="evento__tag-inscritos">
                <FaUserFriends /> {evento.totalInscritos}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};


*/
