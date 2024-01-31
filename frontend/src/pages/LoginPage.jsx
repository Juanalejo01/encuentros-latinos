import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserService } from "../services/gestionUserServices";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { Button } from "../components/general/Button";

import "../css/login/login.css";
import { BannerGeneral } from "../components/general/BannerGeneral";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  console.log(avatar);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUserService({ email, password });
      setToken(data.token);
      setAvatar(data.avatar);
      navigate("/eventos");
      toast.success(`Bienvenid@ ${data.nombre}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="layout__login">
      <header className="login__header">
        <h1 className="login__title">Iniciar sesión</h1>
      </header>

      <section className="login__content">
        <form className="login__formulario" onSubmit={handleForm}>
          <ul className="login__lista">
            <li className="login__item">
              <label htmlFor="email">Email:</label>
              <input
                className="input__email"
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>

            <li className="login__item">
              <label htmlFor="password">Contraseña:</label>
              <input
                className="input__password"
                type="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
          </ul>
          <Button texto={"Acceder"} className={"login__formulario-btn"} />
          <p className="login__link">
            <Link className="link__registro" to="/register">
              ¿Aun no estas registrado?
            </Link>
          </p>
        </form>
      </section>

      <BannerGeneral />
    </main>
  );
};
