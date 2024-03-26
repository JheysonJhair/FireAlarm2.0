import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const Button = ({ onPress, title }) => {
  const textColor = title === "Reportar" ? "black" : "white";

  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <View style={styles.content}>
        <Text style={[styles.textoBoton, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "transparent",
    borderColor: "#C6CBD9",
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  textoBoton: {
    fontSize: 19,
    fontFamily: "Montserrat_800ExtraBold",
  },
});

export default Button;
