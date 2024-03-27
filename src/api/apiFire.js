export const fetchNotify = async () => {
  try {
    const response = await fetch(
      'https://firealarm.ccontrolz.com/mensaje/getall',
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const deleteMensaje = async id => {
  try {
    const response = await fetch(
      `https://firealarm.ccontrolz.com/mensaje/delete?id=${id}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      console.log('Mensaje eliminado exitosamente');
    } else {
      throw new Error('Error al eliminar el mensaje');
    }
  } catch (error) {
    console.error('Error al eliminar el mensaje:', error);
  }
};

export const updateMensaje = async (idMensaje, estado) => {
  try {
    const response = await fetch(
      'https://firealarm.ccontrolz.com/mensaje/update',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IdMensaje: idMensaje,
          Estado: estado,
        }),
      },
    );

    if (response.ok) {
      console.log('Mensaje actualizado exitosamente');
    } else {
      throw new Error('Error al actualizar el mensaje');
    }
  } catch (error) {
    console.error('Error al actualizar el mensaje:', error);
  }
};

export const enviarNotificacionEncamino = async () => {
  const url = 'https://fcm.googleapis.com/fcm/send';
  const body = {
    to: '/topics/test',
    notification: {
      title: '¡Alerta de incendio! 🔥',
      subtitle: 'El evento se presentó hoy día...',
      body: 'Los equipos de emergencia y la valiente respuesta de los bomberos, el fuego está siendo controlado eficazmente.',
      image: 'https://cdn-icons-png.flaticon.com/512/122/122492.png',
    },
  };
  const headers = {
    Authorization:
      'key=AAAAVqJ9rvU:APA91bH89dy6NLcpsKjFeIy03GzEvwQDTu70r5SjZbleCHF7bU-jJv2UHQR5CPq6181s9gQUHKRVS9-dsWvMtajCcElOfV5GBkIx6CGWR7hLhXgN5fIm5REkpea-ZU6P5VlnKHMwf0I9',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('Respuesta de FCM:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
    throw error;
  }
};

export const enviarNotificacionControlado = async () => {
  const url = 'https://fcm.googleapis.com/fcm/send';
  const body = {
    to: '/topics/test',
    notification: {
      title: 'Fuego controlado! 🔥',
      subtitle: 'El evento se solucionó hoy día',
      body: 'Los equipos de emergencia y la valiente respuesta de los bomberos, terminaron eficazmente.',
      image: 'https://cdn-icons-png.flaticon.com/512/122/122492.png',
    },
  };
  const headers = {
    Authorization:
      'key=AAAAVqJ9rvU:APA91bH89dy6NLcpsKjFeIy03GzEvwQDTu70r5SjZbleCHF7bU-jJv2UHQR5CPq6181s9gQUHKRVS9-dsWvMtajCcElOfV5GBkIx6CGWR7hLhXgN5fIm5REkpea-ZU6P5VlnKHMwf0I9',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('Respuesta de FCM:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
    throw error;
  }
};
