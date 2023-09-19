import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export const Map = () => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />

      {/* Marcador de la libreria  */}
      {/*       <Marker
      image={require("../assets/marcaror.png")}
        // Si lo hacemos en base a un Array
        // key={index}
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        title="Esto es un títutlo"
        description="Esto es la descripción del marcador"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 2,
  },
  map: {
    flex: 1,
  },
});
