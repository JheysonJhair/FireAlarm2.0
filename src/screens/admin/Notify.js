import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Notification from "../../components/admin/Notification";

import LoadingIndicator from "../../components/modals/LoadingIndicator";
import { fetchNotify } from "../../api/apiFire";
import { useNavigation } from "@react-navigation/native";

function Notify() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNotify();
        setNotifications(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    getData();

    const intervalId = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNotificationPress = (notification) => {
    navigation.navigate("Information", { notification });
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split("T");
    return dateParts[0];
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView>
            {notifications.map((notification, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleNotificationPress(notification)}
              >
                <Notification
                  imageSource={{ uri: notification.Imagen }}
                  status={notification.Estado}
                  location={"Abancay/Apurímac/Perú"}
                  date={formatDate(notification.Fecha)}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    paddingTop: 18,
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Notify;
