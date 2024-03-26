export const fetchFireLocations = async () => {
  try {
    const response = await fetch(
      'https://firealarm.ccontrolz.com/tsatelite/getall',
    );
    const json = await response.json();
    const filteredLocations = json.value.filter(
      location => location.temperature > 60,
    );
    return filteredLocations;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const insertFireLocations = async (latitude, longitude, temperature) => {
  try {
    const response = await fetch(
      'https://firealarm.ccontrolz.com/tsatelite/insertar',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitud: latitude,
          longitud: longitude,
          temperature: temperature,
        }),
      },
    );

    if (response.ok) {
      return 'termino';
    } else {
      throw new Error(`Error en la solicitud POST: ${response.status}`);
    }
  } catch (error) {
    console.error('Error al enviar la solicitud POST:', error);
    throw error;
  }
};
