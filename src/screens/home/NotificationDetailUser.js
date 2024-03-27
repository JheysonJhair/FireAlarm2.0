import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/FontAwesome';

function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const getStatusText = estado => {
  switch (estado) {
    case 0:
      return 'No atendido';
    case 1:
      return 'En camino';
    case 2:
      return 'Controlado';
    case 3:
      return 'Rechazado';
    default:
      return '';
  }
};

function NotificationDetailUser({route}) {
  const {reporte} = route.params;
  const navigation = useNavigation();

  const handleMapNavigation = () => {
    navigation.navigate('MapScreen', {
      latitude: reporte.Latitud,
      longitude: reporte.Longitud,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: reporte.Imagen}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>DETALLES DEL REPORTE</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Fecha del suceso:</Text>
          <Text style={styles.infoText}>{formatDateString(reporte.Fecha)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Dirección:</Text>
          <Text style={styles.infoText}>{reporte.direccion}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Indicación:</Text>
          <Text style={styles.infoText}>{reporte.Descripcion}</Text>
        </View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={handleMapNavigation}>
          <Ionicons name="map" size={24} color="#fff" style={styles.mapIcon} />
          <Text style={styles.mapButtonText}>VER EN EL MAPA</Text>
        </TouchableOpacity>
        <View style={styles.linea} />
        <Text style={styles.status}>
          SITUACION DEL CASO: {getStatusText(reporte.Estado)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 260,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#29364c',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#29364c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  mapIcon: {
    marginRight: 10,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#777',
  },
  linea: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
  },
  status: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default NotificationDetailUser;
