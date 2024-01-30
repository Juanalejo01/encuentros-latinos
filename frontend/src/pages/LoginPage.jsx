import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserService } from "../services/gestionUserServices";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUserService({ email, password });
      setToken(data.token);
      navigate("/eventos");
      toast.success(`Bienvenid@ ${data.nombre}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleForm}>
        <label>Email:</label>
        <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acceder</button>
      </form>

      <div>
        <Link to="/register">¿Aun no estas registrado?</Link>
      </div>
    </div>
  );
};
