import {HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {format} from 'date-fns';
import CopyCircleIcon from '../../../../components/CopyCircleIcon';
import Icon from '../../../../components/Icon';
import {copyToClipboard} from '../../../../Utils/Util';
import {useNoteContext} from '../../../../stores/Note';

const ClaimBefore = () => {
  const {note} = useNoteContext();
  const claimBefore = format(note.lockTime, 'PPPppp');

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
          <Icon name="calendarIcon" color="#82798699" />
          <Text variant="dataTitle" textTransform="uppercase" ml={1}>
            Claim Before
          </Text>
        </HStack>
        <Text variant="dataSubject">{claimBefore}</Text>
      </VStack>
      <Pressable onPress={() => copyToClipboard(claimBefore, 'Date copied')}>
        <CopyCircleIcon />
      </Pressable>
    </HStack>
  );
};

export default ClaimBefore;
