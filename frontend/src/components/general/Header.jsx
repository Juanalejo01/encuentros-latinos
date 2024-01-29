import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <header className="layout__header">
      <div className="logo">
        <Link className="logo__link" to={"/"}>
          <h1 className="logo__title">ENCUENTROS LATINOS</h1>
        </Link>
      </div>
      <div className="search__bar">
        <input type="text" placeholder="Temática..." />
        <input type="text" placeholder="Ciudad..." />
        <button type="button">Buscar</button>
      </div>

      <div className="button-left">
        <Button texto={"Login"} onClick={handleClick} className={"login__btn"} />
      </div>
    </header>
  );
};
