import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/forms/Button';
import ButtonTwo from '../../components/forms/ButtonTwo';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.h1}>FireAlarm</Text>
      </View>
      <Text style={styles.h2}>Bienvenido!</Text>

      <View style={styles.formContainer}>
        <Button
          title="Crear Cuenta"
          onPress={() => navigation.navigate('Register')}
        />
        <ButtonTwo
          title="Ingresar"
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <View style={styles.terminos}>
        <Text style={styles.h3}>Nuestros Términos y Condiciones</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181f2b',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    width: '80%',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 34,
    color: '#ffffff',
    marginBottom: 5,
    marginTop: 10,
  },
  h2: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  terminos: {
    position: 'absolute',
    bottom: 70,
  },
  h3: {
    color: '#A3AABF',
    fontSize: 13,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    position: 'absolute',
    top: -30,
    right: -20,
  },
});

export default Welcome;
