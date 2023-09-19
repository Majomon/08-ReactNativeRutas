import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';
import {useEffect} from 'react';

export const Map = () => {
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();

  useEffect(() => {
    followUserLocation();
    return () => {
      //Cancelar el seguimiento
    };
  }, []);

  //Cada que cambie la ubicacion del usuario me muevo a su ubicacion
  useEffect(() => {
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  }, [userLocation]);

  const centerPosition = async () => {
    //const location = await getCurrentLocation();
    const {latitude, longitude} = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        //Da error al cargar la aplicacion, ademas no muestra el icono marcando la ubicación del usuario
        //showsUserLocation

        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
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
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={() => centerPosition()}
        style={{position: 'absolute', bottom: 10, right: 10}}
      />
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
