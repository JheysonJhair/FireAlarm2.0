import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Button from "../../components/forms/Button";
import { useNavigation } from "@react-navigation/native";
import { getReporte } from "../../api/apiUser";
import { useUser } from "../../hooks/UserContext";

import LoadingIndicator from "../../components/modals/LoadingIndicator";
const Reporte = () => {
  const navigation = useNavigation();
  const [reportes, setReportes] = useState([]);
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await getReporte(userData.IdUsuario);
        setReportes(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchReportes();

    const intervalId = setInterval(fetchReportes, 1000);

    return () => clearInterval(intervalId);
  }, [userData.IdUsuario]);

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View>
          {reportes.map((reporte, index) => (
            <View style={styles.reportContainer} key={index}>
              <Image source={{ uri: reporte.Imagen }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.reportTitle}>Incendio Reportado</Text>
                <Text style={styles.location}>
                  <Text style={styles.date}>Abancay/Apurímac/Perú</Text>
                </Text>
              </View>
              <View>
                <Text style={styles.date}>{formatDate(reporte.Fecha)}</Text>
              </View>
            </View>
          ))}
          <Button title="Otro reporte" onPress={() => handleHome()} />
          <View style={{ height: 40 }}></View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

export default Reporte;
