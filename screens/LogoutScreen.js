import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native-paper';

const LogoutScreen = ({navigation}) => {
  useEffect(() => {
    const logout = async () => {
      // await AsyncStorage.removeItem('token');
      // await AsyncStorage.removeItem('user');
      await AsyncStorage.clear();

      navigation.replace('UnauthenticatedRoutes');
    };
    logout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default LogoutScreen;
