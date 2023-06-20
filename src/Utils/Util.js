import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {Toast} from 'native-base';
import ToastCopy from '../theme/Components/ToastCopy';

const hexToBytes = hex => {
  let bytes, c;
  let validHex = '0123456789abcdef'.split('');

  if (hex.length % 2 !== 0) {
    throw Error('Odd-length hex string');
  }

  if (hex.split('').some(char => !validHex.includes(char.toLowerCase()))) {
    throw Error('Hex string contains invalid characters!');
  }

  for (bytes = [], c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};

const bytesToHex = bytes => {
  let hex, i;
  for (hex = [], i = 0; i < bytes.length; i++) {
    let current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    // eslint-disable-next-line no-bitwise
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join('');
};

const arrayCompare = (a1, a2) => {
  return a1.length === a2.length && a1.every((v, i) => v === a2[i]);
};

const copyToClipboard = (copyText, toastMessage) => {
  Clipboard.setString(copyText);
  Toast.show({
    render: () => {
      return <ToastCopy text={toastMessage} />;
    },
    duration: 1000,
  });
};

export {hexToBytes, bytesToHex, arrayCompare, copyToClipboard};
