import React, {useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
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
    stopFollowUserLocation,
    routeLines,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      //Cancelar el seguimiento
      stopFollowUserLocation();
    };
  }, []);

  //Cada que cambie la ubicacion del usuario me muevo a su ubicacion
  useEffect(() => {
    if (!following) return;
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

    following.current = true;
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
        }}
        onTouchStart={() => (following.current = false)}>
        <Polyline
          coordinates={routeLines}
          strokeColor="black"
          strokeWidth={3}
        />
        {/* Agrega un Marker en la posición del usuario */}
        {/*       {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}>
            <View style={styles.customMarker}>
              <Image
                source={require('../assets/marcaror.png')}
                style={styles.markerImage}
              />
            </View>
          </Marker>
        )} */}
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
  customMarker: {
    alignItems: 'center', // Centrar horizontalmente la imagen
    justifyContent: 'center', // Centrar verticalmente la imagen
  },
  markerImage: {
    width: 42, // Ancho de la imagen
    height: 42, // Altura de la imagen
    resizeMode: 'contain', // Ajustar la imagen dentro del contenedor
  },
});

{
  /* Marcador de la libreria  */
}
{
  /*       <Marker
      image={require("../assets/marcaror.png")}
        // Si lo hacemos en base a un Array
        // key={index}
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        title="Esto es un títutlo"
        description="Esto es la descripción del marcador"
      /> */
}
