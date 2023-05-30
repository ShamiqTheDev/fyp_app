import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      const checkAuthentication = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          navigation.replace('AuthenticatedRoutes');
        }
        navigation.replace('Login');
      };
      checkAuthentication();
    }, 500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
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

export default SplashScreen;
