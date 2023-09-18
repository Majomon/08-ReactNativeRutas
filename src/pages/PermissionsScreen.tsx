import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {check,request, PERMISSIONS, PermissionStatus} from 'react-native-permissions';

export const PermissionsScreen = () => {
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    //Para ver si tengo o no permisos
    //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    // Para pedir permisos
    permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    console.log({permissionStatus});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Permissions Screen</Text>
      <Button title="Permiso" onPress={checkLocationPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
