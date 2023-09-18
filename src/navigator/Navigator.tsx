import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../pages/MapScreen';
import {PermissionsScreen} from '../pages/PermissionsScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      //Para que pida los permisos al abrir la aplicación
      //initialRouteName="PermissionsScreen"
      //Quitar el Header
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
