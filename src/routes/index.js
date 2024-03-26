import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Load from '../screens/home/Load';
import Welcome from '../screens/home/Welcome';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Home from '../screens/home/Home';
import ForgetPassword from '../screens/auth/ForgetPassword';
import MapLocation from '../screens/maps/MapLocation';
import Options from '../screens/home/Options';
import Reporte from '../screens/home/Reporte';
import Notify from '../screens/admin/Notify';
import NotificationDetail from '../screens/admin/NotificationDetail';
import Satelite from '../screens/satelite/Satelite';
import NotificationDetailUser from '../screens/home/NotificationDetailUser';
import MapUser from '../screens/maps/MapUser';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Load"
        component={Load}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="mapLocation"
        component={MapLocation}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#161B21',
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: 'Ubicación ',
        }}
      />

      <Stack.Screen
        name="MapScreen"
        component={MapUser}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#161B21',
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: 'Ubicación',
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#161B21',
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: 'Seleccione una opción',
        }}
      />
      <Stack.Screen
        name="Reporte"
        component={Reporte}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#161B21',
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: 'Reporte realizado',
        }}
      />
      <Stack.Screen
        name="Admin"
        component={Notify}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#161B21',
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: 'Notificaciones',
        }}
      />
      <Stack.Screen
        name="Information"
        component={NotificationDetail}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#161B21',
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: 'Información',
        }}
      />
      <Stack.Screen
        name="InformationUser"
        component={NotificationDetailUser}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#161B21',
          },
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          title: 'Información de mi reporte',
        }}
      />
      <Stack.Screen
        name="Satelite"
        component={Satelite}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
