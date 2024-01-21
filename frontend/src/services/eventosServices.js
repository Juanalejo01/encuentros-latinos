export const getAllEventosService = async (tematica, ciudad) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/eventos?tematica=${tematica}&ciudad=${ciudad}`
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json.filtro;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getEventoService = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/evento/${id}`);

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
