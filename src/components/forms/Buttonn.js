import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Buttonn = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#aaaaaa" : "#29364c" },
      ]}
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
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});

export default Buttonn;
