import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Header = () => {
  const { logoutHandler, usuarioId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard/eventos");
    setShowMenu(false);
  };

  const handleLogoutClick = () => {
    logoutHandler();
    setShowMenu(false);
  };

  return (
    <header className="layout__header">
      <div className="logo">
        <Link className="logo__link" to={usuarioId ? "/eventos" : "/"}>
          <h1 className="logo__title">ENCUENTROS LATINOS</h1>
        </Link>
      </div>
      <div className="search__bar">
        <input type="text" placeholder="Temática..." />
        <input type="text" placeholder="Ciudad..." />
        <Button
          texto={"Buscar"}
          onClick={() => {
            alert("haz hecho click en el boton");
          }}
          className={"login__btn"}
        />
      </div>

      <div className="button-left">
        {!usuarioId ? (
          <Button texto={"Login"} onClick={handleLoginClick} className={"login__btn"} />
        ) : (
          <div className="user__menu">
            <img
              src={`${import.meta.env.VITE_APP_BACKEND}/perfil/${usuarioId}`}
              alt="Avatar"
              className="avatar"
              onClick={handleAvatarClick}
            />
            {showMenu && (
              <div className="menu">
                <NavLink onClick={handleDashboardClick}>Dashboard</NavLink>
                <NavLink onClick={handleLogoutClick}>Cerrar sesión</NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
