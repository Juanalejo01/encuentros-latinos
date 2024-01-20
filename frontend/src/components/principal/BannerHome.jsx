import { Imagenes } from "../general/Imagenes";

export const BannerHome = () => {
  return (
    <div className="banner__images">
      <div className="banner__thumb banner__thumb--chat">
        <img src={Imagenes().chat} />
      </div>
      <div className="banner__thumb banner__thumb--laptop">
        <img className="banner__img" src={Imagenes().womenLaptop} />
      </div>

      <div className="banner__thumb banner__thumb--mobile">
        <img className="banner__img" src={Imagenes().menMobile} />
      </div>
    </div>
  );
};
