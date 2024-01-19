import { Link } from "react-router-dom";
import { Evento } from "./Evento";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export const EventosList = ({ eventos }) => {
  return eventos.length ? (
    <Swiper className="eventos__list" slidesPerView={3}>
      {eventos.map((evento) => (
        <SwiperSlide className="eventos__item" key={evento.id}>
          <Link className="eventos__link" to={`/evento/${evento.id}`}>
            <Evento evento={evento} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <p className="eventos__mensaje">No hay eventos en este momento para mostrar</p>
  );
};
