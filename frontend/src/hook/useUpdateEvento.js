import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEventoService } from "../services/eventosServices";
import { useToken } from "../services/useToken";

export const useUpdateEvento = (id) => {
  const [eventoModificado, setEventoModificado] = useState([]);
  const [sending, setSending] = useState(false);
  const [fallo, setFallo] = useState("");
  const [clicked, setClicked] = useState(false);
  const { token } = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const loadEventos = async () => {
      try {
        if (clicked) {
          setSending(true);

          await updateEventoService({ data: eventoModificado, id, token });
          navigate("/dashboard/eventos");
        }
      } catch (error) {
        setFallo(error.message);
      } finally {
        setSending(false);
        setClicked(false);
      }
    };

    loadEventos();
  }, [clicked, eventoModificado, navigate, id, token]);

  return { setEventoModificado, eventoModificado, sending, fallo, setClicked, setFallo };
};
