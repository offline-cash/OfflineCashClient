import React from 'react';
import {Box, Button, VStack} from 'native-base';
import {useNoteContext} from '../../../../stores/Note';
import { noteStates } from "../../../../Utils/noteStates";

const ButtonGroup = ({
  setButtonGroupHeight,
  openRotateKeysSheet,
  openWithdrawFundsSheet,
}) => {
  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    const heightCalc = height - 50;
    setButtonGroupHeight(heightCalc);
  };
  const {
    note: {state, isScannedOffline, isExpired, isLoaded, isPartiallyLoaded},
  } = useNoteContext();

  return (
    <Box
      position="absolute"
      bottom={5}
      left={0}
      width="100%"
      onLayout={onLayout}>
      <VStack space={1} px={5}>
        {state !== noteStates.pendingRotate && (
          <Button variant="solid" size="main" onPress={openWithdrawFundsSheet}>
            {isScannedOffline || isExpired ? 'Withdraw (offline)' : 'Withdraw'}
          </Button>
        )}
        {((state !== noteStates.withdraw && !isScannedOffline && !isExpired) || true) && (
          <Button variant="outline" size="main" onPress={openRotateKeysSheet}>
            Rotate Key
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default ButtonGroup;
