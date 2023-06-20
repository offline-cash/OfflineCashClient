import {Button, TextField, VStack, Radio, Text} from 'native-base';
import React, {forwardRef} from 'react';
import Card from '../../../../../components/Card';
import LoadingIcon from '../../../../../components/LoadingIcon';
import CardHeader from '../../CardHeader';
import ValuesBar from '../../ValuesBar';
import {useNoteContext} from '../../../../../stores/Note';
import {useNfc} from '../../../../../Utils/hooks/useNfc';
import LoadingFeesSection from './LoadingFeesSection';

const WithdrawSection = (
  {
    isWithdrawPending,
    withdrawAddress,
    setWithdrawAddress,
    estimatedFees,
    txFeeType,
    setTxFeeType,
    onScan,
    isAvailable,
    onSuccess,
  },
  textInputRef,
) => {
  const {note} = useNoteContext();
  const {withdrawNote, withdrawOffline} = useNfc();

  const handleButtonPress = () => {
    if (note.isScannedOffline || note.isExpired) {
      withdrawOffline(withdrawAddress, txFeeType, onSuccess, () => onScan?.());
    } else {
      withdrawNote(withdrawAddress, txFeeType, onSuccess, () => onScan?.());
    }
  };

  let rapidFee = null;
  let fastFee = null;
  let economicFee = null;

  if (estimatedFees) {
    rapidFee =
      Math.ceil(estimatedFees.txVirtualSize * estimatedFees.feesPerVb.rapid) /
      100000000;
    fastFee =
      Math.ceil(estimatedFees.txVirtualSize * estimatedFees.feesPerVb.fast) /
      100000000;
    economicFee =
      Math.ceil(
        estimatedFees.txVirtualSize * estimatedFees.feesPerVb.economic,
      ) / 100000000;
  }

  return (
    <VStack space={2}>
      <ValuesBar isWithdrawVariant isAvailable={isAvailable} />
      <Card>
        <CardHeader label="Send to" />
        <TextField
          ref={textInputRef}
          variant="primary"
          placeholder="Enter BTC address"
          value={withdrawAddress}
          onChangeText={text => setWithdrawAddress(text)}
        />
      </Card>
      {estimatedFees ? (
        <Card>
          <CardHeader label="Delivery time" />
          <Text>
            Please note that both delivery times and fees are approximate.
          </Text>
          <Radio.Group
            name="feeLevel"
            accessibilityLabel="Transaction delivery time and cost"
            value={txFeeType}
            onChange={nextValue => {
              setTxFeeType(nextValue);
            }}>
            <Radio value="rapid" my={1}>
              Rapid (10 minutes): {rapidFee} BTC
            </Radio>
            <Radio value="fast" my={1}>
              Fast (1 hour): {fastFee} BTC
            </Radio>
            <Radio value="economic" my={1}>
              Economic (24 hours): {economicFee} BTC
            </Radio>
          </Radio.Group>
        </Card>
      ) : (
        <LoadingFeesSection />
      )}
      {!isWithdrawPending ? (
        <Button
          mt={3}
          mx={2}
          variant="solid"
          size="main"
          isDisabled={!estimatedFees}
          onPress={handleButtonPress}>
          Withdraw
        </Button>
      ) : (
        <Button mt={3} mx={2} variant="load" size="main">
          <LoadingIcon />
        </Button>
      )}
    </VStack>
  );
};

export default forwardRef(WithdrawSection);
