import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEventoService } from "../services/eventosServices";

export const useUpdateEvento = (id) => {
  const [eventoModificado, setEventoModificado] = useState([]);
  const [sending, setSending] = useState(false);
  const [fallo, setFallo] = useState("");
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MzQ5MDQyLCJleHAiOjE3MDY0MzU0NDJ9.8EvKdaYV-ABxUsTZohR8EoLxXA0oBW-HHQsgbvS-YKM";

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
  }, [clicked, eventoModificado, navigate, id]);

  return { setEventoModificado, eventoModificado, sending, fallo, setClicked, setFallo };
};
