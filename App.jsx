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

import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DashboardScreen from './screens/DashboardScreen';
import SplashScreen from './screens/SplashScreen';

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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // const checkAuthentication = async () => {
  //   //   // const token = await AsyncStorage.getItem('token');
  //   //   // setIsAuthenticated(token !== null);
  //   //   // console.log('isAuthenticated', isAuthenticated);
  //   //   // setIsLoading(false);
  //   // };
  //   // checkAuthentication();
  // }, []);

  // const handleLogin = () => {
  //   // console.log('setIsAuthenticated', 'setIsAuthenticated(true)');
  //   setIsAuthenticated(true);
  // };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    // setIsAuthenticated(false);
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
          // screenOptions: {login: handleLogin},
        }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  // if (isLoading) {
  //   // Render a loading screen while checking authentication
  //   return null;
  // }

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
      {/* Add your other authenticated screens here */}
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
        {/* {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />} */}
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
