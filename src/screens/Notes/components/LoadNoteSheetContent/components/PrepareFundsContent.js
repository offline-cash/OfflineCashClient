import React from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import {PERSONALISATION_FEE_SATS} from '../../../../../../Config';

const PrepareFundsContent = ({noteValue}) => (
  <VStack space={'xs'}>
    <Text variant="bottomSheet">Make sure that you have at least</Text>
    <HStack alignItems={'center'} space={'sm'}>
      <Box rounded={'xl'} bg="fundsBg" px={2}>
        <Text variant="bottomSheet" color={'primary'} lineHeight="sm">
          {noteValue / 10e4} mBTC
        </Text>
      </Box>
      <Text variant="bottomSheet" color="black">
        +
      </Text>
      <Box rounded={'xl'} bg="fundsBg" px={2}>
        <Text variant="bottomSheet" color={'primary'} lineHeight="sm">
          {PERSONALISATION_FEE_SATS / 10e4} mBTC
        </Text>
      </Box>
    </HStack>
    <Text variant="bottomSheet">available in Bitcoin to load this note</Text>
  </VStack>
);

export default PrepareFundsContent;
