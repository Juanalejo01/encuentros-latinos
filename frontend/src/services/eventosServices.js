export const getAllEventosService = async (tematica, ciudad) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/eventos?tematica=${tematica}&ciudad=${ciudad}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.mensaje);
  }

  return json.filtro;
};

export const getEventoService = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/evento/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.mensaje);
  }

  return json;
};
