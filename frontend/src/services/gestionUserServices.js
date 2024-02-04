import React from "react";
import { AuthContext } from "../context/AuthContext";

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

export function useUpdateUserService({ data }) {
  const { token } = React.useContext(AuthContext);

  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const updateUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/perfil`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  return updateUser;
}
