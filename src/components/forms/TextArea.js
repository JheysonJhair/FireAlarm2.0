import React from "react";
import { TextInput, StyleSheet } from "react-native";

const TextArea = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.textArea}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
      placeholderTextColor="#7899bc"
      multiline
      numberOfLines={3}
    />
  );
};

const styles = StyleSheet.create({
  textArea: {
    backgroundColor: "#edf0f7",
    borderColor: "#a8b0c4",
    borderWidth: 1,
    padding: 11,
    borderRadius: 6,
    color: "#000000",
    fontSize: 16,
    width: "100%",
    marginBottom: 2,
    textAlignVertical: "top",
  },
});

export default TextArea;
