import React, {forwardRef, useEffect, useState} from 'react';
import {VStack, Button, Box} from 'native-base';
import Card from '../../../../components/Card';
import CardHeader from '../CardHeader';
import CardSeparatorComponent from '../CardSeparatorComponent';
import PrepareFundsContent from './components/PrepareFundsContent';
import {useNfc} from '../../../../Utils/hooks/useNfc';
import CreateUserKeyContent from '../CreateUserKeyContent';
import {useNoteContext} from '../../../../stores/Note';
import {generateRandomString} from '../../../../Utils/generateRandomString';

const LoadNoteSheetContent = ({onSuccess}, textInputRef) => {
  const [randomnessValue, setRandomnessValue] = useState('');
  const {note} = useNoteContext();
  const {personalizeNote} = useNfc();

  useEffect(() => {
    generateRandomString(20).then(random => setRandomnessValue(random));
  }, []);

  return (
    <Box>
      <VStack w={'full'} space={'xs'}>
        <Card>
          <CardHeader label={'Prepare Funds'} number={1} />
          <CardSeparatorComponent />
          <PrepareFundsContent noteValue={note.nominalValue} />
        </Card>
        <Card>
          <CardHeader label={'Create User Key'} number={2} />
          <CardSeparatorComponent />
          <CreateUserKeyContent
            ref={textInputRef}
            randomnessValue={randomnessValue}
            setRandomnessValue={setRandomnessValue}
            loadSheet={true}
          />
        </Card>
        <Button
          mx={2}
          mt={2}
          variant="solid"
          size={'main'}
          onPress={() => personalizeNote(randomnessValue, onSuccess)}>
          Personalize Note
        </Button>
      </VStack>
    </Box>
  );
};

export default forwardRef(LoadNoteSheetContent);
