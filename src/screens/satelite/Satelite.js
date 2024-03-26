import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Image } from "react-native";
import Button2 from "../../components/forms/Button2";
import MapView, { Marker } from "react-native-maps";

import { fetchFireLocations } from "../../api/apiFire";
import StatusModal from "../../components/modals/StatusModal ";
import { enviarNotificacion } from '../../api/apiFire';

export default function Satelite() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [temperature, setTemperature] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleTemperatureChange = (text) => {
    setTemperature(text);
  };

  const handleFireSimulation = async () => {
    if (!selectedLocation) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Ubicación no válida");
      setText2("Selecciona una ubicación en el mapa.");
      return;
    }

    if (!temperature) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Temperatura no válida");
      setText2("Ingresa una temperatura.");
      return;
    }

    const { latitude, longitude } = selectedLocation;

    try {
      const response = await fetchFireLocations(
        latitude,
        longitude,
        temperature
      );
      if (response == "termino") {
        setModalStatus("success");
        setModalVisible(true);
        setText("Proceso terminado con éxito");
        setText2("La simulación de incendio ha sido completada correctamente.");
        enviarNotificacion();
      } else {
        setModalStatus("error");
        setModalVisible(true);
        setText("Error en el servidor");
        setText2(
          "Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error(
        "Error al enviar la solicitud de simulación de incendio:",
        error
      );
      setModalStatus("error");
      setModalVisible(true);
      setText("Error en la solicitud");
      setText2(
        "Hubo un problema al enviar la solicitud. Por favor, verifica tu conexión e inténtalo de nuevo."
      );
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simular Fuego</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -13.6394,
          longitude: -72.8814,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <Image
              source={require("../../assets/fuego.png")} 
              style={{ width: 30, height: 34 }} 
            />
          </Marker>
        )}
      </MapView>

      <View style={styles.containerForm}>
        <TextInput
          style={[styles.input, { width: "15%" }]}
          placeholder="Temp"
          onChangeText={handleTemperatureChange}
          keyboardType="numeric"
          maxLength={2}
        />

        <Button2
          title="Incendio"
          onPress={handleFireSimulation}
          style={{ width: "70%", backgroundColor: "#212834" }}
        />
      </View>
      <StatusModal
        visible={modalVisible}
        status={modalStatus}
        text={text}
        text2={text2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212834",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  containerForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: "100%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#212834",
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#212834",
    width: "100%",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
});
