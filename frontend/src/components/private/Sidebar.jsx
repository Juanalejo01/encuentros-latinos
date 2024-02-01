import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../general/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "../../css/private/sidebar.css";

export const Sidebar = () => {
  const { nombre, logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logoutHandler();
    navigate("/");
  };

  return (
    <section className="layout__sidebar">
      <header className="sidebar__header">
        <h2 className="sidebar__title">Bienvenido, {nombre}!</h2>
      </header>
      <div className="sidebar__menu">
        <NavLink to={"/dashboard/evento"} end className="sidebar__item">
          Crear evento
        </NavLink>
        <NavLink to={"/dashboard/eventos"} className="sidebar__item">
          Mis eventos
        </NavLink>
        <NavLink to={"/"} className="sidebar__item">
          Configuración
        </NavLink>
      </div>
      <div className="sidebar__boton">
        <Button texto={"Cerrar sesión"} onClick={handleLogoutClick} className={"sidebar__btn"} />
      </div>
    </section>
  );
};
