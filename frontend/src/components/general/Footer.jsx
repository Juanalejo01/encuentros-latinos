import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="layout__footer">
      <div className="footer__copyright">
        <span className="copyright__text">&copy; 2024. Todos los derechos reservados</span>
      </div>

      <div className="footer__links">
        <ul className="footer__flinks">
          <li className="flinks__item flinks__item--separator">
            <Link to={"/"} className="flinks__title">
              Política de privacidad
            </Link>
          </li>

          <li className="flinks__item">
            <Link to={"/"} className="flinks__title">
              Términos de uso
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
