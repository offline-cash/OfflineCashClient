import {HStack, ScrollView} from 'native-base';
import React from 'react';
import NoteStateBadge from './NoteStateBadge';
import SealedBadge from './SealedBadge';
import LoadedBadge from './LoadedBadge';
import VerificationBadge from './VerificationBadge';
import {useNoteContext} from '../../../../stores/Note';
import {noteStates} from '../../../../Utils/noteStates';

const BadgeStatusBar = () => {
  const {
    note: {state},
  } = useNoteContext();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      mb={'30px'}>
      <HStack space={2}>
        {state !== noteStates.pendingRotate &&
          state !== noteStates.withdraw && <LoadedBadge />}
        <NoteStateBadge />
        <VerificationBadge />
        <SealedBadge />
      </HStack>
    </ScrollView>
  );
};

export default BadgeStatusBar;
