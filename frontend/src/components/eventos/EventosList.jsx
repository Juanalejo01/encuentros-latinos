import { Evento } from "./Evento";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";

export const EventosList = ({ eventos }) => {
  return eventos.length ? (
    <Swiper
      className="eventos__list"
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
    >
      {eventos.map((evento) => (
        <SwiperSlide className="eventos__item" key={evento.id}>
          <Evento evento={evento} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <p className="eventos__mensaje">No hay eventos en este momento para mostrar...</p>
  );
};
