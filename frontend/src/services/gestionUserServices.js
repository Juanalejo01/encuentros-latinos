export const registerUserService = async ({ data }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/registro`,
      {
        method: "POST",
        body: data,
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }
    return json.mensaje;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.mensaje);
  }
  return json;
};

export const getUserService = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/perfil`, {
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

export const updateUserService = async (data, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/perfil`, {
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

    return json;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateEmailService = async (data, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/email`, {
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

    return json;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updatePasswordService = async (data, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/password`,
      {
        method: "PUT",
        body: data,
        headers: {
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensaje);
    }

    return json;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const deleteUserService = async (password, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/perfil`, {
      method: "DELETE",
      body: JSON.stringify({ password }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
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
