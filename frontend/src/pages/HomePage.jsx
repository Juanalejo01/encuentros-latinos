import { useNavigate } from "react-router-dom";
import { Button } from "../components/general/Button";
import { BannerHome } from "../components/principal/BannerHome";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import "../css/principal/homePage.css";

export const HomePage = () => {
  const navigate = useNavigate();
  const { usuarioId } = useContext(AuthContext);

  if (typeof usuarioId === "number") {
    console.log(usuarioId);
    navigate("/eventos");
  }

  const handleClick = () => {
    navigate("/register");
  };

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

        <Button texto={"Unete a Eventos Latinos"} onClick={handleClick} className={"banner__btn"} />
      </header>
      <BannerHome />
    </main>
  );
};
