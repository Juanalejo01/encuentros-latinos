import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { updateEventoService } from "../services/eventosServices";

export const useActualizarUsuario = () => {
  const [usuario, setUsuario] = useState({});
  const [sending, setSending] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sendUsuario = async () => {
      try {
        if (clicked) {
          setSending(true);

          await updateEventoService({ data: usuario });
          navigate("/perfil");
          toast.success(
            "Los datos del usuario se han actualizado correctamente."
          );
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSending(false);
        setClicked(false);
      }
    };

    sendUsuario();
  }, [clicked, usuario, navigate]);

  return {
    setUsuario,
    sending,
    setClicked,
  };
};
