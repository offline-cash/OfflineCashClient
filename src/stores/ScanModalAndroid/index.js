import React, {createContext, useContext, useState} from 'react';
import nfcManager from 'react-native-nfc-manager';

const ScanModalAndroidContext = createContext(null);

export const useScanModalAndroidContext = () =>
  useContext(ScanModalAndroidContext);

const ScanModalAndroidProvider = ({children}) => {
  const [isScanModalAndroidOpen, setIsScanModalAndroidOpen] = useState(false);
  const [isScanRunning, setIsScanRunning] = useState(false);

  const openModal = () => {
    setIsScanRunning(false);
    setIsScanModalAndroidOpen(true);
  };

  const setTagDetected = () => {
    setIsScanRunning(true);
  };

  const closeModal = () => {
    setIsScanRunning(false);
    setIsScanModalAndroidOpen(false);
    nfcManager.cancelTechnologyRequest();
  };

  return (
    <ScanModalAndroidContext.Provider
      value={{
        isScanModalAndroidOpen,
        isScanRunning,
        openModal,
        closeModal,
        setTagDetected,
      }}>
      {children}
    </ScanModalAndroidContext.Provider>
  );
};

export default ScanModalAndroidProvider;
