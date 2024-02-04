import { useState } from "react";
import { Button } from "../components/general/Button";
import Modal from "../components/general/Modal";

export const ActualizarUsuarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleOpenModal = (type) => {
    setModalOpen(true);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
  };

  const handleDeleteUser = async () => {};

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
            {/* Aquí puedes agregar los campos para editar los datos del usuario */}
            <button type="submit">Guardar cambios</button>
          </form>
        )}
        {modalType === "contraseña" && (
          <form onSubmit={handleUpdateUser}>
            {/* Aquí puedes agregar los campos para editar la contraseña */}
            <button type="submit">Guardar cambios</button>
          </form>
        )}
        {modalType === "eliminar" && (
          <div>
            <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
            <button onClick={handleDeleteUser}>Sí, eliminar mi cuenta</button>
          </div>
        )}
      </Modal>
    </main>
  );
};
