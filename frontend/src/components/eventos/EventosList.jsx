import { Evento } from "./Evento";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const EventosList = ({ eventos }) => {
  const isSingleEvents = eventos.length === 1;
  const isTwoEvents = eventos.length === 2;

  return eventos.length ? (
    <Swiper
      className={`eventos__list `}
      modules={[Navigation, Pagination]}
      slidesPerView={3}
      spaceBetween={10}
      wrapperClass={isTwoEvents ? "two-cards" : ""}
      centeredSlides={isSingleEvents}
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
