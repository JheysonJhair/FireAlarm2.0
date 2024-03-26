import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "../../components/forms/Button";
import { deleteMensaje, updateMensaje } from "../../api/apiFire";
import { useNavigation } from "@react-navigation/native";

function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function NotificationDetail({ route }) {
  const { notification } = route.params;
  const [selectedStatus, setSelectedStatus] = useState(notification.Estado);
  const navigation = useNavigation();

  const handleStatusChange = async (status) => {
    try {
      await updateMensaje(notification.IdMensaje, status);
      setSelectedStatus(status);
    } catch (error) {
      console.error("Error al actualizar el estado del mensaje:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteMensaje(id);
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: notification.Imagen }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>UBICACIÓN: Abancay/Apurímac/Perú</Text>
        <Text style={styles.date}>
          Fecha del suceso: {formatDateString(notification.Fecha)}
        </Text>
        <Text style={styles.title2}>Indicación:</Text>
        <Text style={styles.description}>{notification.Descripcion}</Text>
        <View style={styles.linea}>
          <Text style={styles.title2}>Tomar medidas del caso</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === 0 && styles.selectedButton,
            ]}
            onPress={() => handleStatusChange(0)}
          >
            <Text style={styles.buttonText}>Incendio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === 1 && styles.selectedButton2,
            ]}
            onPress={() => handleStatusChange(1)}
          >
            <Text style={styles.buttonText}>En camino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === 2 && styles.selectedButton3,
            ]}
            onPress={() => handleStatusChange(2)}
          >
            <Text style={styles.buttonText}>Controlado</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Eliminar notificación"
          onPress={() => onDelete(notification.IdMensaje)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 260,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title2: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: "#777",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#777",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linea: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#676770",
  },
  selectedButton: {
    backgroundColor: "#FF6347",
  },
  selectedButton2: {
    backgroundColor: "#47a0ff",
  },
  selectedButton3: {
    backgroundColor: "#0a9b77",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default NotificationDetail;
