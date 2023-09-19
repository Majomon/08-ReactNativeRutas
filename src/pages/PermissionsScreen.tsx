import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {PermissionsContext} from '../context/PermissionsContext';
import {BlackButton} from '../components/BlackButton';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Es necesario el uso del GPS para usar esta app
      </Text>
      <BlackButton title="Permiso" onPres={askLocationPermission} />
      <Text style={{color: 'black', marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
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
    width: 250,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});
