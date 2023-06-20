import React, {forwardRef} from 'react';
import {Text, TextField, VStack} from 'native-base';

const CreateUserKeyContent = (
  {randomnessValue, setRandomnessValue, loadSheet},
  textInputRef,
) => (
  <VStack space={'xs'}>
    {loadSheet && <Text variant="bottomSheet">Add your own randomness</Text>}
    <Text
      variant="bottomSheet"
      color={loadSheet ? 'bottomSheetTextGrey' : 'bottomSheetText'}>
      This step will generate the user key for the multisig. Use the random
      number below or enter your own.
    </Text>
    <TextField
      ref={textInputRef}
      variant="primary"
      onChangeText={setRandomnessValue}
      value={randomnessValue}
      placeholder={'Add your own randomness'}
    />
  </VStack>
);

export default forwardRef(CreateUserKeyContent);
