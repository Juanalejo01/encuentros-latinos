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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MjYyMTIyLCJleHAiOjE3MDYzNDg1MjJ9.xv2gqvDlfs9Q03owhlYLHyI_ZMKoiDVx-lBN_Z8-drQ";

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
