import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
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

  const fetchParts = useCallback(async () => {
    try {
      const response = await fetchAllPartsRegistrationsByVehicleId(vehicle.id);
      if (response.status === true) {
        setParts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [vehicle.id]);

  useEffect(() => {
    if (isFocused) {
      fetchParts();
    }
  }, [fetchParts, isFocused]);

  // const handleEdit = useCallback(
  //   part => {
  //     navigation.navigate('InternalRoutes', {
  //       screen: 'EditPart',
  //       params: {part},
  //     });
  //   },
  //   [navigation],
  // );

  const handleDelete = useCallback(
    async part => {
      try {
        const response = await deletePartRegistration(part.id);
        if (response.status === true) {
          setParts(prevParts => prevParts.filter(p => p.id !== part.id));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [setParts],
  );

  const handleAddExpiry = useCallback(
    part => {
      navigation.navigate('InternalRoutes', {
        screen: 'AddExpiry',
        params: {vehicle, part},
      });
    },
    [navigation, vehicle],
  );

  const handleAddPartsNow = useCallback(() => {
    navigation.navigate('PartsRegistration');
  }, [navigation]);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Title>Name: {item.name}</Title>
            {item.expiry ? (
              <>
                <Text>
                  Distance Covered:{' '}
                  {item.expiry.distance
                    ? item.expiry.distance + 'KMs'
                    : 0 + 'km'}
                </Text>
                <Text>
                  Part Expiry:{' '}
                  {item.expiry.expiry ? item.expiry.expiry + 'KMs' : 0 + 'km'}
                </Text>
                <Text>
                  Notification will arrive before{' '}
                  {item.expiry.notify_at
                    ? item.expiry.notify_at + 'KMs'
                    : 0 + 'km'}
                </Text>
              </>
            ) : (
              <Text>Description: {item.description}</Text>
            )}
          </Card.Content>
          <Card.Actions>
            {!item.expiry && (
              <Button
                style={styles.useNowButtonActive}
                textColor={'#ffffff'}
                onPress={() => handleAddExpiry(item)}>
                Add Expiry
              </Button>
            )}
            {vehicle.id.toString() !== activeVehicleId && (
              <Button
                style={styles.buttonDelete}
                onPress={() => handleDelete(item)}>
                Delete
              </Button>
            )}
          </Card.Actions>
        </Card>
      );
    },
    [handleAddExpiry, handleDelete, vehicle.id, activeVehicleId],
  );

  return (
    <View style={{height:'96%'}}>
      {parts.length > 0 ? (
        <View style={styles.listContainer}>
          <Text style={styles.heading}>{vehicle.name} Parts List</Text>
          <FlatList
            data={parts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.heading}>{vehicle.name} Parts List</Text>
          <Card style={styles.cardNotFound}>
            <Card.Content>
              <Title>No Parts Found!</Title>
              <Text>
                Are you expecting parts here for your vehicle {vehicle.name}?
              </Text>
              <Text>Add parts Now!</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={handleAddPartsNow}>Add Parts Now!</Button>
            </Card.Actions>
          </Card>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  listContainer: {
    flexGrow: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 50,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 14,
    paddingLeft: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardNotFound: {
    marginBottom: 16,
    marginLeft: 10,
    marginRight: 10,
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
