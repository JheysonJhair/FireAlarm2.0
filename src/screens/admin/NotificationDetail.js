import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {deleteMensaje, updateMensaje} from '../../api/apiFire';
import {useNavigation} from '@react-navigation/native';
import {
  enviarNotificacionEncamino,
  enviarNotificacionControlado,
} from '../../api/apiFire';
import StatusModal from '../../components/modals/StatusModal ';

function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function NotificationDetail({route}) {
  const {notification} = route.params;
  const [address, setAddress] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(notification.Estado);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState('error');
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  useEffect(() => {
    const obtenerDireccion = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${notification.Latitud},${notification.Longitud}&key=AIzaSyAzjcbLSKk0Bh881pDOETrB1erl1zIjQds`,
        );
        const data = await response.json();
        if (data && data.results && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        console.error('Error fetching direccion:', error);
        setAddress('Dirección no disponible');
      }
    };

    obtenerDireccion();
  }, [notification.Latitud, notification.Longitud]);

  //
  useEffect(() => {
    if (route.params && route.params.acceptedData) {
      handleStatusChange(1);
      enviarNotificacionEncamino();
    }
  }, [route.params]);
  //
  const handleStatusChange = async status => {
    try {
      console.log(status);
      if (status == 2) {
        enviarNotificacionControlado();
      }
      await updateMensaje(notification.IdMensaje, status);
      setSelectedStatus(status);
    } catch (error) {
      console.error('Error al actualizar el estado del mensaje:', error);
    }
  };

  const onDelete = async id => {
    try {
      await deleteMensaje(id);
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error);
    }
  };

  const onRechazar = async id => {
    try {
      await updateMensaje(id, 3);
      setModalStatus('success');
      setModalVisible(true);
      setText('Notificación rechazada!');
      setText2('La notificación fue rechazado con exito!');
      const timeout = setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('Error al rechazar el mensaje:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: notification.Imagen}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Ubicación: {address}</Text>
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
            onPress={() => handleStatusChange(0)}>
            <Text style={styles.buttonText}>Incendio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === 1 && styles.selectedButton2,
            ]}
            onPress={() => navigation.navigate('mapLocation', {notification})}>
            <Text style={styles.buttonText}>En camino</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === 2 && styles.selectedButton3,
            ]}
            onPress={() => handleStatusChange(2)}>
            <Text style={styles.buttonText}>Controlado</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linea}>
          <Text style={styles.title2}>Opciones extras</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button2]}
            onPress={() => onDelete(notification.IdMensaje)}>
            <Text style={styles.buttonText}>Eliminar Notificación</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button2]}
            onPress={() => onRechazar(notification.IdMensaje)}>
            <Text style={styles.buttonText}>Rechazar Notificación</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusModal
        visible={modalVisible}
        status={modalStatus}
        text={text}
        text2={text2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 260,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title2: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: '#777',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#777',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  linea: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#676770',
  },
  button2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#29364c',
  },
  selectedButton: {
    backgroundColor: '#FF6347',
  },
  selectedButton2: {
    backgroundColor: '#47a0ff',
  },
  selectedButton3: {
    backgroundColor: '#0a9b77',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NotificationDetail;
