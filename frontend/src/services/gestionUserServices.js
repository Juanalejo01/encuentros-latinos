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
