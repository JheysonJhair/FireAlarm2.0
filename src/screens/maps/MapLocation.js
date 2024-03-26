import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import Buttonn from "../../components/forms/Buttonn";
import StatusModal from "../../components/modals/StatusModal ";
import { useNavigation } from "@react-navigation/native";

function MapLocation() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);

  };

  const handleLocation = () => {
    setModalStatus("success");
    setModalVisible(true);
    setText("Ubicacion seleccionado");
    setText2("La ubicacion del incendio ah sido actualizado");
    navigation.navigate('Home', { selectedLocation });
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
              source={require("../../assets/img/fuego.png")} 
              style={{ width: 30, height: 34 }} 
            />
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Buttonn
          title="Aceptar "
          onPress={handleLocation}
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
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    bottom: 20,
    right: 8,
    zIndex: 1,
  },
});

export default MapLocation;
