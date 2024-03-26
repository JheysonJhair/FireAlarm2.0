import React, { useState } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView } from "react-native";

import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.h1}>Contraseña Olvidada</Text>
      <Text style={styles.h2}>
        Te enviaremos tu código de recuperación a tu correo electrónico.
      </Text>
      <View style={styles.formContainer}>
        <Input
          placeholder="Correo Electrónico"
          onChangeText={() => onsole.log("vacio")}
        />
        <Button title="Siguiente" />
      </View>

      <View style={styles.terminos}>
        <Text style={styles.h3}>Nuestros Términos y Condiciones</Text>
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
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    width: "60%",
    textAlign: "center",
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 36,
    color: "#000",
    marginBottom: 5,
    marginTop: 20,
  },
  h2: {
    width: "100%",
    textAlign: "center",
    color: "#A3AABF",
    fontSize: 17,
    marginBottom: 20,
    marginTop: 10,
  },
  terminos: {
    position: "absolute",
    bottom: 70,
  },
  h3: {
    color: "#A3AABF",
    fontSize: 13,
  },
});

export default ForgetPassword;
