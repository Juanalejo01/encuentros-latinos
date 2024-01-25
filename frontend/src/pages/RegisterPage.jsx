import { Button } from "../components/general/Button";
import { useRegistro } from "../hook/useRegistro";

export const RegisterPage = () => {
  const { sending, error, setClicked, setError, setUsuario, mensaje, setMensaje } = useRegistro();

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const imagen = data.get("avatar");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setMensaje("");
      return;
    }

    if (imagen && imagen.size === 0) {
      setError("Debes adjuntar una imagen.");
      setMensaje("");
      return;
    }

    data.delete("confirmPassword");

    setClicked(true);
    setUsuario(data);
  };

  return (
    <section className="layout__registro">
      <h1 className="registro__title">Registro de Usuario</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" required />

        <label htmlFor="apellidos">Apellidos:</label>
        <input type="text" name="apellidos" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input type="password" name="confirmPassword" required />

        <label htmlFor="biografia">Biografia:</label>
        <textarea name="biografia" rows="4" cols="50" />

        <label htmlFor="avatar">Subir Avatar:</label>
        <input type="file" name="avatar" />

        <Button texto={"Registrate"} className={"registro__btn"} />
        {sending ? <p>Creando nuevo usuario...</p> : null}
        {mensaje ? <p>{mensaje}</p> : null}
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
