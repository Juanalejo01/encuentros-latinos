import { Imagenes } from "./Imagenes";
import "../../css/general/bubbles.css";

export const BannerGeneral = () => {
  return (
    <ul className="shapes__list">
      <li className="shapes__item shapes__item--shape1">
        <img src={Imagenes().bubble12} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape2">
        <img src={Imagenes().bubble16} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape3">
        <img src={Imagenes().bubble13} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape4">
        <img src={Imagenes().bubble14} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape5">
        <img src={Imagenes().bubble16} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape6">
        <img src={Imagenes().bubble15} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape7">
        <img src={Imagenes().bubble16} className="shapes__img" />
      </li>
    </ul>
  );
};
