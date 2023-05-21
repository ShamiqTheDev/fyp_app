import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [statistics, setStatistics] = useState(null);

  const [token, setToken] = useState('');

  useEffect(() => {
    // For testing purposes, mock data
    const mockStatistics = {
      users: 100,
      orders: 50,
      revenue: 1000,
      token: token,
    };
    setStatistics(mockStatistics);

    const setTokenFunct = async () => {
      setToken(await AsyncStorage.getItem('token'));
    };
    setTokenFunct();
    console.log('async TOKEN', token);
  }, []);

  return (
    <View>
      <Text>Welcome to the Dashboard!</Text>
      {statistics && (
        <View>
          <Text>Token: {statistics.token}</Text>
          <Text>Users: {statistics.users}</Text>
          <Text>Orders: {statistics.orders}</Text>
          <Text>Revenue: {statistics.revenue}</Text>
        </View>
      )}
    </View>
  );
};

export default DashboardScreen;
