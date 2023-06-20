import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {useScanModalAndroidContext} from '../stores/ScanModalAndroid';
import ScanModalAndroid from '../components/ScanModalAndroid';
import {isAndroid} from '../Utils/helpers';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    background: 'transparent',
  },
};

const Navigation = () => {
  const {isScanModalAndroidOpen, isScanRunning, closeModal} = useScanModalAndroidContext();

  return (
    <NavigationContainer theme={MyTheme}>
      <MainStack />
      {isAndroid() && isScanModalAndroidOpen && (
        <ScanModalAndroid
          isOpen={isScanModalAndroidOpen}
          isRunning={isScanRunning}
          closeModal={closeModal}
        />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
