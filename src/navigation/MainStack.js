import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import OneOfflineBanknote from '../screens/Notes/1';
import TwoOfflineBanknote from '../screens/Notes/2';
import FiveOfflineBanknote from '../screens/Notes/5';
import TenOfflineBanknote from '../screens/Notes/10';
import {NotesScreens} from './constants';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={NotesScreens['1']} component={OneOfflineBanknote} />
      <Stack.Screen name={NotesScreens['2']} component={TwoOfflineBanknote} />
      <Stack.Screen name={NotesScreens['5']} component={FiveOfflineBanknote} />
      <Stack.Screen name={NotesScreens['10']} component={TenOfflineBanknote} />
    </Stack.Group>
  </Stack.Navigator>
);

export default MainStack;
