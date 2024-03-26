import React, { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";

const GoogleButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.socialButton, backgroundColor: "#2e4466" }}
      onPress={() => {}}
    >
      <Text style={styles.socialButtonText}>G</Text>
    </TouchableOpacity>
  );
};

const styles = {
  socialButton: {
    backgroundColor: "#2e4466",
    borderRadius: 25,
    marginEnd: 4,
    marginStart: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Montserrat_800ExtraBold",
  },
};

export default GoogleButton;
