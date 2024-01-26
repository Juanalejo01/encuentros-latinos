import { useEffect, useState } from "react";
import { eliminarEventoService } from "../services/eventosServices";

export const useDeleteEvento = () => {
  const [eventoId, setEventoId] = useState(null);
  const [sending, setSending] = useState(false);
  const [fallo, setFallo] = useState("");
  const [clicked, setClicked] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MjYyMTIyLCJleHAiOjE3MDYzNDg1MjJ9.xv2gqvDlfs9Q03owhlYLHyI_ZMKoiDVx-lBN_Z8-drQ";

  useEffect(() => {
    const deleteEvento = async () => {
      try {
        if (clicked) {
          setSending(true);

          const texto = await eliminarEventoService(eventoId, token);
          setMensaje(texto);
        }
      } catch (error) {
        setFallo(error.message);
        setMensaje("");
      } finally {
        setSending(false);
        setClicked(false);
      }
    };

    deleteEvento();
  }, [clicked, eventoId]);

  return {
    mensaje,
    setEventoId,
    eventoId,
    sending,
    fallo,
    setClicked,
    setFallo,
    setMensaje,
  };
};
