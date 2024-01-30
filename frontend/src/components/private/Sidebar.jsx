import { NavLink } from "react-router-dom";
import { Button } from "../general/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Sidebar = () => {
  const { logoutHandler } = useContext(AuthContext);

  return (
    <section className="layout__sidebar">
      <header className="sidebar__header">
        <h2 className="sidebar__title">Bienvenido Usuario!</h2>
      </header>
      <div className="sidebar__menu">
        <NavLink to={"/dashboard/evento"} className="sidebar__activo">
          Crear evento
        </NavLink>
        <NavLink to={"/dashboard/eventos"} className="sidebar__activo">
          Mis eventos
        </NavLink>
        <NavLink to={"#"} className="sidebar__activo">
          Configuración
        </NavLink>
      </div>
      <Button texto={"Cerrar sesión"} onClick={() => logoutHandler()} className={"sidebar__btn"} />
    </section>
  );
};
