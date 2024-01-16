import { Link } from "react-router-dom";
import { Header } from "../components/general/header/Header";
import { Footer } from "../components/general/Footer";

export const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" required />

        <label>Contraseña:</label>
        <input type="password" name="password" required />

        <button type="submit">Acceder</button>
      </form>

      <div>
        <Link to="/register">¿Aun no estas registrado?</Link>
      </div>
    </div>
  );
};
