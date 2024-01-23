import { BannerGeneral } from "../components/general/BannerGeneral";
import "../css/nofound/paginaNoFound.css";

export const PaginaNoFound = () => {
  return (
    <section className="layout__nofound">
      <h2 className="nofound__subtitle">Página no encontrada...</h2>
      <h1 className="nofound__title">404</h1>
      <BannerGeneral />
    </section>
  );
};
