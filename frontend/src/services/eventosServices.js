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

export const getAllEventosByUserService = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/usuario`, {
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const createEventoService = async ({ data, token }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/evento`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const eliminarEventoService = async (id, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/evento/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json.mensaje;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const getEventoByUserService = async (id, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/usuario/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }
    return json.datos;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateEventoService = async ({ data, id, token }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/evento/${id}`, {
      method: "PUT",
      body: data,
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const altaUsuarioEventoService = async (id, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/inscription/${id}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const bajaUsuarioEventoService = async (id, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/inscription/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json.mensaje;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const listadoUsuariosEventoService = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/inscriptiones/${id}`);

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
