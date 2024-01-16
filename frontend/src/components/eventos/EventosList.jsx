import { Link } from "react-router-dom";
import { Evento } from "./Evento";

export const EventosList = ({ eventos }) => {
  return eventos.length ? (
    <ul className="eventos__list">
      {eventos.map((evento) => (
        <li className="eventos__item" key={evento.id}>
          <Link className="eventos__link" to={`/evento/${evento.id}`}>
            <Evento evento={evento} />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className="eventos__mensaje">No hay eventos en este momento para mostrar</p>
  );
};
