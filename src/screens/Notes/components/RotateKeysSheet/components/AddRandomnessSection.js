import React, {forwardRef, useEffect, useState} from 'react';
import {Button, VStack, Text, Radio} from 'native-base';
import Card from '../../../../../components/Card';
import CardHeader from '../../CardHeader';
import CardSeparatorComponent from '../../CardSeparatorComponent';
import CreateUserKeyContent from '../../CreateUserKeyContent';
import {useNoteContext} from '../../../../../stores/Note';
import {useNfc} from '../../../../../Utils/hooks/useNfc';
import {generateRandomString} from '../../../../../Utils/generateRandomString';

const AddRandomnessSection = ({onSuccess, onError}, textInputRef) => {
  const {note} = useNoteContext();
  const [randomnessValue, setRandomnessValue] = useState('');
  const {rotateKey} = useNfc();

  useEffect(() => {
    generateRandomString(20).then(random => setRandomnessValue(random));
  }, []);

  return (
    <VStack>
      <Card>
        <CardHeader label={'Add your own randomness'} />
        <CreateUserKeyContent
          ref={textInputRef}
          randomnessValue={randomnessValue}
          setRandomnessValue={setRandomnessValue}
          loadSheet={false}
        />
      </Card>
      <Button
        mx={2}
        mt={5}
        variant="solid"
        size={'main'}
        onPress={() => {
          rotateKey(randomnessValue, onSuccess, onError);
        }}>
        Rotate Keys
      </Button>
    </VStack>
  );
};

export default forwardRef(AddRandomnessSection);
