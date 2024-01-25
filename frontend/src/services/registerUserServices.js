export const registerUserService = async (
  nombre,
  apellidos,
  email,
  password,
  biografia,
  avatar
) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      apellidos,
      email,
      password,
      biografia,
      avatar,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
