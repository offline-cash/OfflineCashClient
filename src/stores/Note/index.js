import React, {createContext, useContext, useState} from 'react';
import {noteStates} from '../../Utils/noteStates';
import {transformNfcResult} from './transformNfcResult';
import {addDays} from 'date-fns';
import {DAYS_FOR_SIGNATURE_VERIFICATION} from '../../../Config';
import {Toast} from 'native-base';
import ToastCopy from '../../theme/Components/ToastCopy';

const NoteContext = createContext(null);

export const useNoteContext = () => useContext(NoteContext);

export const initialState = {
  state: noteStates.error,
  noteAddress: null,
  serialNr: null,
  nominalValue: null,
  btcBalance: null, // value in SATS
  isVerificationValid: false,
  verificationDate: null,
  lockTime: null,
  history: [],
  isSealed: true, // Note is not (physically) cut
  isLoaded: false,
  hasRotationFunds: false,
  hasPersonalisationFunds: false,
  isScannedOffline: false,
};

const NoteProvider = ({children}) => {
  const [noteData, setNoteData] = useState(initialState);

  const updateResult = async (res, isScannedOffline) => {
    try {
      const newNoteState = await transformNfcResult(res);

      setNoteData({
        ...newNoteState,
        isScannedOffline: Boolean(isScannedOffline),
      });
    } catch (e) {
      Toast.show({
        render: () => {
          return <ToastCopy isError={true} text={e.response.data} />;
        },
        placement: 'top',
        duration: 5000,
      });
    }
  };

  /* must be a function to always check at current time */
  const isVerified = () =>
    Date.now() <
    addDays(noteData.verificationDate, DAYS_FOR_SIGNATURE_VERIFICATION);

  const reset = () => setNoteData(initialState);

  // use noteStates from Utils/noteStates
  const forceChangeState = state => {
    setNoteData({...noteData, ...state});
  };

  return (
    <NoteContext.Provider
      value={{
        note: noteData,
        updateResult,
        reset,
        isVerified,
        forceChangeState,
      }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
