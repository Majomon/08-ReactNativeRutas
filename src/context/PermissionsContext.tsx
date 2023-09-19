import {createContext, useState, useEffect} from 'react';
import {
  PermissionStatus,
  PERMISSIONS,
  request,
  check,
  openSettings,
} from 'react-native-permissions';
import {AppState} from 'react-native';

// Como luce el estado que voy a manejar internamente
export interface PermissionsState {
  locationStatus: PermissionStatus;
}

// Esto es el estado inicial
export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

// La creación del contexto
export const PermissionsContext = createContext({} as PermissionsContextProps); //TODO: Qué exporta?

// Este ESTADO NUNCA SE DESTRUYE. PERSISTE MIENTRAS ESTE ABIERTO LA APP
export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  //Para cuando abra la aplicación haga primero este chekeo
  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    //Para ver si tengo o no permisos
    //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    // Para pedir permisos
    permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  // Cuando la persona regresa a la aplicación
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    //Para ver si tengo o no permisos
    //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    // Para pedir permisos
    permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    // Si el status es "bloqued"
    if (permissionStatus === 'blocked') {
      openSettings();
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
