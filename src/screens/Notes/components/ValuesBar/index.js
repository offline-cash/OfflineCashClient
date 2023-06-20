import {HStack, Text} from 'native-base';
import React from 'react';
import Icon from '../../../../components/Icon';
import {useNoteContext} from '../../../../stores/Note';

const ValuesBar = ({isWithdrawVariant, isAvailable}) => {
  const {note} = useNoteContext();

  const btcValue = `${note.nominalValue / 10e7} BTC`;
  const mBtcValue = `${note.nominalValue / 10e4} mBTC`;
  const satsValue = `${note.nominalValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} SATS`;

  const textVariant = isWithdrawVariant ? 'withdrawConverted' : 'converted';

  return (
    <HStack justifyContent="space-between" mx={isWithdrawVariant && 2}>
      {isWithdrawVariant && (
        <Text variant="available" textTransform="uppercase">
          {isAvailable ? 'Available' : 'Unavailable'}
        </Text>
      )}
      <HStack alignItems="center" mb={4} space={2}>
        <Text variant={textVariant} textTransform="uppercase">
          {btcValue}
        </Text>
        <Icon name="dotIcon" color="#68606CB3" size={2} />
        <Text variant={textVariant} textTransform="uppercase">
          {satsValue}
        </Text>
        <Icon name="dotIcon" color="#68606CB3" size={2} />
        <Text variant={textVariant} textTransform="uppercase">
          {mBtcValue}
        </Text>
      </HStack>
    </HStack>
  );
};

export default ValuesBar;
