export const Evento = ({ evento }) => {
  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}`;
  return (
    <article className="eventos__evento">
      <div className="evento__container-img">
        <img className="evento__imagen" src={imagenUrl} alt={evento.titulo} />
      </div>
      <div className="evento__content">
        <h2 className="evento__title">{evento.titulo}</h2>

        <div className="evento__tags">
          <span className="evento__tag">Tematica: {evento.tematica}</span>
          <span className="evento__tag">Ciudad: {evento.ciudad}</span>
          <span className="evento__tag">Fecha: {new Date(evento.fecha_hora).toLocaleString()}</span>
          <span className="evento__tag">Total inscritos: {evento.totalInscritos}</span>
        </div>
      </div>
    </article>
  );
};
