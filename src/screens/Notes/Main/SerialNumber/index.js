import {HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import CopyCircleIcon from '../../../../components/CopyCircleIcon';
import {useNoteContext} from '../../../../stores/Note';
import {copyToClipboard} from '../../../../Utils/Util';
import SerialNrIcon from './SerialNrIcon';

const SerialNumber = () => {
  const {
    note: {serialNr},
  } = useNoteContext();

  if (!serialNr) {
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
          <SerialNrIcon />
          <Text variant="dataTitle" textTransform="uppercase" ml={1}>
            Serial Number
          </Text>
        </HStack>
        <Text variant="dataSubject">{serialNr}</Text>
      </VStack>
      <Pressable onPress={() => copyToClipboard(serialNr, 'Address copied')}>
        <CopyCircleIcon />
      </Pressable>
    </HStack>
  );
};

export default SerialNumber;
