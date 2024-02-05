import { useRef, useState } from "react";
import { Button } from "../components/general/Button";
import { useActualizarUsuario } from "../hook/useUpdateUsuario";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../components/general/Modal";

export const ActualizarUsuarios = () => {
  const [avatar, setAvatar] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const { setUsuario, setClicked } = useActualizarUsuario();
  const navigate = useNavigate();

  const usuarioInicial = {
    nombre: "",
    apellidos: "",
    biografia: "",
    avatar: null,
    password: "",
    confirmPassword: "",
  };
  const [usuario, setUsuarioState] = useState(usuarioInicial);

  const fileInputRef = useRef();

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
    setClicked(true);
    setUsuario(usuario);
    navigate("/perfil");
    handleCloseModal();
  };

  const handleDeleteUser = async () => {
    setClicked(true);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    setUsuarioState({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const imagenUrl = usuario ? `${import.meta.env.VITE_APP_BACKEND}/${usuario.avatar}` : "";

  return (
    <section className="actualizar__registro">
      <header className="actualizar__header">
        <h2 className="actualizar__title">Editar mis Datos</h2>
      </header>

      <div className="actualizar__content-btn">
        <div className="actualizar__datos">
          <Button
            texto={"Datos e información"}
            className={"actualizar__datos__btn"}
            onClick={() => handleOpenModal("datos")}
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
          <form className="formulario__actualizar-datos" onSubmit={handleUpdateUser}>
            <ul className="actualizar-datos__content">
              <li>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  className="input__nombre"
                  type="text"
                  name="nombre"
                  tabIndex={1}
                  required
                  onChange={handleInputChange}
                />
              </li>
              <li>
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  className="input__apellidos"
                  type="text"
                  name="apellidos"
                  tabIndex={2}
                  required
                  onChange={handleInputChange}
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
                  tabIndex={3}
                  required
                  onChange={handleInputChange}
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
            <Button
              texto={"Guardar cambios"}
              className={"btn--primary"}
              onClick={() => alert("Guardar cambios")}
            />
          </form>
        )}

        {modalType === "contraseña" && (
          <form onSubmit={handleUpdateUser}>
            <label htmlFor="password">Contraseña:</label>
            <input
              className="input__password"
              type="password"
              name="password"
              id="password"
              tabIndex={1}
              required
              onChange={handleInputChange}
            />

            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              className="input__password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              tabIndex={2}
              required
              onChange={handleInputChange}
            />

            <button type="submit" className="btn--primary" tabIndex={3}>
              Guardar cambios
            </button>
          </form>
        )}

        {modalType === "eliminar" && (
          <div className="modal__content">
            <p>
              ¿Estás seguro de que deseas eliminar tu cuenta y todos tus datos de forma permanente?
            </p>
            <div className="modal__actions">
              <button className="btn--secondary" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="btn--danger" onClick={handleDeleteUser}>
                Eliminar cuenta
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
