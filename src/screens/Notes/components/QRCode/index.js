import React from 'react';
import {Center} from 'native-base';
import QRCodeComponent from 'react-native-qrcode-svg';
import {Dimensions} from 'react-native';

const QRCode = ({code}) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <Center
      mb={1}
      width="100%"
      borderStyle="dashed"
      borderColor="borderDashed"
      borderWidth={1.25}
      borderRadius="10px"
      padding="16px">
      <QRCodeComponent value={code} size={Math.floor(windowWidth / 3)} />
    </Center>
  );
};

export default QRCode;
