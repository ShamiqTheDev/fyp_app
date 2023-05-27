/* eslint-disable no-catch-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {fetchVehicleRegistrations} from './services/vehicleRegistrationService';

const AllVehiclesScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [vehicleRegistrations, setVehicleRegistrations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleFetchVehicleRegistrations = async () => {
      try {
        const response = await fetchVehicleRegistrations();

        if (response.status === true) {
          console.log('Fetched Registrations', response);
        } else {
          setError(response.message);
        }

        const data = await response.json();
        setVehicleRegistrations(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    handleFetchVehicleRegistrations();
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator animating={true} size="large" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text>{error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Vehicles</Text>
      <FlatList
        data={vehicleRegistrations}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={`Name: ${item.name}`}
            description={`Number: ${item.number}`}
            // Add any other vehicle details you want to display
          />
        )}
      />
    </View>
  );
};

// Move the inline styles to a stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AllVehiclesScreen;
