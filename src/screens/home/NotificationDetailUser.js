import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/FontAwesome";

function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function NotificationDetailUser({ route }) {
  const { reporte, direccion } = route.params; 
  const navigation = useNavigation();

  const handleMapNavigation = () => {
    console.log(reporte.Latitud, reporte.Longitud)
    navigation.navigate('MapScreen', { latitude: reporte.Latitud, longitude: reporte.Longitud });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: reporte.Imagen }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>UBICACIÓN: {reporte.direccion}</Text> 
        <Text style={styles.date}>
          Fecha del suceso: {formatDateString(reporte.Fecha)}
        </Text>
        <Text style={styles.title2}>Indicación:</Text>
        <Text style={styles.description}>{reporte.Descripcion}</Text>
        <TouchableOpacity style={styles.mapButton} onPress={handleMapNavigation}>
          <Ionicons name="map-marker" size={24} color="#fff" style={styles.mapIcon} />
          <Text style={styles.mapButtonText}>VER EN EL MAPA</Text>
        </TouchableOpacity>
        <View style={styles.linea}>
          <Text style={styles.title2}>Caso: Admitido</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 260,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title2: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: "#777",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#777",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#47a0ff",
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
    fontWeight: "bold",
    color: "#fff",
  },
  linea: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
});

export default NotificationDetailUser;
