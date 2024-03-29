import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useEventos } from "../hook/useEventos";

import "../css/principal/homePage.css";
import { EventosHome } from "../components/eventos/EvnetosHome";

export const HomePage = () => {
  const { eventos, loading, error } = useEventos();
  const navigate = useNavigate();
  const { usuarioId } = useContext(AuthContext);

  useEffect(() => {
    if (typeof usuarioId === "number") {
      navigate("/eventos?tematica=&ciudad=");
    }
  }, [usuarioId, navigate]);

  return (
    <main className="layout__banner">
      <header className="banner__header">
        <h3 className="banner__subtitle">Encuentros Latinos</h3>
        <h2 className="banner__title">
          ¿Te gustaría conocer a gente nueva con la que compartir tus pasiones?
        </h2>
        <p className="banner__description">
          Hay eventos a diario: registrate para conocer nuevas amistades con las que compartir tus
          pasiones y empiezar a crear recuerdos inolvidables.
        </p>
        <div className="banner__btn">
          <Link className="button__banner" to={"/register"}>
            <span className="text__banner">Únete aquí</span>
            <span className="banner__line -right"></span>
            <span className="banner__line -top"></span>
            <span className="banner__line -left"></span>
            <span className="banner__line -bottom"></span>
          </Link>
        </div>
      </header>

      <div className="mostrar__eventos">
        {loading ? (
          <div className="spinner__container">
            <span className="spinner"></span>
          </div>
        ) : error ? null : eventos.length ? (
          <EventosHome eventos={eventos} />
        ) : null}
      </div>
    </main>
  );
};
