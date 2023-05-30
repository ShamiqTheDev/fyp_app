import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Card, Button, Title} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  fetchAllPartsRegistrationsByVehicleId,
  deletePartRegistration,
} from '../services/partsRegistrationServiceFA';

const PartsListScreen = ({navigation, route}) => {
  const {vehicle} = route.params;
  const [parts, setParts] = useState([]);
  const activeVehicleId = '123'; // Replace with your active vehicle ID logic

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetchAllPartsRegistrationsByVehicleId(
          vehicle.id,
        );
        if (response.status === true) {
          setParts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isFocused) {
      fetchParts();
    }
  }, [vehicle.id, isFocused]);

  const handleEdit = part => {
    navigation.navigate('InternalRoutes', {
      screen: 'EditPart',
      params: {part},
    });
  };

  const handleDelete = async part => {
    try {
      const response = await deletePartRegistration(part.id);
      if (response.status === true) {
        setParts(parts.filter(p => p.id !== part.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExpiry = (vehicle, part) => {
    navigation.navigate('InternalRoutes', {
      screen: 'AddExpiry',
      params: {vehicle, part},
    });
  };

  const handleAddPartsNow = () => {
    navigation.navigate('PartsRegistration');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {parts.length > 0 ? (
        <View style={styles.listContainer}>
          <Text style={styles.heading}>{vehicle.name} Parts List</Text>
          {parts.map(part => (
            <Card key={part.id} style={styles.card}>
              <Card.Content>
                <Title>Name: {part.name}</Title>
                {part.expiry ? (
                  <>
                    <Text>
                      Distance Covered:{' '}
                      {part.expiry.distance
                        ? part.expiry.distance + 'KMs'
                        : 0 + 'km'}
                    </Text>
                    <Text>
                      Part Expiry:{' '}
                      {part.expiry.expiry
                        ? part.expiry.expiry + 'KMs'
                        : 0 + 'km'}
                    </Text>
                    <Text>
                      Notification will arrive before{' '}
                      {part.expiry.expiry
                        ? part.expiry.expiry + 'KMs'
                        : 0 + 'km'}
                    </Text>
                  </>
                ) : (
                  <Text>Description: {part.description}</Text>
                )}
              </Card.Content>
              <Card.Actions>
                {!part.expiry && (
                  <Button
                    style={styles.useNowButtonActive}
                    textColor={'#ffffff'}
                    onPress={() => handleAddExpiry(vehicle, part)}>
                    Add Expiry
                  </Button>
                )}
                {/* <Button onPress={() => handleEdit(part)}>Edit</Button> */}
                {vehicle.id.toString() !== activeVehicleId && (
                  <Button
                    style={styles.buttonDelete}
                    onPress={() => handleDelete(part)}>
                    Delete
                  </Button>
                )}
              </Card.Actions>
            </Card>
          ))}
        </View>
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.heading}>{vehicle.name} Parts List</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Title>No Parts Found!</Title>
              <Text>
                Are you expecting parts here for your vehicle {vehicle.name}?
              </Text>
              <Text>Add parts Now!</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleAddPartsNow(vehicle)}>
                Add Parts Now!
              </Button>
            </Card.Actions>
          </Card>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
  useNowButton: {
    borderColor: '#015802',
    width: 120,
  },
  useNowButtonActive: {
    backgroundColor: '#015802',
    width: 120,
    borderColor: 'transparent',
  },
  buttonDelete: {
    backgroundColor: '#7f1416',
  },
});

export default PartsListScreen;
