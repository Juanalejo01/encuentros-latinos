import { Evento } from "./Evento";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

export const EventosList = ({ eventos }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200 && window.innerWidth > 800) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 800) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSingleEvents = eventos.length === 1;
  const isTwoEvents = eventos.length === 2;

  return (
    <Swiper
      className={`eventos__list `}
      modules={[Navigation, Pagination]}
      slidesPerView={slidesPerView}
      lazyPreloadPrevNext={2}
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
  );
};
