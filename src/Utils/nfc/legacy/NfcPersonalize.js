import {ec as EC} from 'elliptic';
import {
  EC_TYPE_SECP256K1,
  makeApduCmd,
  makeClientStruct,
  nfcCmd,
  readFile3,
  unwrapResponse,
} from './NfcCmd';
import NfcManager from 'react-native-nfc-manager';
import {arrayCompare, bytesToHex, hexToBytes} from '../../Util';
import {Buffer} from 'buffer';
import * as bitcoin from 'bitcoinjs-lib';
import {BtcAddr, Util} from '@offline-cash/offline-cash-lib';
import axios from 'axios';
import {BITCOIN_NETWORK, ESPLORA_API} from '../../../../Config';
import {generateSecureRandom} from 'react-native-securerandom';

async function nfcInitializeClientStruct(serverStruct, extraEntropy) {
  let secureRandom = await generateSecureRandom(32);
  const extraEntropyBytes = Buffer.from(extraEntropy);
  let entropy = [...secureRandom, ...extraEntropyBytes];

  console.log('Entropy vector', entropy);

  let ec = new EC('secp256k1');
  let key = ec.genKeyPair({entropy: entropy});
  let privKeyHex = key.getPrivate().toString('hex').padStart(64, '0');

  console.log("Generated client's private key:", privKeyHex);

  let serverDataHash = hexToBytes(serverStruct.serverPsHash);
  let clientPrivate = hexToBytes(privKeyHex);
  let clStruct = makeClientStruct(serverDataHash, clientPrivate);

  unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.WRITE_DATA, {
        file_no: 0x03,
        write_offset: 0x00,
        data: clStruct,
      }),
    ),
  );

  let rbClStruct = await readFile3({dont_select: true});

  if (rbClStruct.curveType !== EC_TYPE_SECP256K1) {
    throw Error('Readback failed: invalid curve type.');
  }

  if (!arrayCompare(serverDataHash, rbClStruct.serverDataHash)) {
    throw Error("Readback failed: server data hash doesn't match.");
  }

  if (!arrayCompare(clientPrivate, rbClStruct.clientPrivKeySlot1)) {
    throw Error("Readback failed: client private key slot #1 doesn't match.");
  }

  if (!arrayCompare(Array(32).fill(0), rbClStruct.clientPrivKeySlot2)) {
    throw Error(
      'Readback failed: client private key slot #2 is not all-zeros.',
    );
  }

  return {
    clientPublic: key.getPublic().encode('hex'),
    serverDataHash: bytesToHex(rbClStruct.serverDataHash),
    clientPrivate: bytesToHex(rbClStruct.clientPrivKeySlot1),
  };
}

async function generateWriteNewKey(newVer, targetOffset, extraEntropy) {
  let secureRandom = await generateSecureRandom(32);
  const extraEntropyBytes = Buffer.from(extraEntropy);
  let entropy = [...secureRandom, ...extraEntropyBytes];

  console.log('Entropy vector', entropy);

  let ec = new EC('secp256k1');
  let key = ec.genKeyPair({entropy: entropy});
  let privKeyHex = key.getPrivate().toString('hex').padStart(64, '0');

  console.log("Generated client's private key:", privKeyHex);

  let payload = [...newVer, ...hexToBytes(privKeyHex)];

  if (payload.length !== 4 + 32) {
    throw Error('Packed structure is not 4+32 bytes long.');
  }

  unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.WRITE_DATA, {
        file_no: 0x03,
        write_offset: targetOffset,
        data: payload,
      }),
    ),
  );

  let readbackData = unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.READ_DATA, {
        file_no: 0x03,
        read_offset: targetOffset,
        read_length: payload.length,
      }),
    ),
  );

  if (!arrayCompare(payload, readbackData)) {
    throw Error('Readback failed');
  }

  return key;
}

async function nfcRotateKey(
  serverStruct,
  clientStruct,
  currentKeyVersion,
  extraEntropy,
) {
  let newVer = null;
  let newVerInt = null;
  let targetOffset = null;
  let keyWritten = false;
  let newPrivateKey = null;
  let newPublicKey = null;

  if (clientStruct?.clientPrivKeySlot1Version == currentKeyVersion) {
    // currently selected key is in slot 1
    newVerInt = clientStruct?.clientPrivKeySlot1Version + 1;

    newVer = Buffer.alloc(4);
    newVer.writeInt32LE(newVerInt);
    targetOffset = clientStruct?.clientPrivKeySlot2Offset;

    if (
      clientStruct?.clientPrivKeySlot1Version >
      clientStruct?.clientPrivKeySlot2Version
    ) {
      // slot 1 has the most recent key, we can write new key
      // to the slot 2 and report it to the server
      newPrivateKey = await generateWriteNewKey(
        newVer,
        targetOffset,
        extraEntropy,
      );
      newPublicKey = newPrivateKey.getPublic().encode('hex');
      keyWritten = true;
    } else {
      newPrivateKey = bitcoin.ECPair.fromPrivateKey(
        Buffer.from(clientStruct?.clientPrivKeySlot2),
      );
      newPublicKey = newPrivateKey.publicKey.toString('hex');
    }
  } else if (clientStruct?.clientPrivKeySlot2Version == currentKeyVersion) {
    // currently selected key is in slot 2
    newVerInt = clientStruct?.clientPrivKeySlot2Version + 1;

    newVer = Buffer.alloc(4);
    newVer.writeInt32LE(newVerInt);
    targetOffset = clientStruct?.clientPrivKeySlot1Offset;

    if (
      clientStruct?.clientPrivKeySlot2Version >
      clientStruct?.clientPrivKeySlot1Version
    ) {
      // slot 2 has the most recent key, we can write new key
      // to the slot 1 and report it to the server
      newPrivateKey = await generateWriteNewKey(
        newVer,
        targetOffset,
        extraEntropy,
      );
      newPublicKey = newPrivateKey.getPublic().encode('hex');
      keyWritten = true;
    } else {
      newPrivateKey = bitcoin.ECPair.fromPrivateKey(
        Buffer.from(clientStruct?.clientPrivKeySlot1),
      );
      newPublicKey = newPrivateKey.publicKey.toString('hex');
    }
  } else {
    throw Error('Unable to find active client key');
  }

  return {
    keyWritten: keyWritten,
    rotatedVersion: newVerInt,
    rotatedClientPublic: newPublicKey,
  };
}

async function nfcRotateTx(tx, clientStruct, client_key_ver) {
  tx = Util.jsonParseWithBuffers(tx);

  const psbt = new bitcoin.Psbt({network: BITCOIN_NETWORK});
  psbt.setVersion(2);
  psbt.setLocktime(0);

  tx.inputs.forEach(input => {
    psbt.addInput(input);
  });

  tx.outputs.forEach(output => {
    psbt.addOutput(output);
  });

  for (const idx in psbt.data.inputs) {
    psbt.data.inputs[idx].partialSig = tx.sig[idx];
  }

  let currentClientKey = null;

  if (clientStruct?.clientPrivKeySlot1Version == client_key_ver) {
    currentClientKey = clientStruct?.clientPrivKeySlot1;
  } else if (clientStruct?.clientPrivKeySlot2Version == client_key_ver) {
    currentClientKey = clientStruct?.clientPrivKeySlot2;
  }

  const btcClientKey = bitcoin.ECPair.fromPrivateKey(
    Buffer.from(currentClientKey),
  );
  psbt.signAllInputs(btcClientKey);

  if (!psbt.validateSignaturesOfAllInputs()) {
    throw new Error('Failed to validate signatures.');
  }

  for (let i = 0; i < psbt.inputCount; i++) {
    psbt.finalizeInput(
      i,
      BtcAddr.csvGetFinalScripts.bind(null, BITCOIN_NETWORK),
    );
  }

  let finalizedTx = psbt.extractTransaction().toHex();
  console.log('finalizedTx', finalizedTx);

  let res;

  try {
    res = await axios.post(ESPLORA_API + '/tx', finalizedTx);
  } catch (e) {
    throw new Error('Failed to broadcast transaction: ' + e.response.data);
  }

  console.log('broadcasted tx', res.data);
  return res.data;
}

export {nfcInitializeClientStruct, nfcRotateKey, nfcRotateTx};
