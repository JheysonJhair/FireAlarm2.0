export const fetchNotify = async () => {
  try {
    const response = await fetch(
      "https://firealarm.ccontrolz.com/mensaje/getall"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const deleteMensaje = async (id) => {
  try {
    const response = await fetch(
      `https://firealarm.ccontrolz.com/mensaje/delete?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Mensaje eliminado exitosamente");
    } else {
      throw new Error("Error al eliminar el mensaje");
    }
  } catch (error) {
    console.error("Error al eliminar el mensaje:", error);
  }
};

export const updateMensaje = async (idMensaje, estado) => {
  try {
    const response = await fetch(
      "https://firealarm.ccontrolz.com/mensaje/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdMensaje: idMensaje,
          Estado: estado,
        }),
      }
    );

    if (response.ok) {
      console.log("Mensaje actualizado exitosamente");
    } else {
      throw new Error("Error al actualizar el mensaje");
    }
  } catch (error) {
    console.error("Error al actualizar el mensaje:", error);
  }
};

export const enviarNotificacion = async () => {
  const url = "https://fcm.googleapis.com/fcm/send";
  const body = {
    to: "/topics/test",
    notification: {
      body: "Se esta pr",
      title: "Alerta de incendio! 🔥",
      subtitle: "El evento se presento hoy día...",
      image:
        "https://images.freeimages.com/images/large-previews/e4f/un-fueguito-little-fire-1190570.jpg",
    },
  };
  const headers = {
    Authorization:
      "key=AAAA7OV-iwM:APA91bHtYo0svwGvsdkI8xdJ-5HhRvJVEb6ffEB9pKWzBjTAMEIfpaGUUKBFHIjGYHfxyYmSIqnV0BbDh1Zi1kPzKR8mqxVHy0V_D3FEUlcTqT6qD9xEKAX8uPeyXnlbGhYUCYegS2G7",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("Respuesta de FCM:", data);
    return data;
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
    throw error;
  }
};
