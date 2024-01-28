import { useEffect, useState } from "react";
import { createEventoService } from "../services/eventosServices";
import { useNavigate } from "react-router-dom";
import { useToken } from "../services/useToken";

export const useCreateEvento = () => {
  const [evento, setEvento] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const { token } = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const loadEventos = async () => {
      try {
        if (clicked) {
          setSending(true);

          await createEventoService({ data: evento, token });
          navigate("/dashboard/eventos");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setSending(false);
        setClicked(false);
      }
    };

    loadEventos();
  }, [clicked, evento, navigate, token]);

  return { setEvento, evento, sending, error, setClicked, setError };
};
