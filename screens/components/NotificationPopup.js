import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Modal, Text, Button, Portal, Provider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';

const NotificationPopup = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Notification Menu', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return null;
};

export default NotificationPopup;
