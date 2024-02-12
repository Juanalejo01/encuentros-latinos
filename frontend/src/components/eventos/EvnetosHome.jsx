import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Evento } from "./Evento";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const EventosHome = ({ eventos }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [uniqueTemas, setUniqueTemas] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200 && window.innerWidth > 800) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 800) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(4);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSingleEvents = eventos.length === 1;
  const isTwoEvents = eventos.length === 2;

  useEffect(() => {
    const temasSet = new Set(eventos.map((evento) => evento.tematica));
    setUniqueTemas(Array.from(temasSet));
  }, [eventos]);

  const eventosOrdenados = eventos.sort((a, b) => b.totalInscritos - a.totalInscritos);

  return (
    <Swiper
      className={`eventos__banner `}
      slidesPerView={slidesPerView}
      lazyPreloadPrevNext={2}
      spaceBetween={10}
      slidesPerGroup={2}
      wrapperClass={isTwoEvents ? "two-cards" : ""}
      centeredSlides={isSingleEvents}
      pagination={{ clickable: false }}
      allowTouchMove={false}
    >
      {uniqueTemas.map((tema) => {
        const evento = eventosOrdenados.find((evento) => evento.tematica === tema);
        return (
          <SwiperSlide className="eventos__item" key={evento.id}>
            <Evento evento={evento} slidesPerView={slidesPerView} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
