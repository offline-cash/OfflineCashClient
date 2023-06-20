import React from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import CopyCircleIconBlue from '../../../../components/CopyCircleIconBlue';
import {copyToClipboard} from '../../../../Utils/Util';

const AddressBox = ({address}) => (
  <Box mb={3} backgroundColor="addressBox" width="100%" borderRadius="10px">
    <HStack justifyContent="space-between" padding={5}>
      <Text variant="addressCopy" maxWidth="200px">
        {address}
      </Text>
      <Pressable
        onPress={() => copyToClipboard(address, 'Address copied')}
        alignSelf="center">
        <CopyCircleIconBlue />
      </Pressable>
    </HStack>
  </Box>
);

export default AddressBox;
