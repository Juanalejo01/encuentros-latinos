import { useState } from "react";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    descripcion: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" required onChange={handleChange} />

        <label>Apellidos:</label>
        <input type="text" name="apellidos" required onChange={handleChange} />

        <label>Username:</label>
        <input type="text" name="username" required onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" required onChange={handleChange} />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
        />

        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirmPassword"
          required
          onChange={handleChange}
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          rows="4"
          cols="50"
          onChange={handleChange}
        />

        <label>Subir Avatar:</label>
        <input type="file" name="avatar" onChange={handleChange} />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
