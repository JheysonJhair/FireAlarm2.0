import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Button from '../../components/forms/Button';
import {fetchFireLocations} from '../../api/apiGetFire';

function MapLocationScreen({route}) {
  const navigation = useNavigation();
  const {notification} = route.params;

  const latitude = notification ? parseFloat(notification.Latitud) : 0;
  const longitude = notification ? parseFloat(notification.Longitud) : 0;

  const [fireLocations, setFireLocations] = useState([]);

  const handleAccept = () => {
    const data = { accepted: true };
    navigation.navigate('Information', { notification,acceptedData: data  });
  };
  
  const handleReject = () => {
    navigation.goBack();
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const locations = await fetchFireLocations();
      setFireLocations(locations);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -13.6394,
          longitude: -72.8814,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Nueva Ubicación"
          image={require('../../assets/fuego.png')}
        />

        {fireLocations.length > 0 &&
          fireLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(location.latitud),
                longitude: parseFloat(location.longitud),
              }}
              title={`Temperatura: ${location.temperature}`}
              description={`Fecha: ${location.date}`}
              image={require('../../assets/img/fuego.png')}
            />
          ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Aceptar" onPress={handleAccept} />
        <Button
          title="Rechazar"
          onPress={handleReject}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002854',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    textAlign: 'center',
    width: '30%',
    justifyContent: 'center',
    bottom: 20,
    right: 8,
    zIndex: 1,
  },
});

export default MapLocationScreen;
