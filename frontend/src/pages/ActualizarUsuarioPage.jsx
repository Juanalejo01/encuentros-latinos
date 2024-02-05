import { useContext, useRef, useState } from "react";
import { Button } from "../components/general/Button";
import { FaUserAlt } from "react-icons/fa";
import Modal from "../components/general/Modal";
import { useUsuario } from "../hook/useUsuario";
import { PaginaNoFound } from "./PaginaNoFound";
import { toast } from "sonner";
import {
  deleteUserService,
  updateEmailService,
  updatePasswordService,
  updateUserService,
} from "../services/gestionUserServices";
import { AuthContext } from "../context/AuthContext";

export const ActualizarUsuarios = () => {
  const { token, logoutHandler } = useContext(AuthContext);
  const { usuario, loading, error, actualizaUsuario } = useUsuario();
  const [avatar, setAvatar] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const fileInputRef = useRef();

  if (loading)
    return (
      <div className="spinner__usuario">
        <span className="spinner"></span>
      </div>
    );
  if (error) return <PaginaNoFound />;

  const handleOpenModal = (type) => {
    setModalOpen(true);
    setModalType(type);
  };

  const handleCloseModal = (input) => {
    setModalOpen(false);
    if (input) {
      input.value = "";
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const datos = await updateUserService(data, token);
      datos.usuario.email = usuario.email;

      toast.success(datos.mensaje);
      actualizaUsuario(datos.usuario);
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const datos = await updateEmailService(data, token);

      toast.success(datos.mensaje);
      logoutHandler();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const password = data.get("nuevoPassword");
      const confirmPassword = data.get("confirmPassword");

      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      data.delete("confirmPassword");

      const datos = await updatePasswordService(data, token);

      toast.success(datos.mensaje);
      logoutHandler();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      // Corrige el error tipográfico aquí
      const password = data.get("password");
      const datos = await deleteUserService(password, token);
      toast.success(datos.mensaje);
      logoutHandler();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const imagenUrl = usuario
    ? `${import.meta.env.VITE_APP_BACKEND}/${usuario?.avatar}`
    : "";

  return (
    <section className="actualizar__registro">
      <header className="actualizar__header">
        <h2 className="actualizar__title">Editar mis Datos</h2>
      </header>
      <div className="actualizar__content">
        <img
          className="actualizar__content-avatar"
          src={imagenUrl}
          alt="avatar del usuario"
        />
        <ul className="actualizar__content-listado">
          <li className="actualizar__content-email">{usuario.email}</li>
          <li className="actualizar__content-nombre">
            {usuario.nombre} {usuario.apellidos}
          </li>
        </ul>
        <p className="actualizar__content-biografia">{usuario.biografia}</p>
      </div>
      <div className="actualizar__content-btn">
        <div className="actualizar__datos">
          <Button
            texto={"Datos e información"}
            className={"actualizar__datos__btn"}
            onClick={() => handleOpenModal("datos")}
          />
        </div>
        <div className="actualizar__email">
          <Button
            texto={"Actualizar E-mail"}
            className={"actualizar__email-btn"}
            onClick={() => handleOpenModal("email")}
          />
        </div>
        <div className="actualizar__password">
          <Button
            texto={"Contraseña y privacidad"}
            className={"actualizar__password-btn"}
            onClick={() => handleOpenModal("contraseña")}
          />
        </div>
        <div className="actualizar__eliminar-usuario">
          <Button
            texto={"Eliminar mi cuenta"}
            className={"eliminar__usuario__btn"}
            onClick={() => handleOpenModal("eliminar")}
          />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalType === "datos" && (
          <form
            className="formulario__actualizar-datos"
            onSubmit={handleUpdateUser}
          >
            <ul className="actualizar-datos__content">
              <li>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  className="input__nombre"
                  type="text"
                  name="nombre"
                  required
                  defaultValue={usuario?.nombre}
                />
              </li>
              <li>
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  className="input__apellidos"
                  type="text"
                  name="apellidos"
                  required
                  defaultValue={usuario?.apellidos}
                />
              </li>
              <li>
                <label htmlFor="biografia">Biografía:</label>
                <textarea
                  className="textarea__bio"
                  name="biografia"
                  id="biografia"
                  cols="30"
                  rows="5"
                  required
                  defaultValue={usuario?.biografia}
                ></textarea>
              </li>
              <li className="formulario__avatar actualizar-datos__avatar">
                <label htmlFor="avatar">
                  {avatar ? (
                    <img
                      className="registro__imagen-preview"
                      src={URL.createObjectURL(avatar)}
                      alt="Preview"
                      title="Modifica esta imagen"
                    />
                  ) : usuario ? (
                    <img
                      className="registro__imagen-preview"
                      src={imagenUrl}
                      alt="Descarga"
                      title="Modifica esta imagen"
                    />
                  ) : (
                    <FaUserAlt
                      className="avatar__label"
                      title="Descargar avatar"
                    />
                  )}

                  {avatar ? (
                    <img
                      className="registro__imagen-preview"
                      src={URL.createObjectURL(avatar)}
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
                  onChange={handleAvatarChange}
                />
              </li>
            </ul>
            <Button texto={"Guardar cambios"} className={"btn--primary"} />
          </form>
        )}

        {modalType === "email" && (
          <form onSubmit={handleUpdateEmail}>
            <h3>{usuario?.email}</h3>
            <label htmlFor="email">Nuevo E-mail:</label>
            <input
              className="input__email"
              type="email"
              name="email"
              id="email"
              required
            />

            <label htmlFor="passwordEmail">Escribe tu Contraseña:</label>
            <input
              className="input__email"
              type="password"
              name="password"
              id="passwordEmail"
              required
            />

            <button type="submit" className="btn--primary">
              Guardar cambios
            </button>
          </form>
        )}

        {modalType === "contraseña" && (
          <form onSubmit={handleUpdatePassword}>
            <label htmlFor="password">Contraseña actual:</label>
            <input
              className="input__password"
              type="password"
              name="password"
              required
            />

            <label htmlFor="nuevoPassword">Nueva Contraseña:</label>
            <input
              className="input__password"
              type="password"
              name="nuevoPassword"
              required
            />

            <label htmlFor="confirmNuevoPassword">
              Confirmar nueva contraseña:
            </label>
            <input
              className="input__password"
              type="password"
              name="confirmPassword"
              required
            />

            <button type="submit" className="btn--primary">
              Guardar cambios
            </button>
          </form>
        )}

        {modalType === "eliminar" && (
          <div className="modal__content">
            <p>
              Si estás seguro de eliminar tu cuenta escribe tu contraseña y
              acepta
            </p>

            <form onSubmit={handleDeleteUser}>
              <label htmlFor="password">Contraseña</label>
              <input
                className="input__password"
                type="password"
                name="password"
                required
              />
              <div className="modal__actions">
                <button className="btn--secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button className="btn--danger">Eliminar cuenta</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </section>
  );
};
