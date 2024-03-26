import React, { useState, useEffect } from "react";
import { Modal, View, ActivityIndicator, Text, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const StatusModal = ({ visible, status, text, text2 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); 
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [status]);

  const getIcon = () => {
    switch (status) {
      case "success":
        return <FontAwesome5 name="check-circle" style={[styles.icon, styles.successIcon]} solid />;
      case "error":
        return <FontAwesome5 name="times-circle" style={[styles.icon, styles.errorIcon]} solid />;
      case "loading":
        return (
          <ActivityIndicator
            size="large"
            color={styles.loadingColor.color}
            style={{ transform: [{ scale: 1.2 }] }}
          />
        );
      case "warning":
        return <FontAwesome5 name="exclamation-triangle" style={[styles.icon, styles.warningIcon]} solid />;
      default:
        return null;
    }
  };


  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {getIcon()}
          <Text style={styles.loadingText}>{text}</Text>
          <View style={styles.Text}>
            <Text style={styles.loadingText2}>{text2}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    paddingTop: 30,
    backgroundColor: "#212834",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "75%",
    paddingBottom: 40,
  },
  Text: {
    width: "85%",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 27,
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat_800ExtraBold",
  },
  loadingText2: {
    color: "#A3AABF",
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  icon: {
    marginTop: 10,
    fontSize: 60,
  },
  successIcon: {
    color: "#40A5E7",
  },
  errorIcon: {
    color: "#40A5E7",
  },
  loadingColor: {
    color: "#40A5E7",
  },
  warningIcon: {
    color: "#40A5E7",
  },
});

export default StatusModal;
