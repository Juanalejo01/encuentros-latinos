import { useNavigate } from "react-router-dom";
import { BannerGeneral } from "../components/general/BannerGeneral";
import { Button } from "../components/general/Button";
import "../css/nofound/paginaNoFound.css";

export const PaginaNoFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <section className="layout__nofound">
      <h1 className="nofound__title">404</h1>
      <h2 className="nofound__subtitle">Página no encontrada...</h2>
      <BannerGeneral />
      <Button texto={"Volver a inicio"} onClick={handleClick} className={"nofound__btn"} />
    </section>
  );
};