import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateGeolocation} from '../services/geolocationService';

const DashboardScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);
  const [totalKilometers, setTotalKilometers] = useState(0);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude, speed} = position.coords;
        setCurrentLocation({latitude, longitude, speed});
      },
      error => console.log('Error:', error),
      {enableHighAccuracy: true, distanceFilter: 10, interval: 5000},
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const loadTotalKilometers = async () => {
      try {
        const value = await AsyncStorage.getItem('totalKilometers');
        if (value !== null) {
          setTotalKilometers(parseFloat(value));
        }
      } catch (error) {
        console.log('Error loading total kilometers from AsyncStorage:', error);
      }
    };

    loadTotalKilometers();

    if (currentLocation && previousLocation) {
      const distance = calculateDistance(
        previousLocation.latitude,
        previousLocation.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
      );
      const kilometers = distance / 1000; // Convert distance from meters to kilometers

      setTotalKilometers(prevKilometers => {
        const newKilometers = prevKilometers + kilometers;

        AsyncStorage.setItem('totalKilometers', newKilometers.toString());

        if (newKilometers >= 5 && Math.floor(newKilometers) % 5 === 0) {
          updateGeolocation(
            newKilometers,
            currentLocation.latitude,
            currentLocation.longitude,
          )
            .then(response => {
              if (response.status) {
                console.log('Success: Syncing location data');
              } else {
                console.log('Failed: Syncing location data');
              }
            })
            .catch(error => {
              console.log('Error: Syncing location data');
            });

          console.log('Updating data in the database...');
        }

        return newKilometers;
      });
    }

    if (currentLocation) {
      setPreviousLocation(currentLocation);
    }
  }, [currentLocation, previousLocation, calculateDistance]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          currentLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
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
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Total Kilometers</Text>
          <Text style={styles.infoValue}>{totalKilometers.toFixed(2)}</Text>
        </View>
        {currentLocation && (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Current Speed</Text>
            <Text style={styles.infoValue}>
              {currentLocation.speed.toFixed(2)} m/s
            </Text>
          </View>
        )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  infoValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
