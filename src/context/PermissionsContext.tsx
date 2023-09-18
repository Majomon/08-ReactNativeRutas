import {createContext, useState} from 'react';
import {PermissionStatus} from 'react-native-permissions';

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

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);
  const askLocationPermission = () => {};

  const checkLocationPermission = () => {};
  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
