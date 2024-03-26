import React from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapUser = ({ route }) => {
    const { latitude, longitude } = route.params;
    
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);
  
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parsedLatitude,
            longitude: parsedLongitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={{ latitude: parsedLatitude, longitude: parsedLongitude }}>
            <Image
              source={require("../../assets/persona.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        </MapView>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapUser;
