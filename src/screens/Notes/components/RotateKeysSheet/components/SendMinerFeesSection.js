import React from 'react';
import {Text, VStack} from 'native-base';
import {useNoteContext} from '../../../../../stores/Note';
import AddressBox from '../../AddressBox';
import QRCode from '../../QRCode';
import Card from '../../../../../components/Card';
import CardHeader from '../../CardHeader';
import CardSeparatorComponent from '../../CardSeparatorComponent';
import {ROTATION_FEE_SATS} from '../../../../../../Config';

const SendMinerFeesSection = () => {
  const {
    note: {address},
  } = useNoteContext();

  return (
    <Card>
      <CardHeader label={'Send miner fees'} />
      <CardSeparatorComponent />
      <VStack space={'xs'}>
        <Text variant="bottomSheet" mb={4}>
          A miner fee of {ROTATION_FEE_SATS} SATS is required in order to rotate
          keys. Send the amount above to the address shown below to continue.
        </Text>
        <AddressBox address={address} />
        <QRCode code={address} />
      </VStack>
    </Card>
  );
};

export default SendMinerFeesSection;
