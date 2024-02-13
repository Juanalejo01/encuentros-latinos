import { useState, useEffect } from "react";

export const Contador = ({ targetDate, onCountdownEnd }) => {
  const calculateTimeLeft = () => {
    const targetDateTime = new Date(targetDate);
    targetDateTime.setHours(targetDateTime.getHours() - 1);
    const difference = targetDateTime - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0 };
    }

    return timeLeft;
  };

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes } = timeLeft;

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0) {
      onCountdownEnd();
    }
  }, [days, hours, minutes, onCountdownEnd]);

  return (
    <ul className="contador__content">
      <li className="contador__item">
        <span className="contador__text">{days === 1 ? "Día" : "Días"}</span>
        <span className="contador__numero">{formatNumber(days)}</span>{" "}
      </li>

      <li className="contador__item">
        <span className="contador__text">{hours === 1 ? "Hora" : "Horas"}</span>
        <span className="contador__numero">{formatNumber(hours)}</span>{" "}
      </li>

      <li className="contador__item">
        <span className="contado__text">{minutes === 1 ? "Minuto" : "Minutos"}</span>
        <span className="contador__numero">{formatNumber(minutes)}</span>{" "}
      </li>
    </ul>
  );
};
