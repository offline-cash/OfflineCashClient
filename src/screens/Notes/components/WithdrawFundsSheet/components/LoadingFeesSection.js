import React from 'react';
import {Center, Text, VStack} from 'native-base';
import LoadingIconComponent from '../../../../../components/LoadingIconComponent';
import {StyleSheet} from 'react-native';

const LoadingFeesSection = () => {
  return (
    <Center backgroundColor="addressBox" borderRadius="30px" margin={2}>
      <VStack alignItems="center">
        <LoadingIconComponent style={[styles.animation]} />
        <Text variant="loading" top={-80}>
          Waiting for fees to load
        </Text>
      </VStack>
    </Center>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: '100%',
  },
});

export default LoadingFeesSection;
