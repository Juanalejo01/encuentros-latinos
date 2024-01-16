import { ImagenesBubbles } from "./ImagenesBubbles";

export const BannerHome = () => {
  return (
    <ul className="shapes__list">
      <li className="shapes__item shapes__item--shape1">
        <img src={ImagenesBubbles().bubble12} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape2">
        <img src={ImagenesBubbles().bubble16} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape3">
        <img src={ImagenesBubbles().bubble13} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape5">
        <img src={ImagenesBubbles().bubble14} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape2">
        <img src={ImagenesBubbles().bubble16} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape4">
        <img src={ImagenesBubbles().bubble15} className="shapes__img" />
      </li>

      <li className="shapes__item shapes__item--shape2">
        <img src={ImagenesBubbles().bubble16} className="shapes__img" />
      </li>
    </ul>
  );
};
