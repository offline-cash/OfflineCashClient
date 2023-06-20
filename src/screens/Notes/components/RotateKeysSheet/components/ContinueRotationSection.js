import React, {forwardRef, useEffect, useState} from 'react';
import {Button, VStack, Text, Radio} from 'native-base';
import {useNoteContext} from '../../../../../stores/Note';
import {useNfc} from '../../../../../Utils/hooks/useNfc';
import {generateRandomString} from '../../../../../Utils/generateRandomString';

const ContinueRotationSection = ({onSuccess}, textInputRef) => {
  const {rotateKey} = useNfc();

  return (
    <VStack>
      <Button
        mx={2}
        mt={5}
        variant="solid"
        size={'main'}
        onPress={() =>
          generateRandomString(20).then(random => rotateKey(random, onSuccess))
        }>
        Resume Key Rotation
      </Button>
    </VStack>
  );
};

export default forwardRef(ContinueRotationSection);
