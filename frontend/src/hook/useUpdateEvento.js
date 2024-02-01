import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEventoService } from "../services/eventosServices";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

export const useUpdateEvento = (id) => {
  const [eventoModificado, setEventoModificado] = useState([]);
  const [sending, setSending] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const loadEventos = async () => {
      try {
        if (clicked) {
          setSending(true);

          await updateEventoService({ data: eventoModificado, id, token });
          navigate("/dashboard/eventos");
          toast.success("Evento modificado exitosamente!!.");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSending(false);
        setClicked(false);
      }
    };

    loadEventos();
  }, [clicked, eventoModificado, navigate, id, token]);

  return { setEventoModificado, eventoModificado, sending, setClicked };
};
