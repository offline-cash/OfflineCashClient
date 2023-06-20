import React from 'react';
import {Text, VStack} from 'native-base';
import AddressBox from '../../AddressBox';
import QRCode from '../../QRCode';
import {useNoteContext} from '../../../../../stores/Note';

const SendFundsContent = () => {
  const {
    note: {address, nominalValue},
  } = useNoteContext();

  return (
    <VStack space={'xs'}>
      <Text variant="bottomSheet" mb={4}>
        Send {nominalValue / 10e4} mBTC to the address below. We recommend
        a&nbsp;low fee of 2&nbsp;SATS per byte.
      </Text>
      <AddressBox address={address} />
      <QRCode code={address} />
    </VStack>
  );
};

export default SendFundsContent;
