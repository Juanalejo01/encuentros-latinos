import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUserService } from "../services/gestionUserServices";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUserService({ email, password });
      setToken(data.token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleForm}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acceder</button>
        {error ? <p> {error} </p> : null}
      </form>

      <div>
        <Link to="/register">¿Aun no estas registrado?</Link>
      </div>
      <p>Token: {token}</p>
    </div>
  );
};
