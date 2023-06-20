import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import WebSocketAsPromised from 'websocket-as-promised';
import {bytesToHex, hexToBytes} from '../../Util';
import {
  nfcInitializeClientStruct,
  nfcRotateKey,
  nfcRotateTx,
} from './NfcPersonalize';
import {nfcWithdrawOffline, postNfcWithdraw} from './NfcWithdraw';
import {readFile2, readFile3, validateServerCommand} from './NfcCmd';
import {Platform} from 'react-native';
import {BtcAddr} from '@offline-cash/offline-cash-lib';
import {Buffer} from 'buffer';
import {
  BITCOIN_NETWORK,
  CUSTOMER_SERVER_ADDRESS,
  AIRTIME_ROOT_AX6_PEM,
} from '../../../../Config';
import {actions} from './Nfc-actions';
import {getReadableVersion} from 'react-native-device-info';

function validateMultisigAddresses(result) {
  let oV1 = result.postVerify.client_keys.find(
    x => x.version === result.clientStruct?.clientPrivKeySlot1Version,
  );
  let oV2 = result.postVerify.client_keys.find(
    x => x.version === result.clientStruct?.clientPrivKeySlot2Version,
  );

  let isProvisioned = result.postVerify.state === 'provisioned';
  let isPersonalizing = result.postVerify.state === 'pending_personalize';
  let isRotatingKey = result.postVerify.state === 'pending_rotate';

  if (isPersonalizing) {
    if (!oV1) {
      throw Error(
        "Sanity check failed: Tag is is pending personalization but the server doesn't know key in slot 1",
      );
    }

    if (oV1.address !== result.btc.addressSlot1) {
      throw Error(
        'Sanity check failed: Address in slot 1 is mismatched between the client and the server',
      );
    }
  } else if (isRotatingKey) {
    if (!oV1) {
      throw Error(
        "Sanity check failed: Tag is is pending rotation but the server doesn't know the key in slot 1",
      );
    }

    if (!oV2) {
      throw Error(
        "Sanity check failed: Tag is is pending rotation but the server doesn't know the key in slot 2",
      );
    }

    if (oV1.address !== result.btc.addressSlot1) {
      throw Error(
        'Sanity check failed: Address in slot 1 is mismatched between the client and the server',
      );
    }

    if (oV2.address !== result.btc.addressSlot2) {
      throw Error(
        'Sanity check failed: Address in slot 2 is mismatched between the client and the server',
      );
    }
  } else if (!isProvisioned) {
    let currentKeyVer = result.serverStruct.client_key_ver;

    if (result.clientStruct?.clientPrivKeySlot1Version <= currentKeyVer) {
      if (!oV1) {
        throw Error('Sanity check failed: address slot 1 missing client key');
      }

      if (oV1.address !== result.btc.addressSlot1) {
        throw Error(
          'Sanity check failed: Address in slot 1 is mismatched between the client and the server',
        );
      }
    }

    if (
      result.clientStruct?.clientPrivKeySlot2Version !== 0 &&
      result.clientStruct?.clientPrivKeySlot2Version <= currentKeyVer
    ) {
      if (!oV2) {
        throw Error('Sanity check failed: address slot 2 missing client key');
      }

      if (oV2.address !== result.btc.addressSlot2) {
        throw Error(
          'Sanity check failed: Address in slot 2 is mismatched between the client and the server',
        );
      }
    }
  }

  console.log('validateMultisigAddresses: all checks passed');
}

function communicateNfc(
  procedureType,
  dispatch,
  magicToken,
  extraEntropy,
  withdrawAddress,
  txFeeType,
  deviceId,
) {
  return new Promise(async (resolve, reject) => {
    let isSuccess = false;
    let errorMsg = 'No error details given.';

    try {
      // our custom native patch, see ios/Patches/WebSocketCertPinning.patch
      // the _iosSSLTrustedRoots property is ignored on Android, and we use network security config instead
      const createWebSocketFn = url =>
        new WebSocket(url, '', {_iosSSLTrustedRoots: AIRTIME_ROOT_AX6_PEM});

      const wsp = new WebSocketAsPromised(
        CUSTOMER_SERVER_ADDRESS + '?v=' + getReadableVersion(),
        {
          createWebSocket: createWebSocketFn,
          packMessage: data => JSON.stringify(data),
          unpackMessage: data => JSON.parse(data),
        },
      );

      wsp.onUnpackedMessage.addListener(async packet => {
        console.log(packet);

        if (packet.type === 'pong') {
          console.log('pong');
          return;
        }

        try {
          if (
            procedureType === actions.withdraw &&
            packet.type === 'key_release'
          ) {
            result.postWithdraw = await postNfcWithdraw(
              result.serverStruct,
              result.clientStruct,
              packet.key,
              withdrawAddress,
              txFeeType,
            );
            await wsp.sendPacked({
              type: 'client_tx_hint',
              txid: result.postWithdraw.txid,
            });
            result.withdrawTx = result.postWithdraw.txid;
          } else if (
            procedureType === actions.personalize &&
            packet.type === 'client_write_struct'
          ) {
            let res = await nfcInitializeClientStruct(
              result.serverStruct,
              extraEntropy,
            );

            let newAddress = BtcAddr.getMultisigPayment(
              BITCOIN_NETWORK,
              Buffer.from([4, ...result.serverStruct.serverPubKey]),
              Buffer.from(res.clientPublic, 'hex'),
              result.serverStruct.lockTime,
            ).address;

            const res_packet = {
              type: 'client_write_response',
              clientPublic: res.clientPublic,
              newAddress: newAddress,
              cmdsExecuted: 3,
            };
            console.log(res_packet);
            await wsp.sendPacked(res_packet);
            result.personalizeGeneratedAddress = newAddress;
          } else if (
            procedureType === actions.rotate &&
            packet.type === 'client_rotate_key'
          ) {
            let res = await nfcRotateKey(
              result.serverStruct,
              result.clientStruct,
              packet.current_key_version,
              extraEntropy,
            );

            let newAddress = BtcAddr.getMultisigPayment(
              BITCOIN_NETWORK,
              Buffer.from([4, ...result.serverStruct.serverPubKey]),
              Buffer.from(res.rotatedClientPublic, 'hex'),
              result.serverStruct.lockTime,
            ).address;

            const res_packet = {
              type: 'client_rotate_response',
              clientPublic: res.rotatedClientPublic,
              clientPublicVer: res.rotatedVersion,
              encServerIV: bytesToHex(result.serverStruct.encServerIV),
              encServerPrivKey: bytesToHex(
                result.serverStruct.encServerPrivKey,
              ),
              newAddress: newAddress,
              cmdsExecuted: res.keyWritten ? 2 : 0,
            };

            console.log(res_packet);
            result.rotateGeneratedAddress = newAddress;
            await wsp.sendPacked(res_packet);
          } else if (
            procedureType === 'rotate' &&
            packet.type === 'client_rotate_tx'
          ) {
            let txid = await nfcRotateTx(
              packet.tx,
              result.clientStruct,
              result.serverStruct.client_key_ver,
            );
            await wsp.sendPacked({
              type: 'client_tx_hint',
              txid: txid,
            });
            result.rotateTx = txid;
          } else if (packet.type === 'verify_res') {
            result.postVerify = packet.res;
            validateMultisigAddresses(result);
          } else if (packet.type === 'command') {
            const payload = hexToBytes(packet.data);
            let resp;

            if (
              !validateServerCommand(payload, result.serverStruct.state_offset)
            ) {
              throw new Error(
                'Server tried to issue prohibited command: ' +
                  bytesToHex(payload),
              );
            }

            let timeStart = new Date().getTime();
            try {
              resp = await NfcManager.isoDepHandler.transceive(payload);
            } catch (e) {
              wsp.close();

              if (Platform.OS === 'ios') {
                NfcManager.invalidateSessionWithErrorIOS(
                  'Failed to read the Bitcoin note.',
                );
              } else {
                NfcManager.cancelTechnologyRequest().catch(() => 0);
              }

              reject(e);
              return;
            }
            let timeEnd = new Date().getTime();

            const res_packet = {
              type: 'response',
              data: bytesToHex(resp),
              execTime: timeEnd - timeStart,
            };
            console.log(res_packet);
            await wsp.sendPacked(res_packet);
          } else if (packet.type === 'status') {
            isSuccess = packet.ok;
            errorMsg = packet.message;
          }
        } catch (e) {
          await wsp.close();
          reject(e.message ? e.message : e);
        }
      });

      wsp.onOpen.addListener(async data => {
        await wsp.sendPacked({
          type: 'ping',
        });

        console.log('connected');
      });

      wsp.onClose.addListener(async data => {
        if (Platform.OS === 'ios' && isSuccess) {
          await NfcManager.setAlertMessageIOS('Operation completed!');
          NfcManager.cancelTechnologyRequest().catch(() => 0);
        } else if (Platform.OS === 'ios') {
          await NfcManager.invalidateSessionWithErrorIOS(errorMsg);
        } else {
          NfcManager.cancelTechnologyRequest().catch(() => 0);
        }

        if (isSuccess) {
          resolve(result);
        } else {
          reject(errorMsg);
        }
      });

      let shouldConnect =
        procedureType !== 'verify_offline' &&
        procedureType !== 'withdraw_offline';

      await Promise.all([
        shouldConnect ? wsp.open() : async () => true,
        NfcManager.requestTechnology(NfcTech.IsoDep, {
          alertMessage:
            'Please hold NFC chip on Bitcoin Note to your phone for a moment.',
        }),
      ]);

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS(
          'Still working, please continue to hold Bitcoin Note to your phone for a moment.',
        );
      }

      dispatch?.reportTagDetected?.();
      let tag = await NfcManager.getTag();
      let result = {};

      async function knockTag() {
        try {
          await NfcManager.isoDepHandler.transceive([]);
        } catch (e) {
          if (e.toString().includes('transceive fail')) {
            // this is OK
            setTimeout(knockTag, 10);
          } else if (e.toString().includes('no tech request available')) {
            // ignore
          } else {
            console.error('knock tag fail', e);
          }
        }
      }

      if (Platform.OS === 'android') {
        setTimeout(knockTag, 10);
      }

      // always read all possible structures before connecting to the server
      for (let i = 0; i < 4; i++) {
        try {
          console.log('read file 2');
          result.serverStruct = await readFile2();
          break;
        } catch (e) {
          // pass
        }
      }

      if (!result.serverStruct) {
        console.log('read file 2');
        result.serverStruct = await readFile2();
      }

      result.clientStruct = null;

      console.log('read file 3');
      if (result.serverStruct.state !== 'BL') {
        // the tag is client-side personalized so we should expect
        // the client's structure is valid
        for (let i = 0; i < 4; i++) {
          try {
            result.clientStruct = await readFile3();
            break;
          } catch (e) {
            // pass
          }
        }

        if (!result.clientStruct) {
          result.clientStruct = await readFile3();
        }

        console.log('get multisig payment');
        result.btc = {};
        result.btc.addressSlot1 = BtcAddr.getMultisigPayment(
          BITCOIN_NETWORK,
          Buffer.from([4, ...result.serverStruct.serverPubKey]),
          BtcAddr.privKeyToPublic(
            Buffer.from(result.clientStruct?.clientPrivKeySlot1),
          ),
          result.serverStruct.lockTime,
        ).address;

        if (result.clientStruct?.clientPrivKeySlot2Version != 0) {
          result.btc.addressSlot2 = BtcAddr.getMultisigPayment(
            BITCOIN_NETWORK,
            Buffer.from([4, ...result.serverStruct.serverPubKey]),
            BtcAddr.privKeyToPublic(
              Buffer.from(result.clientStruct?.clientPrivKeySlot2),
            ),
            result.serverStruct.lockTime,
          ).address;
        } else {
          result.btc.addressSlot2 = null;
        }

        console.log('slot1', result.btc.addressSlot1);
        console.log('slot2', result.btc.addressSlot2);

        if (
          result.serverStruct.serverPsHash !==
          bytesToHex(result.clientStruct?.serverDataHash)
        ) {
          throw Error('Server data hash mismatch.');
        }
      }

      if (
        procedureType === 'verify_offline' ||
        procedureType === 'withdraw_offline'
      ) {
        if (procedureType === 'withdraw_offline') {
          result.offlineWithdrawTx = await nfcWithdrawOffline(
            result.serverStruct,
            result.clientStruct,
            withdrawAddress,
            txFeeType,
          );
        }

        NfcManager.cancelTechnologyRequest().catch(() => 0);
        resolve(result);

        // don't connect to the server, this is offline operation
        return;
      }

      await wsp.sendPacked({
        type: 'operation',
        operation: 'customer',
        uid: tag.id,
        magicToken: magicToken,
        deviceId: deviceId,
        tech: 'IsoDep',
        nfcProcedure: procedureType,
      });
    } catch (ex) {
      if (Platform.OS === 'ios') {
        NfcManager.invalidateSessionWithErrorIOS(
          'Failed to read the Bitcoin note.',
        ).catch(() => 0);
      } else {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
      }

      reject(ex);
    }
  });
}

export {communicateNfc};
