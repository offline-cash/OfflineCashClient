import React, {forwardRef, useRef, useMemo, useState} from 'react';
import {VStack, Text, View} from 'native-base';
import BottomSheet from '../../../../components/BottomSheet';
import KeysIcon from '../../../../components/KeysIcon';
import SendMinerFeesSection from './components/SendMinerFeesSection';
import AddRandomnessSection from './components/AddRandomnessSection';
import ContinueRotationSection from './components/ContinueRotationSection';
import {noteStates} from '../../../../Utils/noteStates';
import {useNoteContext} from '../../../../stores/Note';
import Card from '../../../../components/Card';
import CardHeader from '../CardHeader';

const RotateKeysSheet = ({onAnimateBack, onClose, onError}, ref) => {
  const textInputRef = useRef(null);
  const {note} = useNoteContext();

  const step = useMemo(() => {
    if (note.rotationAborted) {
      return <ContinueRotationSection ref={textInputRef} onSuccess={onClose} />;
    } else if (
      note.state !== noteStates.pendingRotate &&
      !note.hasRotationFunds
    ) {
      return <SendMinerFeesSection />;
    }
    return <AddRandomnessSection ref={textInputRef} onSuccess={onClose} onError={onError} />;
  }, [note.state, note.hasRotationFunds, ref]);

  return (
    <BottomSheet
      ref={ref}
      headerIcon={<KeysIcon />}
      title="Rotate Keys"
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === -1) {
          textInputRef?.current?.blur();
          onAnimateBack();
        }
      }}>
      {!note.rotationAborted ? (
        <View>
          <Text variant={'bottomSheet'} mb={5} mx={2}>
            You can rotate the keys on this note if you wish to hold it until
            the expiration date.
          </Text>
          {note.btcBalance > note.nominalValue && (
            <Card>
              <CardHeader label={'Transaction fees'} />
              <Text variant={'bottomSheet'} mb={5} mx={2}>
                The entire excess value of{' '}
                {(note.btcBalance - note.nominalValue) * 0.00000001} BTC will be
                used as the transaction fee. If you want to avoid this, don't
                proceed with key rotation and perform a withdraw instead.
              </Text>
            </Card>
          )}
        </View>
      ) : (
        <Text variant={'bottomSheet'} mb={5} mx={2}>
          Oops! The key rotation process didn't fully complete last time. Please
          try again in order to complete it.
        </Text>
      )}
      <VStack w={'full'} space={'xs'}>
        {step}
      </VStack>
    </BottomSheet>
  );
};

export default forwardRef(RotateKeysSheet);
