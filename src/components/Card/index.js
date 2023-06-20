import React from 'react';
import {VStack} from 'native-base';

const Card = ({children}) => (
  <VStack
    shadow={1}
    width={'auto'}
    bg={'white'}
    borderRadius={'30px'}
    py={4}
    px={5}
    space={'sm'}
    margin={2}>
    {children}
  </VStack>
);

export default Card;
