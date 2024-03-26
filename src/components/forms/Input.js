import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, onChangeText, value, isVerified }) => {
  return (
    <TextInput
      style={[styles.input, isVerified && styles.disabledInput]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
      placeholderTextColor="#a8b0c4"
      editable={!isVerified}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#edf0f7",
    borderColor: "#a8b0c4",
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    color: "#000",
    fontSize: 16,
    width: "100%",
    marginBottom: 8,
  },
  disabledInput: {
    opacity: 0.6,
  },
});

export default Input;
