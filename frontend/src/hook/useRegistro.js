import { useEffect, useState } from "react";
import { registerUserService } from "../services/gestionUserServices";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegistro = () => {
  const [usuario, setUsuario] = useState([]);
  const [sending, setSending] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sendUsuarios = async () => {
      try {
        if (clicked) {
          setSending(true);

          const texto = await registerUserService({ data: usuario });
          navigate("/login");
          toast.success(texto);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSending(false);
        setClicked(false);
      }
    };

    sendUsuarios();
  }, [clicked, usuario, navigate]);

  return {
    setUsuario,
    usuario,
    sending,
    setClicked,
  };
};
