import {Center, Text} from 'native-base';
import React from 'react';

const ToastCopy = ({text, isError}) => {
  return (
    <Center
      bg={isError ? 'error.500' : 'statusLoadedBg'}
      px={isError ? 10 : 3}
      py={isError ? 5 : 1}
      rounded={'md'}
      mb={5}>
      <Text variant="toast">{text}</Text>
    </Center>
  );
};

export default ToastCopy;
