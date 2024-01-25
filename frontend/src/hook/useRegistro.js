import { useEffect, useState } from "react";
import { registerUserService } from "../services/gestionUserServices";

export const useRegistro = () => {
  const [usuario, setUsuario] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const sendUsuarios = async () => {
      try {
        if (clicked) {
          setSending(true);

          const texto = await registerUserService({ data: usuario });
          setMensaje(texto);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setSending(false);
        setClicked(false);
      }
    };

    sendUsuarios();
  }, [clicked, usuario]);

  return {
    mensaje,
    setUsuario,
    usuario,
    sending,
    error,
    setClicked,
    setError,
  };
};
