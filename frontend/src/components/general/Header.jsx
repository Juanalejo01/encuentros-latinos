import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaSistrix } from "react-icons/fa";

export const Header = () => {
  const { logoutHandler, usuarioId, avatar } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [tematicaHeader, setTematicaHeader] = useState("");
  const [ciudadHeader, setCiudadHeader] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/eventos?tematica=${tematicaHeader}&ciudad=${ciudadHeader}`);
    localStorage.setItem("tematica", tematicaHeader);
    localStorage.setItem("ciudad", ciudadHeader);
    setCiudadHeader("");
    setTematicaHeader("");
  };

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboardClick = () => {
    localStorage.removeItem("tematica");
    localStorage.removeItem("ciudad");
    setShowMenu(false);
  };

  const handleLogoutClick = () => {
    logoutHandler();
    setShowMenu(false);
  };

  return (
    <header className="layout__header">
      <div className="logo">
        <Link className="logo__link" to={usuarioId ? "/eventos?tematica=&ciudad=" : "/"}>
          <h1 className="logo__title">ENCUENTROS LATINOS</h1>
        </Link>
      </div>

      <form className="search__bar" onSubmit={handleClick}>
        <input
          className="search__tematica search__input"
          type="text"
          name="tematica"
          placeholder="Temática..."
          value={tematicaHeader}
          onChange={(e) => setTematicaHeader(e.target.value)}
        />
        <input
          className="search__ciudad search__input"
          type="text"
          name="ciudad"
          placeholder="Ciudad..."
          value={ciudadHeader}
          onChange={(e) => setCiudadHeader(e.target.value)}
        />
        <button type="submit" className="search__boton">
          <FaSistrix className={"search__btn"} title="Buscar" />
        </button>
      </form>

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
                        to={"/eventos?tematica=&ciudad="}
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
