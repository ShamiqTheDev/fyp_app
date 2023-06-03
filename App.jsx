/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LoginScreen,
  LogoutScreen,
  RegistrationScreen,
  DashboardScreen,
  SplashScreen,
  VehicleRegistrationScreen,
  VehicleListScreen,
  EditVehicleRegistrationScreen,
  PartsRegistrationScreen,
  PartsListScreen,
  ExpiriesEntryScreen,
} from './screens';
// import {enableLatestRenderer} from 'react-native-maps';
// enableLatestRenderer();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#010444',
    accent: '#FF4081',
    background: '#F9F9F9',
    text: '#333333',
    placeholder: '#999999',
  },
  // fonts: {
  //   regular: {
  //     fontFamily: 'Roboto-Regular',
  //     fontWeight: 'normal',
  //   },
  //   medium: {
  //     fontFamily: 'Roboto-Medium',
  //     fontWeight: 'normal',
  //   },
  //   bold: {
  //     fontFamily: 'Roboto-Bold',
  //     fontWeight: 'normal',
  //   },
  // },
  roundness: 1,
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
    <Drawer.Navigator
      initialRouteName="MyVehicles"
      screenOptions={{
        drawerActiveTintColor: '#7F1416',
        drawerInactiveTintColor: '#000000',
        drawerLabelStyle: {fontSize: 16, fontWeight: 'bold'},
        drawerStyle: {backgroundColor: '#F5F5F5'},
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Active Vehicle Tracking',
          headerLeft: null,
          headerRight: () => <Button onPress={handleLogout} title="Logout" />,
        }}
      />
      <Drawer.Screen
        name="MyVehicles"
        component={VehicleListScreen}
        options={{headerShown: true, title: 'My Vehicles'}}
      />
      <Drawer.Screen
        name="VehicleRegistration"
        component={VehicleRegistrationScreen}
        options={{headerShown: true, title: 'Vehicle Registration'}}
      />
      <Drawer.Screen
        name="PartsRegistration"
        component={PartsRegistrationScreen}
        options={{headerShown: true, title: 'Parts Registration'}}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );

  const InternalRoutes = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="EditVehicle"
        component={EditVehicleRegistrationScreen}
        options={{headerShown: true, title: 'Edit Vehicle'}}
      />
      <Stack.Screen
        name="AllPartsByVehicle"
        component={PartsListScreen}
        options={{headerShown: true, title: 'All Parts'}}
      />
      <Stack.Screen
        name="AddExpiry"
        component={ExpiriesEntryScreen}
        options={{headerShown: true, title: 'Add Expiry'}}
      />
    </Stack.Navigator>
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
          <Stack.Screen
            name="InternalRoutes"
            component={InternalRoutes}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
