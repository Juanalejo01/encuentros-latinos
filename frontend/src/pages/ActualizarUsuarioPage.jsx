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

import "../css/usuario/usuario.css";

export const ActualizarUsuarios = () => {
  const { token, logoutHandler, actualizarSidebar } = useContext(AuthContext);
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

  if (error) {
    return <PaginaNoFound />;
  }

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
      localStorage.setItem("nombre", datos.usuario.nombre);
      localStorage.setItem("avatar", datos.usuario.avatar);
      actualizarSidebar();
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

  const imagenUrl = usuario ? `${import.meta.env.VITE_APP_BACKEND}/${usuario?.avatar}` : "";

  return (
    <section className="actualizar__registro">
      <header className="actualizar__header">
        <h2 className="actualizar__title">Mis Datos</h2>
      </header>
      <div className="actualizar__content">
        <div className="actualizar__info">
          <div className="actualizar__info-imagen">
            {loading ? (
              <div className="spinner__info-avatar">
                <span className="spinner"></span>
              </div>
            ) : (
              <img className="actualizar__info-avatar" src={imagenUrl} alt="avatar del usuario" />
            )}
          </div>
          <ul className="actualizar__info-listado">
            <li className="actualizar__info-email">
              <span className="label__datos">Correo: </span>
              {usuario.email}
            </li>
            <li className="actualizar__info-nombre">
              <span className="label__datos">Nombre: </span>
              {usuario.nombre} {usuario.apellidos}
            </li>
          </ul>
          <h3 className="label__datos">Biografía:</h3>
          <p className="actualizar__info-biografia">{usuario.biografia}</p>
        </div>
        <div className="actualizar__content-btn">
          <div className="actualizar__datos">
            <Button
              texto={"Editar mis datos"}
              className={"actualizar__datos-btn"}
              onClick={() => handleOpenModal("datos")}
            />
          </div>
          <div className="actualizar__email">
            <Button
              texto={"Cambiar mi E-mail"}
              className={"actualizar__email-btn"}
              onClick={() => handleOpenModal("email")}
            />
          </div>
          <div className="actualizar__password">
            <Button
              texto={"Cambiar Password"}
              className={"actualizar__password-btn"}
              onClick={() => handleOpenModal("contraseña")}
            />
          </div>
          <div className="actualizar__eliminar-usuario">
            <Button
              texto={"Eliminar mi cuenta"}
              className={"eliminar__usuario-btn"}
              onClick={() => handleOpenModal("eliminar")}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalType === "datos" && (
          <section>
            <p className="datos__description">
              <strong>Nota:</strong> Presiona en <strong>{'"Guardar los cambios"'} </strong> para
              aceptar las modificaciones.
            </p>
            <form className="formulario__actualizar-datos" onSubmit={handleUpdateUser}>
              <ul className="actualizar-datos__content">
                <li>
                  <label className="label__datos" htmlFor="nombre">
                    Nombre:
                  </label>
                  <input
                    className="input__nombre-actualizar"
                    type="text"
                    name="nombre"
                    required
                    defaultValue={usuario?.nombre}
                  />
                </li>
                <li>
                  <label className="label__datos" htmlFor="apellidos">
                    Apellidos:
                  </label>
                  <input
                    className="input__apellidos-actualizar"
                    type="text"
                    name="apellidos"
                    required
                    defaultValue={usuario?.apellidos}
                  />
                </li>
                <li>
                  <label className="label__datos" htmlFor="biografia">
                    Biografía:
                  </label>
                  <textarea
                    className="textarea__bio-actualizar"
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
                      loading ? (
                        <div className="spinner__usuario-avatar">
                          <span className="spinner"></span>
                        </div>
                      ) : (
                        <img
                          className="registro__imagen-preview"
                          src={imagenUrl}
                          alt="Descarga"
                          title="Modifica esta imagen"
                        />
                      )
                    ) : (
                      <FaUserAlt className="avatar__label" title="Descargar avatar" />
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
              <div className="modal__actions">
                <button type="submit" className="btn--primary">
                  Guardar cambios
                </button>

                <button className="btn--secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {modalType === "email" && (
          <section>
            <p className="email__description">
              <strong>Nota:</strong> Cuando modifiques tu correo se cerrará la sesión
              automáticamente.
            </p>
            <form className="formulario__actualizar-datos" onSubmit={handleUpdateEmail}>
              <div className="email__content">
                <h3 className="email__title">{usuario.email}</h3>
                <label className="label__datos" htmlFor="email">
                  Nuevo E-mail:
                </label>
                <input
                  className="input__email-actualizar"
                  type="email"
                  name="email"
                  id="email"
                  required
                />

                <label className="label__datos" htmlFor="passwordEmail">
                  Escribe tu Password:
                </label>
                <input
                  className="input__email-actualizar"
                  type="password"
                  name="password"
                  id="passwordEmail"
                  required
                />
              </div>
              <div className="modal__actions">
                <button type="submit" className="btn--primary">
                  Guardar cambios
                </button>
                <button className="btn--secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {modalType === "contraseña" && (
          <section>
            <p className="password__description">
              <strong>Nota:</strong> Cuando modifiques tu contraseña se cerrará la sesión
              automáticamente.
            </p>
            <form className="formulario__actualizar-datos" onSubmit={handleUpdatePassword}>
              <div className="password__content">
                <label className="label__datos" htmlFor="password">
                  Password actual:
                </label>
                <input
                  className="input__password-actualizar"
                  type="password"
                  name="password"
                  required
                />

                <label className="label__datos" htmlFor="nuevoPassword">
                  Nueva Password:
                </label>
                <input
                  className="input__password-actualizar"
                  type="password"
                  name="nuevoPassword"
                  required
                />

                <label className="label__datos" htmlFor="confirmNuevoPassword">
                  Confirmar nueva Password:
                </label>
                <input
                  className="input__password-actualizar"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </div>
              <div className="modal__actions">
                <button type="submit" className="btn--primary">
                  Guardar cambios
                </button>
                <button className="btn--secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {modalType === "eliminar" && (
          <section className="modal__content">
            <p className="eliminar__description">
              <strong>Nota:</strong> Si estás seguro de eliminar tu cuenta escribe tu contraseña y
              presiona en <strong>{'"Aceptar"'}</strong>
            </p>

            <form className="formulario__eliminar-datos" onSubmit={handleDeleteUser}>
              <div className="eliminar__content">
                <label className="label__datos" htmlFor="password">
                  Password:
                </label>
                <input
                  className="input__password-actualizar"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <div className="modal__actions-eliminar">
                <button className="btn--secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button className="btn--danger">Aceptar</button>
              </div>
            </form>
          </section>
        )}
      </Modal>
    </section>
  );
};
