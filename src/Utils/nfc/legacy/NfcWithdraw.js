import {bytesToHex, hexToBytes} from '../../Util';
import aesjs from 'aes-js';
import {BtcAddr} from '@offline-cash/offline-cash-lib';
import * as bitcoin from 'bitcoinjs-lib';
import {BITCOIN_NETWORK, ESPLORA_API} from '../../../../Config';

async function postNfcWithdraw(
  serverStruct,
  clientStruct,
  releasedKey,
  withdrawAddress,
  txFeeType,
) {
  releasedKey = hexToBytes(releasedKey);
  var aesCbc = new aesjs.ModeOfOperation.cbc(
    releasedKey,
    serverStruct.encServerIV,
  );

  let dec = aesCbc.decrypt(serverStruct.encServerPrivKey);
  let serverKey = bytesToHex(dec);
  let clientKey = null;

  if (clientStruct?.clientPrivKeySlot1Version == serverStruct.client_key_ver) {
    clientKey = bytesToHex(clientStruct?.clientPrivKeySlot1);
  } else if (
    clientStruct?.clientPrivKeySlot2Version == serverStruct.client_key_ver
  ) {
    clientKey = bytesToHex(clientStruct?.clientPrivKeySlot2);
  } else {
    throw new Error('Failed to find appropriate key.');
  }

  let txid;

  try {
    txid = await BtcAddr.sendFromMultisig(
      ESPLORA_API,
      BITCOIN_NETWORK,
      bitcoin.ECPair.fromPrivateKey(Buffer.from(serverKey, 'hex')),
      bitcoin.ECPair.fromPrivateKey(Buffer.from(clientKey, 'hex')),
      serverStruct.lockTime,
      withdrawAddress,
      txFeeType,
    );
  } catch (e) {
    if (e.message === 'No input #0') {
      throw new Error(
        'Unable to construct inputs for the transaction. It appears like the funds are already pending withdrawal.',
      );
    }

    throw e;
  }

  return {serverKey, clientKey, txid};
}

async function nfcWithdrawOffline(serverStruct, clientStruct, withdrawAddress, txFeeType) {
  let clientKey = null;

  if (
    serverStruct.client_key_ver === 0 ||
    clientStruct?.clientPrivKeySlot1Version == serverStruct.client_key_ver
  ) {
    clientKey = bytesToHex(clientStruct?.clientPrivKeySlot1);
  } else if (
    clientStruct?.clientPrivKeySlot2Version == serverStruct.client_key_ver
  ) {
    clientKey = bytesToHex(clientStruct?.clientPrivKeySlot2);
  } else {
    throw new Error('Failed to find appropriate key.');
  }

  let txid;

  try {
    txid = await BtcAddr.sendFromMultisig(
      ESPLORA_API,
      BITCOIN_NETWORK,
      bitcoin.ECPair.fromPublicKey(
        Buffer.from([4, ...serverStruct.serverPubKey]),
      ),
      bitcoin.ECPair.fromPrivateKey(Buffer.from(clientKey, 'hex')),
      serverStruct.lockTime,
      withdrawAddress,
    );
  } catch (e) {
    console.error('nfcWithdrawOffline(): send from multisig error');
    console.error(e);

    if (e.message === 'No input #0') {
      throw new Error(
        'Unable to construct inputs for the transaction. It appears like the funds are already pending withdrawal.',
      );
    }

    if (e.message.includes('RPC error') && e.message.includes('non-final')) {
      throw new Error(
        'The validity date has not yet expired, you are not allowed to perform offline withdraw. Please try with normal withdraw procedure.',
      );
    }

    throw e;
  }

  return txid;
}

export {postNfcWithdraw, nfcWithdrawOffline};
