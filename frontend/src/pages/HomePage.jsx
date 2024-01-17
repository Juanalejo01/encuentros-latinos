import { Button } from "../components/general/Button";
import { BannerHome } from "../components/principal/BannerHome";

export const HomePage = () => {
  return (
    <section className="layout__banner">
      <h2 className="banner__subtitle">Encuentros Latinos</h2>
      <h1 className="banner__title">
        ¿Te gustaría conocer a gente nueva con la que compartir tus pasiones?
      </h1>
      <p className="banner__description">
        Hay eventos a diario: registrate para conocer nuevas amistades con las que compartir tus
        pasiones y empiezar a crear recuerdos inolvidables.
      </p>

      <Button
        texto={"Unete a Eventos Latinos"}
        onClick={() => alert("¡Botón clicado!")}
        className={"banner__btn"}
      />
      <BannerHome />
    </section>
  );
};