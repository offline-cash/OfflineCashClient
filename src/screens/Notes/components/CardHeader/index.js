import React from 'react';
import {Circle, Heading, HStack} from 'native-base';

const CardHeader = ({label, number}) => (
  <HStack alignItems={'center'} space={'sm'}>
    {number && (
      <Circle borderWidth={2} borderColor={'#F5F4F6'} w={10} h={10}>
        <Heading variant="card">{number}</Heading>
      </Circle>
    )}
    <Heading variant="card">{label}</Heading>
  </HStack>
);

export default CardHeader;
