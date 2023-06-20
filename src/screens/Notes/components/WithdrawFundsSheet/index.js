import React, {forwardRef, useRef, useState} from 'react';
import {VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../../../components/BottomSheet';
import LoadIcon from '../../../../components/LoadIcon';
import WithdrawSection from './components/WithdrawSection';
import NotCutSection from './components/NotCutSection';
import {useNoteContext} from '../../../../stores/Note';

const WithdrawFundsSheet = ({onClose, onAnimateBack}, ref) => {
  const {note, isVerified} = useNoteContext();
  const {navigate} = useNavigation();
  const isAvailable = !note.isSealed || isVerified();

  const textInputRef = useRef(null);
  const [hasUserScanned, setHasUserScanned] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [estimatedFees, setEstimatedFees] = useState(null);
  const [txFeeType, setTxFeeType] = useState(null);

  const resetWithdrawFlow = () => {
    setWithdrawAddress('');
    setEstimatedFees(null);
    setTxFeeType(null);
    setHasUserScanned(false);
  };

  return (
    <BottomSheet
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === 0) {
          let feeMethod = note.dualSigFee;

          if (note.isScannedOffline) {
            feeMethod = note.singleSigFee;
          }

          feeMethod()
            .then(res => {
              setEstimatedFees(res);
              setTxFeeType('economic');
            })
            .catch(() => {
              Alert.alert(
                'Offline Cash',
                'Failed to load fees. Please try again in a moment.',
              );
            });
        } else if (toIndex === -1) {
          textInputRef?.current?.blur();
          resetWithdrawFlow();
          onAnimateBack();
        }
      }}
      ref={ref}
      headerIcon={<LoadIcon isArrowDown={false} />}
      title="Withdraw Funds">
      <VStack w={'full'} space={'xs'}>
        {hasUserScanned && note.isSealed ? (
          <NotCutSection onRetry={() => setHasUserScanned(false)} />
        ) : (
          <WithdrawSection
            onScan={() => setHasUserScanned(true)}
            onSuccess={onClose}
            withdrawAddress={withdrawAddress}
            setWithdrawAddress={setWithdrawAddress}
            estimatedFees={estimatedFees}
            txFeeType={txFeeType}
            setTxFeeType={setTxFeeType}
            isWithdrawPending={
              /* fixed for now - we dont have pending withdraw state */
              false
            }
            isAvailable={isAvailable}
            ref={textInputRef}
          />
        )}
      </VStack>
    </BottomSheet>
  );
};

export default forwardRef(WithdrawFundsSheet);
