import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputPassword = ({ placeholder, onChangeText, value, editable }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, !editable && styles.notEditable]}>
      <TextInput
        style={[styles.input, !editable && styles.notEditableText]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        placeholderTextColor="#a8b0c4"
        secureTextEntry={!showPassword}
        editable={editable}
      />
      <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
        <Icon
          name={showPassword ? "eye" : "eye-slash"}
          size={20}
          color="#a8b0c4"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edf0f7",
    borderColor: "#a8b0c4",
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 10,
    width: "100%",
  },
  notEditable: {
    opacity: 0.5,
  },
  input: {
    paddingHorizontal: 12,
    flex: 1,
    color: "#000",
    fontSize: 16,
    paddingVertical: 11,
  },
  notEditableText: {
    color: "gray",
  },
  eyeIcon: {
    position: "absolute",
    padding: 14,
    right: 0,
  },
});

export default InputPassword;
