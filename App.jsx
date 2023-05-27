/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {enableLatestRenderer} from 'react-native-maps';

// enableLatestRenderer();

import {
  LoginScreen,
  LogoutScreen,
  RegistrationScreen,
  DashboardScreen,
  SplashScreen,
  VehicleRegistrationScreen,
  AllVehiclesScreen,
  PartsRegistrationScreen,
  ExpiriesEntryScreen,
} from './screens';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196f3',
  },
};

const App = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    console.log('session logged out');
  };

  const UnauthenticatedRoutes = () => (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  const AuthenticatedRoutes = () => (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          headerLeft: null,
          headerRight: () => <Button onPress={handleLogout} title="Logout" />,
        }}
      />
      <Drawer.Screen
        name="VehicleRegistration"
        component={VehicleRegistrationScreen}
        options={{headerShown: true, title: 'Vehicle Registration'}}
      />
      {/* <Drawer.Screen
        name="AllVehicles"
        component={AllVehiclesScreen}
        options={{headerShown: true, title: 'Registered Vehicles'}}
      /> */}
      <Drawer.Screen
        name="PartsRegistration"
        component={PartsRegistrationScreen}
        options={{headerShown: true, title: 'Parts Registration'}}
      />
      <Drawer.Screen
        name="ExpiriesEntry"
        component={ExpiriesEntryScreen}
        options={{headerShown: true, title: 'Add Expiry'}}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UnauthenticatedRoutes"
            component={UnauthenticatedRoutes}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AuthenticatedRoutes"
            component={AuthenticatedRoutes}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
