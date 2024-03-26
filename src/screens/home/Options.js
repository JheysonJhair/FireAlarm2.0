import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/forms/Button";
import ButtonTwo from "../../components/forms/ButtonTwo";

const Options = () => {
  const navigation = useNavigation();

  const windowWidth = Dimensions.get("window").width;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/svg/option.png")}
          style={{
            width: windowWidth * 0.9,
            height: undefined,
            aspectRatio: 1,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Button
          title="Mis Reportes"
          onPress={() => navigation.navigate("Reporte")}
        />
        <ButtonTwo
          title="Reportar"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  formContainer: {
    width: "80%",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    position: 'absolute',
    top: -30,
    right: -20,
  },
});

export default Options;
