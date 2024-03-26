import axios from "axios";

//Login
export const loginUser = async (email, password) => {
  try {
    const response = await fetch("https://firealarm.ccontrolz.com/usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Contrasena: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

//Registrar
export const registerUser = async ({
  Email,
  Contrasena,
  Nombre,
  Apellido,
  Telefono,
}) => {
  try {
    const response = await axios.post(
      "https://firealarm.ccontrolz.com/usuario/insert",
      {
        Email,
        Contrasena,
        Nombre,
        Apellido,
        Telefono,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

