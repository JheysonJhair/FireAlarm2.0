import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator 
} from "react-native";
import Button from "../../components/forms/Button";
import TextArea from "../../components/forms/TextArea";
import ImagePickerComponent from "../../components/forms/ImagePickerComponent ";
import { useUser } from "../../hooks/UserContext";
import { useNavigation } from "@react-navigation/native";
import { registerIncendio } from "../../api/apiUser";
import StatusModal from "../../components/modals/StatusModal ";

const maps = require("../../assets/img/maps.png");

export default function Home({ route }) {
  const navigation = useNavigation();
  const { userData } = useUser();
  const [descripcion, setDescripcion] = useState("");
  const [image, setImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const MAX_CARACTERES = 80;

  const handleDescripcionChange = (text) => {
    if (text.length <= MAX_CARACTERES) {
      setDescripcion(text);
    }
  };

  const handleImageSelected = (imageUri) => {
    setImage(imageUri);
  };

  const handleUbication = () => {
    navigation.navigate("mapLocation");
  };

  const handleNotificar = async () => {
    if (!descripcion || !image || !selectedLocation) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Campos vacios");
      setText2("Complete todos los campos, es necesario!");
      return;
    }
    try {

      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: "file",
      });

      formData.append("Descripcion", descripcion);
      formData.append("Latitud", selectedLocation.latitude);
      formData.append("Longitud", selectedLocation.longitude);
      formData.append("IdUsuario", userData.IdUsuario);

      const response = await registerIncendio(formData);

      if (response.data.msg == "Se creo correctamente") {
        setDescripcion("");
        setImage(null);
        setSelectedLocation(null)
        setIsLoading(false);
        setModalStatus("success");
        setModalVisible(true);
        setText(" Incendio reportado!");
        setText2("Tu registro fue enviado satisfactoriamente!!");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar incendio:", error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  return (
    <View style={styles.contentContainer}>
          {isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e4466" />
      </View>
    ) : (
      <View style={styles.content}>
        <View>
          <Text style={styles.h1}>FireAlarm</Text>
          <Text style={styles.h2}>Señala aquí lo que está pasando</Text>
        </View>
        <ScrollView style={styles.containerBac}>
          <View>
            <ImagePickerComponent onImageSelected={handleImageSelected} />
            <View style={styles.formSection}>
              <Text style={styles.label}>Descripción Corta</Text>
              <TextArea
                placeholder="Qué esta pasando?"
                onChangeText={handleDescripcionChange}
                value={descripcion}
              />
              <Text style={styles.caracteresRestantes}>
                {MAX_CARACTERES - descripcion.length} caracteres restantes
              </Text>
            </View>
            <View>
              <Text style={styles.label}>
                Seleccione la ubicación del incendio
              </Text>
              <View style={styles.containerImage}>
                <TouchableOpacity onPress={handleUbication}>
                  <ImageBackground
                    source={maps}
                    style={styles.imageBackground}
                    resizeMode="cover"
                  ></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ubicacionContainer}>
              <Text style={styles.label2}>Ubicacion: </Text>
              <Text style={styles.label3}>
                {selectedLocation ? "Seleccionado" : "No seleccionado"}
              </Text>
            </View>

            <View>
              <Button title="Notificar" onPress={handleNotificar} />
            </View>
          </View>
        </ScrollView>
      </View>
      )}
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
  containerBac: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  contentContainer: {
    flex: 1,

    justifyContent: "center",
  },
  formSection: {
    marginBottom: 10,
  },
  caracteresRestantes: {
    fontSize: 12,
    color: "#8c8c8c",
  },
  //
  h1: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 29,
    color: "#000000",
    marginBottom: 5,
    marginTop: 40,
    textAlign: "center",
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  //
  profileOptionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    width: "90%",
    borderTopWidth: 1,
    borderTopColor: "#ededed",
  },
  profileOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  label: {
    marginTop: 5,
    marginBottom: 14,
    fontSize: 16,
    color: "#000000",
    fontFamily: "Montserrat_800ExtraBold",
  },
  label2: {
    marginTop: 5,
    marginBottom: 14,
    fontSize: 16,
    color: "#000000",
  },
  label3: {
    marginTop: 5,
    marginBottom: 14,
    fontSize: 17,
    color: "#393ea0",
    fontWeight: "bold",
  },
  containerImage: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  ubicacionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
