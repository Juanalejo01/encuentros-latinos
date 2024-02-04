import { useRef, useState } from "react";
import { Button } from "../components/general/Button";
import Modal from "../components/general/Modal";
import { useActualizarUsuario } from "../hook/useUpdateUsuario";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ActualizarUsuarios = () => {
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
    setUsuarioState({ ...usuario, avatar: e.target.files[0] });
  };

  return (
    <main className="actualizar__registro">
      <header className="actualizar__header">
        <h2 className="actualizar__title">Editar mis Datos</h2>
      </header>

      <section className="actualizar__content">
        <Button
          texto={"Datos e información"}
          className={"actualizar__datos__btn"}
          onClick={() => handleOpenModal("datos")}
        />
        <Button
          texto={"Contraseña y privacidad"}
          className={"actualizar__contraseña__btn"}
          onClick={() => handleOpenModal("contraseña")}
        />
        <Button
          texto={"Eliminar mi cuenta"}
          className={"eliminar__usuario__btn"}
          onClick={() => handleOpenModal("eliminar")}
        />
      </section>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalType === "datos" && (
          <form onSubmit={handleUpdateUser}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              className="input__nombre"
              type="text"
              name="nombre"
              tabIndex={1}
              required
              onChange={handleInputChange}
            />

            <label htmlFor="apellidos">Apellidos:</label>
            <input
              className="input__apellidos"
              type="text"
              name="apellidos"
              tabIndex={2}
              required
              onChange={handleInputChange}
            />

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

            <label htmlFor="avatar" className="avatar__label">
              {usuario.avatar ? (
                <img
                  src={URL.createObjectURL(usuario.avatar)}
                  alt="Avatar"
                  className="avatar__img"
                />
              ) : (
                <FaUserAlt className="avatar__icon" />
              )}
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                tabIndex={4}
              />
            </label>

            <button type="submit" className="btn--primary" tabIndex={5}>
              Guardar cambios
            </button>
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
              ¿Estás seguro de que deseas eliminar tu cuenta y todos tus datos
              de forma permanente?
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
    </main>
  );
};
