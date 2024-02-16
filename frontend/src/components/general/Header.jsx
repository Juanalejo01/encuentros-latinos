import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaBars, FaSistrix } from "react-icons/fa";
import { toast } from "sonner";

export const Header = ({ showSidebar, setShowSidebar }) => {
  const { logoutHandler, usuarioId, avatar } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [tematicaHeader, setTematicaHeader] = useState("");
  const [ciudadHeader, setCiudadHeader] = useState("");
  const navigate = useNavigate();

  const isPrivateRoute = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (showMenu && !event.target.closest(".user__menu")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [showMenu]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/eventos?tematica=${tematicaHeader}&ciudad=${ciudadHeader}`);
    setCiudadHeader("");
    setTematicaHeader("");
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
    navigate("/");
    toast.dismiss();
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
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
        <button className="search__boton">
          <FaSistrix className={"search__btn"} title="Buscar" />
        </button>
      </form>

      <div className="button-left">
        {!usuarioId ? (
          <Link className="button-left__login" to={"/login"}>
            <span className="text__login">Login</span>
            <span className="login__line -right"></span>
            <span className="login__line -top"></span>
            <span className="login__line -left"></span>
            <span className="login__line -bottom"></span>
          </Link>
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
                      <p
                        className="submenu__link"
                        onClick={() => {
                          toast.custom((t) => (
                            <div className="mensaje__eliminar">
                              <h4 className="eliminar__title">
                                ¿Estás seguro de que quieres cerrar sesión?
                              </h4>

                              <div className="eliminar__botones">
                                <button
                                  className="eliminar__btn"
                                  onClick={() => handleLogoutClick()}
                                >
                                  Sí
                                </button>
                                <button className="eliminar__btn" onClick={() => toast.dismiss(t)}>
                                  No
                                </button>
                              </div>
                            </div>
                          ));
                        }}
                      >
                        Cerrar sesión
                      </p>
                    </li>
                  </ul>
                )}
              </li>
              {isPrivateRoute && (
                <ul className="menu__boton-sidebar">
                  <li className="menu__vertical"></li>
                  <li className="menu__item">
                    <FaBars className="menu__bars" onClick={toggleSidebar} />
                  </li>
                </ul>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
