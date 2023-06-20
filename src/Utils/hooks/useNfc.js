import {performNfcProcedure} from '../nfc/performNfcProcedure';
import {actions} from '../nfc/legacy/Nfc-actions';
import {Alert} from 'react-native';
import {useNoteContext} from '../../stores/Note';
import {useScanModalAndroidContext} from '../../stores/ScanModalAndroid';
import {useNavigation} from '@react-navigation/native';
import { noteStates } from "../noteStates";
import { useLoaderWrapContext } from "../../stores/LoaderWrap";

// TODO: it would be nice to separate functions into files and clean it up
export const useNfc = () => {
  const {setShowLoading} = useLoaderWrapContext();
  const {note, updateResult, reset, forceChangeState} = useNoteContext();
  const {navigate} = useNavigation();

  const {openModal, setTagDetected, closeModal} = useScanModalAndroidContext();

  const scanNote = async () => {
    const onError = () => {
      reset();
      closeModal();
    };

    performNfcProcedure(
      actions.verify,
      undefined,
      undefined,
      undefined,
      () => openModal(),
      () => setTagDetected(),
      res => {
        setShowLoading(true);
        closeModal();
        updateResult(res);
      },
      onError,
    );
  };

  const scanNoteOffline = () => {
    const onError = () => {
      reset();
      closeModal();
    };
    performNfcProcedure(
      actions.verifyOffline,
      undefined,
      undefined,
      undefined,
      () => openModal(),
      () => setTagDetected(),
      res => {
        setShowLoading(true);
        closeModal();
        updateResult(res, true);
      },
      onError,
    );
  };

  const personalizeNote = (extraEntropy /*: string */, onSuccess) => {
    if (!extraEntropy) {
      Alert.alert('Offline Cash', 'Please enter the extra entropy.');
      return;
    }

    performNfcProcedure(
      actions.personalize,
      extraEntropy,
      undefined,
      undefined,
      () => openModal(),
      () => setTagDetected(),
      async res => {
        forceChangeState({
          state: noteStates.pendingPersonalize,
          address: res.personalizeGeneratedAddress,
        });

        onSuccess?.();
        closeModal();
      },
      () => closeModal(),
    );
  };

  const rotateKey = (extraEntropy /*: string */, onSuccess, onError) => {
    if (!extraEntropy) {
      Alert.alert('Offline Cash', 'Please enter the extra entropy.');
      return;
    }

    const onSuccessCallback = res => {
      forceChangeState({
        state: noteStates.pendingRotate,
        address: res.rotateGeneratedAddress,
        hasPendingInTransfer: true,
        rotationAborted: false,
        history: [
          {
            confirmed: false,
            time: undefined,
            txid: res.rotateTx,
            type: 'in',
            value: note.nominalValue,
          },
        ],
      });

      onSuccess?.();
      closeModal();
      Alert.alert(
        'Offline Cash',
        'The key rotation transaction was submitted. It might take a few hours before the funds are actually moved.\n\nPlease re-scan the note after some time to check whether the operation has finished.',
      );
    };

    performNfcProcedure(
      actions.rotate,
      extraEntropy,
      undefined,
      undefined,
      () => openModal(),
      () => setTagDetected(),
      onSuccessCallback,
      () => {
        closeModal();
        onError();
      },
    );
  };

  const withdrawNote = (withdrawAddress /*: string */, txFeeType, onSuccess, afterAction) => {
    if (!withdrawAddress) {
      Alert.alert('Offline Cash', 'Please enter the withdrawal address.');
      return;
    }

    performNfcProcedure(
      actions.withdraw,
      undefined,
      withdrawAddress,
      txFeeType,
      () => openModal(),
      () => setTagDetected(),
      res => {
        forceChangeState({
          state: noteStates.withdraw,
          hasPendingOutTransfer: true,
          history: [
            ...note.history,
            {
              confirmed: false,
              time: undefined,
              txid: res.withdrawTx,
              type: 'out',
              value: -note.btcBalance,
            },
          ],
        });

        onSuccess?.();
        closeModal();
        Alert.alert(
          'Offline Cash',
          'The withdrawal transaction was submitted. It might take a few hours before the funds are actually moved.',
        );
      },
      () => closeModal(),
      afterAction,
    );
  };

  const withdrawOffline = (withdrawAddress /*: string */, txFeeType, onSuccess, afterAction) => {
    if (!withdrawAddress) {
      Alert.alert('Offline Cash', 'Please enter the withdrawal address.');
      return;
    }

    performNfcProcedure(
      actions.withDrawOffline,
      undefined,
      withdrawAddress,
      txFeeType,
      () => openModal(),
      () => setTagDetected(),
      res => {
        forceChangeState({
          history: [
            ...note.history,
            {
              confirmed: false,
              time: undefined,
              txid: res.offlineWithdrawTx,
              type: 'out',
              value: -note.btcBalance,
            },
          ],
        });

        onSuccess?.();
        closeModal();
        Alert.alert(
          'Offline Cash',
          'The withdrawal transaction was submitted. It might take a few hours before the funds are actually moved.',
        );
      },
      () => closeModal(),
      afterAction,
    );
  };

  return {
    scanNote,
    scanNoteOffline,
    personalizeNote,
    rotateKey,
    withdrawNote,
    withdrawOffline,
  };
};
