import { Evento } from "./Evento";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

export const EventosList = ({ eventos }) => {
  const initialSlidesPerView = () => {
    if (window.innerWidth <= 1600 && window.innerWidth > 1200) {
      return 3;
    } else if (window.innerWidth <= 1200 && window.innerWidth > 815) {
      return 2;
    } else if (window.innerWidth <= 815 && window.innerWidth > 0) {
      return 1;
    } else {
      return eventos.length >= 4 ? 4 : eventos.length;
    }
  };
  const [slidesPerView, setSlidesPerView] = useState(initialSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1600 && window.innerWidth > 1200) {
        setSlidesPerView(3);
      } else if (window.innerWidth <= 1200 && window.innerWidth > 815) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 815 && window.innerWidth > 0) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(eventos.length >= 4 ? 4 : eventos.length);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [eventos.length]);

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
          <Evento evento={evento} slidesPerView={slidesPerView} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
