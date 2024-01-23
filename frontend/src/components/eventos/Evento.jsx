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
