import React, { useState, useEffect } from "react";
import CheckBox from '@react-native-community/checkbox';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import InputPassword from "../../components/forms/InputPassword";
import GoogleButton from "../../components/forms/GoogleButton";
import FacebookButton from "../../components/forms/FacebookButton";
import StatusModal from "../../components/modals/StatusModal ";

import { useUser } from "../../hooks/UserContext";
import { loginUser } from "../../api/apiLogin";

export default function Login() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const { setUserInfo } = useUser();

  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin");

  const onHandleLogin = async (email, password) => {
    try {
      if (!email || !password) {
        setModalStatus("error");
        setModalVisible(true);
        setText("Campos vacios");
        setText2("Complete todos los campos, es necesario!");
        return;
      }
      if (email == "admin" && password == "admin") {
        navigation.navigate("Admin");
        setIsLoading(false);
        return;
      }
      if (email == "satelite" && password == "satelite") {
        navigation.navigate("Satelite");
        setIsLoading(false);
        return;
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        setModalStatus("error");
        setModalVisible(true);
        setText("Correo invalido");
        setText2("Por favor, utiliza una cuenta de Gmail.");
        return;
      }

      const user = await loginUser(email, password);
      setIsLoading(true);
      if (user.msg == "Ingreso correctamente") {
        setIsLoading(false);
        setUserInfo({
          IdUsuario: user.value.IdUsuario,
          Email: user.value.Email,
          Contrasena: user.value.Contrasena,
          Nombre: user.value.Nombre,
          Apellido: user.value.Apellido,
          Telefono: user.value.Telefono,
        });

        setModalStatus("success");
        setModalVisible(true);
        setText("Ingreso!");
        setText2(`Bienvenido ${user.value.Nombre}`);
        const timeout = setTimeout(() => {
          navigation.navigate("Options");
        }, 1500);
      } else {
        setModalStatus("error");
        setModalVisible(true);
        setText("Error de ingreso");
        setText2("Crea una cuenta, es muy rápido!");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleForgotPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2e4466" />
        </View>
      ) : (
        <>
          <Text style={styles.h1}>FireAlarm</Text>
          <Text style={styles.h2}>Hola, Bienvenido de nuevo</Text>
          <Text style={styles.h3}>
            Introduce tus credenciales para continuar
          </Text>

          <View style={styles.formContainer}>
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <InputPassword
              placeholder="Contraseña"
              onChangeText={(text) => setPassword(text)}
              value={password}
              editable={true}
            />
            <View style={styles.checkboxContainer}>
              <View style={styles.rowContainer}>
                <View style={styles.izquierda}>
                <CheckBox
                    value={isChecked}
                    onValueChange={setChecked}
                    tintColors={{ true: "#2e4466", false: undefined }}
                  />
                  <Text style={styles.checkboxLabel}>Recuérdame</Text>
                </View>
                <View style={styles.derecha}>
                  <Text
                    style={styles.forgotPassword}
                    onPress={handleForgotPassword}
                  >
                    Olvidaste tu contraseña?
                  </Text>
                </View>
              </View>
            </View>
            <Button
              title="Iniciar Sesión"
              onPress={() => onHandleLogin(email, password)}
            />
          </View>

          <View style={styles.texto}>
            <Text style={styles.h3}>
              No tienes cuenta?{" "}
              <Text style={styles.span} onPress={handleRegister}>
                Registrate
              </Text>
            </Text>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine}></View>
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine}></View>
          </View>
          <View style={styles.socialButtonsContainer}>
            <GoogleButton
              onPress={() => console.log("Botón de Google presionado")}
            />
            <FacebookButton
              onPress={() => console.log("Botón de Facebook presionado")}
            />
          </View>
          <StatusModal
            visible={modalVisible}
            status={modalStatus}
            text={text}
            text2={text2}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 36,
    color: "#000000",
    marginBottom: 5,
    marginTop: 20,
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 20,
    marginTop: 15,
  },
  texto: {
    marginTop: 15,
  },
  h3: {
    color: "#A3AABF",
    fontSize: 14,
    marginBottom: 25,
  },
  span: {
    color: "#2e4466",
    fontWeight: "bold",
  },
  //checkboxContainer
  checkboxContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
  },
  izquierda: {
    flexDirection: "row",
    alignItems: "center",
  },
  derecha: {
    width: 200,
    alignItems: "flex-end",
  },
  checkboxLabel: {
    color: "#000",
    fontSize: 13,
    marginLeft: 5,
  },
  forgotPassword: {
    color: "#2e4466",
    fontSize: 13,
    fontWeight: "bold",
  },
  //Linea
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  dividerLine: {
    width: "32%",
    height: 1,
    backgroundColor: "#1B2536",
  },
  dividerText: {
    color: "#000",
    marginHorizontal: 10,
    fontFamily: "Montserrat_800ExtraBold",
  },
  //Google y Facebook
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    width: "95%",
  },
});
