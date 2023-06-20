import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Center, Heading, Modal, Text} from 'native-base';
import AndroidScanIcon from '../AndroidScanIcon';
import {Animated, Easing} from 'react-native';

const text1 = 'Please tap the Bitcoin note and hold it';
const text2 = 'Scanning is in progress... hold on';

const AnimatedText = Animated.createAnimatedComponent(Text);

const ScanModalAndroid = ({isOpen, isRunning, closeModal}) => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const animate = () => {
    Animated.loop(
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  if (isRunning) {
    animate();
  }

  return (
    <Center>
      <Modal
        padding={2}
        size="full"
        isOpen={isOpen}
        onClose={() => closeModal()}>
        <Modal.Content mb={0} mt="auto" borderRadius={10} py={5} px={7}>
          <Modal.Body p={0} alignItems="center">
            <Heading variant="scan" mb={8}>
              Ready to Scan
            </Heading>
            <AndroidScanIcon />
            <Box my={8}>
              {!isRunning ? (
                <Text variant="scanModal">{text1}</Text>
              ) : (
                <AnimatedText style={{opacity: fadeIn}} variant="scanModal">
                  {text2}
                </AnimatedText>
              )}
            </Box>
            <Button variant="scanModal" onPress={() => closeModal()}>
              Cancel
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ScanModalAndroid;
