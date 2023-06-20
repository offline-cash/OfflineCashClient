import {format} from 'date-fns';
import {Button, Center, Image, Text, VStack} from 'native-base';
import React from 'react';
import cutNote from '../../../../../assets/CutNote.png';
import {useNoteContext} from '../../../../../stores/Note';

const NotCutSection = ({onRetry}) => {
  const {note} = useNoteContext();
  const claimBefore = format(note.lockTime, 'PPPppp');

  return (
    <VStack mx={2}>
      <Text variant={'bottomSheet'} mb={5}>
        In order to withdraw funds, you need to either cut the note as shown
        below OR wait until {claimBefore}
      </Text>
      <Center>
        <Image
          source={cutNote}
          alt="Image of cutting the note"
          height="350px"
          width="full"
          borderRadius="30px"
        />
      </Center>
      <Button mt="30px" variant="solid" size="main" onPress={() => onRetry?.()}>
        Try again
      </Button>
    </VStack>
  );
};

export default NotCutSection;
