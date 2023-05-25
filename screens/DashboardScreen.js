import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const DashboardScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [totalKilometers, setTotalKilometers] = useState(0);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            startLocationTracking();
          } else {
            console.log('Location permission denied');
          }
        } else if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization('whenInUse');
          startLocationTracking();
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    };

    const startLocationTracking = () => {
      const watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
        },
        error => console.log('Error:', error),
        {enableHighAccuracy: true, distanceFilter: 10},
      );

      return () => {
        Geolocation.clearWatch(watchId);
      };
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const kilometersPerUpdate = 60 / 3600;
      setTotalKilometers(
        prevKilometers => prevKilometers + kilometersPerUpdate,
      );
    }
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          currentLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : null
        }>
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          />
        )}
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Total Kilometers: {totalKilometers.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DashboardScreen;
