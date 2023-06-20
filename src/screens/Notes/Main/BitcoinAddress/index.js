import {HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import CopyCircleIcon from '../../../../components/CopyCircleIcon';
import {useNoteContext} from '../../../../stores/Note';
import {copyToClipboard} from '../../../../Utils/Util';
import BtcIcon from './BtcIcon';

const BitcoinAddress = () => {
  const {
    note: {address},
  } = useNoteContext();

  if (!address) {
    return null;
  }

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      mb={'30px'}
      space={3}>
      <VStack
        alignContent="center"
        justifyContent="space-between"
        flexShrink={1}>
        <HStack alignContent="center" pb={1.5}>
          <BtcIcon />
          <Text variant="dataTitle" textTransform="uppercase" ml={1}>
            Bitcoin Address
          </Text>
        </HStack>
        <Text variant="dataSubject">{address}</Text>
      </VStack>
      <Pressable onPress={() => copyToClipboard(address, 'Address copied')}>
        <CopyCircleIcon />
      </Pressable>
    </HStack>
  );
};

export default BitcoinAddress;
