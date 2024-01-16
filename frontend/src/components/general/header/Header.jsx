import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="layout__header">
      <div className="logo">
        <Link to={"/"}>
          {/* Enlace a la página Home */}
          <img src="ruta_logo" alt="Logo" />
        </Link>
      </div>

      <div className="search__bar">
        {/*omponente de barra de búsqueda aquí */}
        <input type="text" placeholder="Buscar..." />
        <button type="button">Buscar</button>
      </div>

      <div className="button-left">
        <Link to={"/login"}>
          <button type="button">Login</button>
        </Link>
      </div>
    </header>
  );
};
