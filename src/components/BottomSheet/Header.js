import React from 'react';
import {Heading, HStack, Pressable, VStack} from 'native-base';
import CloseIconX from '../CloseIconX';

const Header = ({headerIcon, title, onClose}) => {
  return (
    <HStack
      mb={1}
      bg={'secondary'}
      pt={2}
      px={4}
      justifyContent={'space-between'}
      alignItems={'flex-start'}
      w={'full'}>
      <VStack>
        {headerIcon}
        <Heading variant="bottomSheet" alignSelf="flex-start" my={-3}>
          {title}
        </Heading>
      </VStack>
      <Pressable onPress={onClose}>
        <CloseIconX />
      </Pressable>
    </HStack>
  );
};

export default Header;
