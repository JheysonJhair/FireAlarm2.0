import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";


const Load = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Text animation="flipInX" style={styles.containerLogoText}>
          FireAlarm
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181f2b",
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogoText: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "Montserrat_800ExtraBold",
  },
});

export default Load;
