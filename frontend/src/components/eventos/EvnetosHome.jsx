import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Evento } from "./Evento";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const EventosHome = ({ eventos }) => {
  const [uniqueTemas, setUniqueTemas] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const screenSizeSlides = calculateScreenSizeSlides();
      const temasUniqueSlides = calculateTemasUniqueSlides();

      setSlidesPerView(Math.min(screenSizeSlides, temasUniqueSlides));
    };

    const calculateScreenSizeSlides = () => {
      if (window.innerWidth <= 1200 && window.innerWidth > 800) {
        return 2;
      } else if (window.innerWidth <= 800) {
        return 1;
      } else {
        return 4;
      }
    };

    const calculateTemasUniqueSlides = () => {
      return uniqueTemas.length;
    };

    const temasSet = new Set(eventos.map((evento) => evento.tematica));
    setUniqueTemas(Array.from(temasSet));

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [eventos, uniqueTemas.length]);

  const eventosOrdenados = eventos.sort((a, b) => b.totalInscritos - a.totalInscritos);

  return (
    <Swiper
      className={`eventos__banner `}
      slidesPerView={slidesPerView}
      lazyPreloadPrevNext={2}
      spaceBetween={10}
      slidesPerGroup={2}
      wrapperClass={eventos.length === 2 ? "two-cards" : ""}
      centeredSlides={eventos.length === 1}
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
