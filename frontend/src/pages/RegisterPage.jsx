import { Button } from "../components/general/Button";
import { useRegistro } from "../hook/useRegistro";
import { toast } from "sonner";
import { BannerGeneral } from "../components/general/BannerGeneral";
import { FaUserPlus } from "react-icons/fa";
import { useRef, useState } from "react";

import "../css/registro/registro.css";

export const RegisterPage = () => {
  const [imagen, setImagen] = useState("");
  const { sending, setClicked, setUsuario } = useRegistro();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const imagen = data.get("avatar");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (imagen && imagen.size === 0) {
      toast.error("Debes adjuntar una imagen de avatar.");
      return;
    }

    data.delete("confirmPassword");

    setClicked(true);
    setUsuario(data);
  };

  return (
    <main className="layout__registro">
      <header className="registro__header">
        <h2 className="registro__title">Registro de Usuario</h2>
      </header>

      <section className="registro__content">
        <form className="registro__formulario" onSubmit={handleForm}>
          <div className="formulario__columna--1">
            <div className="formulario__nombre">
              <label htmlFor="nombre">Nombre:</label>
              <input className="input__nombre" type="text" name="nombre" tabIndex={1} required />
            </div>
            <div className="formulario__apellidos">
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                className="input__apellidos"
                type="text"
                name="apellidos"
                tabIndex={2}
                required
              />
            </div>
          </div>

          <div className="formulario__columna--2">
            <div className="formulario__password">
              <label htmlFor="password">Contraseña:</label>
              <input
                className="input__password"
                type="password"
                id="password"
                name="password"
                tabIndex={4}
                required
              />

              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                className="input__password"
                type="password"
                name="confirmPassword"
                tabIndex={5}
                required
              />
            </div>

            <div className="formulario__email">
              <label htmlFor="email">Email:</label>
              <input
                className="input__email"
                type="email"
                id="email"
                name="email"
                tabIndex={3}
                required
              />
            </div>
          </div>

          <div className="formulario__columna--3">
            <div className="formulario__biografia">
              <label htmlFor="biografia">Biografia:</label>
              <textarea
                className="textarea__bio"
                name="biografia"
                rows="4"
                cols="50"
                tabIndex={6}
              />
            </div>

            <div className="formulario__avatar">
              <label htmlFor="avatar">
                <FaUserPlus className="avatar__label" title="Descargar Avatar" />
                {imagen ? (
                  <img
                    className="registro__imagen-preview"
                    src={URL.createObjectURL(imagen)}
                    alt="Preview"
                    title="Cambiar Avatar"
                  />
                ) : null}
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept=".jpg, .png, .jpeg"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <Button texto={"Registrate"} className={"registro__btn"} />
        </form>
        {sending ? <div className="spinner"></div> : null}
      </section>

      <BannerGeneral />
    </main>
  );
};
