import {getUniqueId, getManufacturer} from 'react-native-device-info';
import {communicateNfc} from './legacy/Nfc';
import {Alert, Vibration} from 'react-native';
import {isAndroid} from '../helpers';
import {Toast} from 'native-base';
import ToastCopy from '../../theme/Components/ToastCopy';

/* preAction, onSuccess, onError and afterAction are just compatibility functions
 * if not needed, feel free to remove
 */

function displayErrorToast(errorMsg) {
  Toast.show({
    render: () => {
      return <ToastCopy isError={true} text={errorMsg} />;
    },
    placement: 'top',
    duration: 5000,
  });
}

export async function performNfcProcedure(
  procedureType,
  extraEntropy /* ? string - used with 'personalize' and 'rotate' */,
  withdrawAddress /* string */,
  txFeeType /* string */,
  preAction,
  onStartScan,
  onSuccess /* (res: any) */,
  onError,
  afterAction,
) {
  const deviceId = (await getManufacturer()) + ':' + (await getUniqueId());
  let res = null;

  preAction?.();
  try {
    res = await communicateNfc(
      procedureType,
      {reportTagDetected: () => onStartScan?.()},
      null,
      extraEntropy,
      withdrawAddress,
      txFeeType,
      deviceId,
    );

    onSuccess?.(res);
  } catch (e) {
    console.log('Unhandled error in NFC procedure:');
    console.log(e);

    displayErrorToast('Failed to scan tag.\n' + e.toString());

    if (isAndroid()) {
      Vibration.vibrate(200);
    }

    onError?.();
    return false;
  } finally {
    afterAction?.();
  }

  if (isAndroid()) {
    Vibration.vibrate(200);
  }

  return res ?? false;
}
