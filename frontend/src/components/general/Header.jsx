import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaSistrix } from "react-icons/fa";

export const Header = () => {
  const { logoutHandler, usuarioId, avatar } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboardClick = () => {
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
        <input className="search__tematica search__input" type="text" placeholder="Temática..." />
        <input className="search__ciudad search__input" type="text" placeholder="Ciudad..." />
        <div className="search__boton">
          <FaSistrix
            onClick={() => {
              alert("haz hecho click en el boton");
            }}
            className={"search__btn"}
            title="Buscar"
          />
        </div>
      </div>

      <div className="button-left">
        {!usuarioId ? (
          <Button texto={"Login"} onClick={handleLoginClick} className={"login__btn"} />
        ) : (
          <nav className="user__menu">
            <ul className="menu__list">
              <li className="menu__item">
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND}/${avatar}`}
                  alt="Avatar"
                  className="avatar__img"
                  onClick={handleAvatarClick}
                />
                {showMenu && (
                  <ul className="user__submenu">
                    <li className="submenu__item">
                      <NavLink
                        className="submenu__link"
                        to={"/eventos"}
                        onClick={handleDashboardClick}
                      >
                        Inicio
                      </NavLink>
                    </li>
                    <li className="submenu__item">
                      <NavLink
                        className="submenu__link"
                        to={"/dashboard/eventos"}
                        onClick={handleDashboardClick}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="submenu__item">
                      <NavLink className="submenu__link" to={"/"} onClick={handleLogoutClick}>
                        Cerrar sesión
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
