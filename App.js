import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';
import Navigation from './src/navigation';
import theme from './src/theme';
import NfcManager from 'react-native-nfc-manager';
import NoteProvider from './src/stores/Note';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import ScanModalAndroidProvider from './src/stores/ScanModalAndroid';
import LoaderWrapProvider from './src/stores/LoaderWrap';

const App = () => {
  const [supported, setSupported] = useState(null);
  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    const initNfc = async () => {
      try {
        await NfcManager.start();
        setSupported(await NfcManager.isSupported());
        setEnabled(await NfcManager.isEnabled());
      } catch (e) {
        console.error(e);
      }
    };
    initNfc();
  }, []);
  return (
    <SafeAreaProvider>
      <NoteProvider>
        <ScanModalAndroidProvider>
          <NativeBaseProvider theme={theme}>
            <LoaderWrapProvider>
              <StatusBar barStyle="light-content" />
              <Navigation />
            </LoaderWrapProvider>
          </NativeBaseProvider>
        </ScanModalAndroidProvider>
      </NoteProvider>
    </SafeAreaProvider>
  );
};

export default App;
