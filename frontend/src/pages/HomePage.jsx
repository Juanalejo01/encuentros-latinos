import { useNavigate } from "react-router-dom";
import { Button } from "../components/general/Button";
import { BannerHome } from "../components/principal/BannerHome";

import "../css/principal/homePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <section className="layout__banner">
      <header className="banner__header">
        <h2 className="banner__subtitle">Encuentros Latinos</h2>
        <h1 className="banner__title">
          ¿Te gustaría conocer a gente nueva con la que compartir tus pasiones?
        </h1>
        <p className="banner__description">
          Hay eventos a diario: registrate para conocer nuevas amistades con las que compartir tus
          pasiones y empiezar a crear recuerdos inolvidables.
        </p>

        <Button texto={"Unete a Eventos Latinos"} onClick={handleClick} className={"banner__btn"} />
      </header>
      <BannerHome />
    </section>
  );
};
