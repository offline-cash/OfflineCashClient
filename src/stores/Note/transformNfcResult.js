import {noteStates, backendStateMap} from '../../Utils/noteStates';
import {
  PERSONALISATION_FEE_SATS,
  ROTATION_FEE_SATS,
  ESPLORA_API,
  BITCOIN_NETWORK,
} from '../../../Config';
import {BtcAddr} from '@offline-cash/offline-cash-lib';
import {verifyStateSignature} from '../../Utils/nfc/legacy/NfcCmd';

export const transformNfcResult = async nfcResult => {
  // Note is not (physically) cut
  const tagTamperStatus = nfcResult?.postVerify?.tagtamper;
  // default to true because of weird state when rotating
  const isSealed = tagTamperStatus
    ? nfcResult?.postVerify?.tagtamper === 'secure'
    : true;
  const nominalValue = nfcResult?.serverStruct?.nominalValue || null;
  const lockTime = new Date(nfcResult.serverStruct.lockTime * 1000);
  const serialNr = nfcResult?.postVerify?.serial_number;

  let isKeySlot1Recent =
    nfcResult?.clientStruct?.clientPrivKeySlot1Version >
    nfcResult?.clientStruct?.clientPrivKeySlot2Version;

  let swapSlots = false;

  if (nfcResult?.postVerify) {
    if (nfcResult?.postVerify.client_key_ver < nfcResult?.clientStruct?.clientPrivKeySlot1Version) {
      swapSlots = true;
    }

    if (nfcResult?.postVerify.client_key_ver < nfcResult?.clientStruct?.clientPrivKeySlot2Version) {
      swapSlots = true;
    }

    if (swapSlots) {
      isKeySlot1Recent = !isKeySlot1Recent;
    }
  }

  let address = isKeySlot1Recent
    ? nfcResult?.btc?.addressSlot1
    : nfcResult?.btc?.addressSlot2;

  let [history, btcBalance /* SATS */, signatureStatus] = await Promise.all([
    address && BtcAddr.analyseTransfersOnAddress(ESPLORA_API, address),
    address && BtcAddr.checkAddressBalance(ESPLORA_API, address),
    verifyStateSignature(nfcResult.serverStruct),
  ]);

  // server doesn't accept the most recent key slot yet and there is no outgoing transaction
  // on the old slot => key rotation was started but stuck
  let rotationAborted = (history && history.filter(x => x.type === 'out' && !x.confirmed).length === 0 && swapSlots);

  if (swapSlots && !rotationAborted) {
    isKeySlot1Recent = !isKeySlot1Recent;

    address = isKeySlot1Recent
      ? nfcResult?.btc?.addressSlot1
      : nfcResult?.btc?.addressSlot2;

    [history, btcBalance /* SATS */, signatureStatus] = await Promise.all([
      address && BtcAddr.analyseTransfersOnAddress(ESPLORA_API, address),
      address && BtcAddr.checkAddressBalance(ESPLORA_API, address),
      verifyStateSignature(nfcResult.serverStruct),
    ]);
  }

  const isVerificationValid = signatureStatus.valid;
  const verificationDate = new Date(signatureStatus.timestamp * 1000);
  const hasRotationFunds = btcBalance > nominalValue + ROTATION_FEE_SATS;
  const hasPersonalisationFunds =
    btcBalance > nominalValue + PERSONALISATION_FEE_SATS;
  const isLoaded = !rotationAborted && btcBalance >= nominalValue;
  const isPartiallyLoaded = !rotationAborted && btcBalance > 0;
  const isExpired = new Date() >= lockTime;
  const hasPendingInTransfer =
    history && history.filter(x => !x.confirmed && x.value > 0).length > 0;
  const hasPendingOutTransfer =
    history && history.filter(x => !x.confirmed && x.value < 0).length > 0;

  let clientPubKey = null;

  if (nfcResult?.clientStruct) {
    if (isKeySlot1Recent) {
      clientPubKey = BtcAddr.privKeyToPublic(
        Buffer.from(nfcResult.clientStruct.clientPrivKeySlot1),
      );
    } else {
      clientPubKey = BtcAddr.privKeyToPublic(
        Buffer.from(nfcResult.clientStruct.clientPrivKeySlot2),
      );
    }
  }

  let singleSigFee = async () => await BtcAddr.estimateTxFee(
    ESPLORA_API, BITCOIN_NETWORK, Buffer.from([4, ...nfcResult.serverStruct.serverPubKey]), clientPubKey, nfcResult.serverStruct.lockTime, 1
  );
  let dualSigFee = async () => await BtcAddr.estimateTxFee(
    ESPLORA_API, BITCOIN_NETWORK, Buffer.from([4, ...nfcResult.serverStruct.serverPubKey]), clientPubKey, nfcResult.serverStruct.lockTime, 2
  );

  let state = noteStates.error;

  if (nfcResult?.serverStruct.state) {
    state = nfcResult?.serverStruct.state;
  }

  if (nfcResult?.postVerify?.state) {
    let match = Object.entries(backendStateMap).filter(
      x => (x[0] === nfcResult?.postVerify?.state));

    if (match.length === 1) {
      state = match[0][1];
    }
  }

  return {
    state,
    address,
    serialNr,
    nominalValue,
    btcBalance,
    isVerificationValid,
    verificationDate,
    lockTime,
    history,
    isSealed,
    isLoaded,
    isPartiallyLoaded,
    isExpired,
    hasRotationFunds,
    hasPersonalisationFunds,
    hasPendingInTransfer,
    hasPendingOutTransfer,
    singleSigFee,
    dualSigFee,
    rotationAborted,
  };
};
