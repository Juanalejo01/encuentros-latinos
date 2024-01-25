import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services/registerUserServices";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [biografia, setBiografia] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUserService(
        nombre,
        apellidos,
        email,
        password,
        biografia,
        avatar
      );

      //ir a login

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="layout__registro">
      <h1 className="registro__title">Registro de Usuario</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          required
          onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="apellidos">Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          required
          onChange={(e) => setApellidos(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirmPassword"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label htmlFor="biografia">Biografia:</label>
        <textarea
          name="biografia"
          rows="4"
          cols="50"
          onChange={(e) => setBiografia(e.target.value)}
        />

        <label htmlFor="avatar">Subir Avatar:</label>
        <input
          type="file"
          name="avatar"
          onChange={(e) => setAvatar(e.target.value)}
        />

        <button type="submit">Registrarse</button>
        {error ? <p> {error} </p> : null}
      </form>
    </section>
  );
};
