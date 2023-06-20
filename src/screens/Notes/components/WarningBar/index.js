import React, {useMemo} from 'react';
import {Button, Heading, HStack, Text, VStack} from 'native-base';
import {useNoteContext} from '../../../../stores/Note';
import {noteStates} from '../../../../Utils/noteStates';
import {ESPLORA_HISTORY_URL} from '../../../../../Config';
import {Linking} from 'react-native';

const WarningBar = ({handlePress}) => {
  const {note} = useNoteContext();
  const mayTakeLongTimeMessage =
    'Waiting for network\nto confirm Bitcoin transaction';
  const pleaseLoadMessage = 'Please send Bitcoin\nto the address below to load';
  const unconfirmedTxs = note.history
    ? note.history.filter(x => !x.confirmed)
    : [];

  const warningContent = useMemo(() => {
    if (note.rotationAborted) {
      return {
        bg: 'negative',
        buttonText: 'Fix issue',
        header: 'Failed rotation',
        message: 'Do not accept note in commerce',
      };
    }

    if (note.isExpired) {
      if (note.isPartiallyLoaded) {
        return {
          bg: 'negative',
          buttonText: null,
          header: 'Note Expired (Loaded)',
          message:
            'Funds past expiration date,\nplease withdraw as soon as possible',
        };
      } else {
        return {
          bg: 'negative',
          buttonText: null,
          header: 'Note Expired (Withdrawn)',
          message: 'Funds withdrawn and past expiration date',
        };
      }
    }

    if (note.state === noteStates.pendingPersonalize) {
      if (unconfirmedTxs.length > 0) {
        return {
          bg: 'warning',
          buttonText: 'View TX',
          header: 'Load in Progress',
          message: mayTakeLongTimeMessage,
        };
      } else {
        return {
          bg: 'warning',
          buttonText: 'Details',
          header: 'Bitcoin Required',
          message: pleaseLoadMessage,
        };
      }
    }

    if (note.state === noteStates.pendingRotate) {
      return {
        bg: 'warning',
        buttonText: unconfirmedTxs.length > 0 ? 'View TX' : 'Details',
        header: 'Pending Rotation',
        message: mayTakeLongTimeMessage,
      };
    }

    if (
      note.isScannedOffline &&
      (note.state === noteStates.pendingPersonalize ||
        note.state === noteStates.pendingRotate)
    ) {
      return {
        bg: 'warning',
        buttonText: unconfirmedTxs.length > 0 ? 'View TX' : 'Details',
        header: 'Pending Rotation',
        message: mayTakeLongTimeMessage,
      };
    }

    return {
      bg: 'negative',
      buttonText: 'Load Note',
      header: 'Unloaded',
      message: 'Do not accept note in commerce',
    };
  }, [note.state, note.rotationAborted]);

  if (
    !note.isExpired &&
    note.isLoaded &&
    note.state === noteStates.personalized &&
    !note.rotationAborted
  ) {
    // everything is okay, don't display any warning
    return null;
  }

  let noteActionButton = (
    <Button variant="status" size="status" onPress={handlePress}>
      <Text variant="statusBtn">{warningContent.buttonText}</Text>
    </Button>
  );

  if (!warningContent.buttonText) {
    noteActionButton = <Text />;
  } else if (
    unconfirmedTxs.length > 0 &&
    (note.state === noteStates.pendingPersonalize ||
      note.state === noteStates.pendingRotate)
  ) {
    const lastUnconfirmedTxid = unconfirmedTxs[unconfirmedTxs.length - 1].txid;
    noteActionButton = (
      <Button
        variant="status"
        size="status"
        onPress={() =>
          Linking.openURL(ESPLORA_HISTORY_URL + lastUnconfirmedTxid)
        }>
        <Text variant="statusBtn">{warningContent.buttonText}</Text>
      </Button>
    );
  } else if (note.state === noteStates.withdraw || note.isScannedOffline) {
    noteActionButton = <Text />;
  }

  return (
    <HStack bg={warningContent.bg} justifyContent={'space-around'} py={5}>
      <VStack>
        <Heading variant="status">{warningContent.header}</Heading>
        <Text variant="dataSubject">{warningContent.message}</Text>
      </VStack>
      {noteActionButton}
    </HStack>
  );
};

export default WarningBar;
