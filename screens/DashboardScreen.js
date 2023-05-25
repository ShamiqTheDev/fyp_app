import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';

// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Cool Photo App Camera Permission',
//         message: 'GEOV Tracker needs access to your location',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the location');
//     } else {
//       console.log('Location permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const DashboardScreen = () => {
  return (
    <View>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 30.3753,
          longitude: 69.3451,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </View>
  );
};

export default DashboardScreen;
