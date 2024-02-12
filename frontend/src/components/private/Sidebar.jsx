import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../general/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";

import "../../css/private/sidebar.css";

export const Sidebar = () => {
  const { nombre, logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logoutHandler();
    navigate("/");
    toast.dismiss();
  };

  return (
    <section className="layout__sidebar">
      <header className="sidebar__header">
        <h2 className="sidebar__title">Bienvenido, {nombre}!</h2>
      </header>
      <menu className="sidebar__menu">
        <NavLink to={"/dashboard/eventos"} className="sidebar__item">
          Mis eventos
        </NavLink>
        <NavLink to={"/dashboard/suscripciones"} className="sidebar__item">
          Mis suscripciones
        </NavLink>
        <NavLink to={"/dashboard/evento"} end className="sidebar__item">
          Crear evento
        </NavLink>
        <NavLink to={"/configuracion"} className="sidebar__item">
          Configuración
        </NavLink>
      </menu>
      <div className="sidebar__boton">
        <Button
          texto={"Cerrar sesión"}
          onClick={() => {
            toast.custom((t) => (
              <div className="mensaje__eliminar">
                <h4 className="eliminar__title">¿Estás seguro de que quieres cerrar sesión?</h4>

                <div className="eliminar__botones">
                  <button className="eliminar__btn" onClick={() => handleLogoutClick()}>
                    Sí
                  </button>
                  <button className="eliminar__btn" onClick={() => toast.dismiss(t)}>
                    No
                  </button>
                </div>
              </div>
            ));
          }}
          className={"sidebar__btn"}
        />
      </div>
    </section>
  );
};
