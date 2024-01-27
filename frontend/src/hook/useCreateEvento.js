import { useEffect, useState } from "react";
import { createEventoService } from "../services/eventosServices";
import { useNavigate } from "react-router-dom";

export const useCreateEvento = () => {
  const [evento, setEvento] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MzQ5MDQyLCJleHAiOjE3MDY0MzU0NDJ9.8EvKdaYV-ABxUsTZohR8EoLxXA0oBW-HHQsgbvS-YKM";

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
  }, [clicked, evento, navigate]);

  return { setEvento, evento, sending, error, setClicked, setError };
};
