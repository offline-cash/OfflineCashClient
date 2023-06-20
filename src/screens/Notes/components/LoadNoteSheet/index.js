import React, {forwardRef, useMemo, useRef} from 'react';
import {noteStates} from '../../../../Utils/noteStates';
import SendFundsSheetContent from '../LoadNoteSheetSendFundsContent';
import LoadNoteSheetContent from '../LoadNoteSheetContent';
import {useNoteContext} from '../../../../stores/Note';
import BottomSheet from '../../../../components/BottomSheet';
import LoadIcon from '../../../../components/LoadIcon';

const LoadNoteSheet = ({onClose, onAnimateBack}, ref) => {
  const textInputRef = useRef();

  const {
    note: {state, isLoaded},
  } = useNoteContext();
  const BottomSheetContent = useMemo(() => {
    if (
      state === noteStates.pendingPersonalize ||
      state === noteStates.personalized
    ) {
      return <SendFundsSheetContent />;
    }
    if (!isLoaded) {
      return <LoadNoteSheetContent ref={textInputRef} onSuccess={onClose} />;
    }
  }, [state, isLoaded, onClose]);
  return (
    <BottomSheet
      ref={ref}
      headerIcon={<LoadIcon isArrowDown />}
      title="Load Note"
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === -1) {
          textInputRef?.current?.blur();
          onAnimateBack();
        }
      }}>
      {BottomSheetContent}
    </BottomSheet>
  );
};

export default forwardRef(LoadNoteSheet);
