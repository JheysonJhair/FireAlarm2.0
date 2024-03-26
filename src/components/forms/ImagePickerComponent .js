import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  PermissionsAndroid 
} from "react-native";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePickerComponent = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);
  const options = {
    mediaType: 'photo',
    title: 'Select Image',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.8,
  };

  const handleSelectPhoto = async () => {
    const result = await launchImageLibrary(options);
    if (!result.didCancel) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      if (!result.didCancel) {
        setImage(result.assets[0].uri);
        onImageSelected(result.assets[0].uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contButton}>
        <TouchableOpacity style={[styles.button, styles.buttonLarge]} onPress={handleSelectPhoto}>
          <Text style={styles.buttonText}>Seleccionar de galería</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSmall]} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}><Ionicons name="camera" size={21} color="white" /></Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {!image && (
        <View style={styles.placeholder}>
          <Ionicons name="image" size={30} color="#3c4e70" />
          <Text style={styles.placeholderText}>Selecciona una imagen</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 5,
    width: "100%",
    height: 200,
  },
  button: {
    backgroundColor: "#3c4e70",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 45,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: "stretch",
    marginTop: 4,
    borderRadius: 5,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 50, 0.1)",
    width: "100%",
  },
  placeholderText: {
    color: "#3c4e70",
    marginTop: 10,
  },
  //
  contButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSmall: {
    flex: 1, 
    marginLeft: 10, 
  },
  buttonLarge: {
    flex: 10, 
  },
});

export default ImagePickerComponent;
