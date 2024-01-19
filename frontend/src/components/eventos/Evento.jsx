import { Link } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";

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
            <span className="evento__tag-tematica">Temática: {evento.tematica}</span>
            <span className="evento__tag-ciudad">Ciudad: {evento.ciudad}</span>
            <span className="evento__tag-fecha">
              <FaCalendar />
              {new Date(evento.fecha_hora).toLocaleString()}
            </span>
            <span className="evento__tag-inscritos">Total inscritos: {evento.totalInscritos}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
