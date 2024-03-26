import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 

import { fetchFireLocations } from '../../api/apiGetFire';

function MapLocationScreen({ route }) {
  const navigation = useNavigation();
  const { notification } = route.params;

  const latitude = notification ? parseFloat(notification.Latitud) : 0;
  const longitude = notification ? parseFloat(notification.Longitud) : 0;

  const [fireLocations, setFireLocations] = useState([]);

  const handleAccept = () => {
    const data = { accepted: true };
    navigation.navigate('Information', { notification, acceptedData: data });
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
          image={require('../../assets/bombero.png')}
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
              description={`Fecha: ${location.date}`}>
              <Image
                source={require('../../assets/img/fuego.png')}
                style={{ width: 33, height: 33 }}
              />
            </Marker>
          ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}  onPress={handleAccept}>
          <FontAwesome5 name="check" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
          <FontAwesome5 name="times" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 20,
    right: 8,
    zIndex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3c5070',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft:10
  },
  rejectButton: {
    backgroundColor: '#f20000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default MapLocationScreen;
