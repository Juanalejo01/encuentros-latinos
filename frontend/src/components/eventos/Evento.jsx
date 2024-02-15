import { Link } from "react-router-dom";
import { FaRegClock, FaMapMarkerAlt, FaUserFriends, FaShapes } from "react-icons/fa";
import { horaFormateada } from "../../services/fechaHoraFormateada";

export const Evento = ({ evento, slidesPerView }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento?.foto}`;

  return (
    <article className="eventos__evento">
      <Link className="eventos__link" to={`/evento/${evento.id}`}>
        <div className="evento__container-img">
          {evento.foto ? (
            <img className="evento__imagen" src={imagenUrl} alt={evento.titulo} />
          ) : (
            <div className="spinner__img">
              {console.log("cargar imagen")}
              <span className="spinner"></span>
            </div>
          )}
        </div>

        <div className="evento__content">
          <h3 className="evento__title">{evento.titulo}</h3>

          <div className="evento__tags">
            <span className="evento__tag-tematica">
              <FaShapes /> {evento.tematica}
            </span>
            <span className={slidesPerView === 3 ? "evento__tag-ciudad" : "hombe__tag-ciudad"}>
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
