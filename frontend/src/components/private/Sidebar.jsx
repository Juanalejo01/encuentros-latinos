import { NavLink } from "react-router-dom";
import { Button } from "../general/Button";

export const Sidebar = () => {
  return (
    <section className="layout__sidebar">
      <header className="sidebar__header">
        <h2 className="sidebar__title">Bienvenido Usuario!</h2>
      </header>
      <div className="sidebar__menu">
        <NavLink to={"/dashboard/evento"} activeClassName="sidebar__activo">
          Crear evento
        </NavLink>
        <NavLink to={"/dashboard/eventos"} activeClassName="sidebar__activo">
          Mis eventos
        </NavLink>
        <NavLink to={"#"} activeClassName="sidebar__activo">
          Configuración
        </NavLink>
      </div>
      <Button
        texto={"Cerrar sesión"}
        onClick={() => alert("¡Botón clicado!")}
        className={"sidebar__btn"}
      />
    </section>
  );
};