import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "#29364c",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 15,
    width: "100%",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});

export default Button;
