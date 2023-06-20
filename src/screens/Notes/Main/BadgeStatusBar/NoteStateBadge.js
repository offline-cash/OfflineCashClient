import React, {useMemo} from 'react';
import {useNoteContext} from '../../../../stores/Note';
import {BadgeStatus} from '../../../../theme/Components/BadgeStatus';
import {noteStates} from '../../../../Utils/noteStates';

const NoteStateBadge = () => {
  const {note} = useNoteContext();
  const warningContent = useMemo(
    () =>
      ({
        [noteStates.provisioned]: {
          result: 'Provisioned',
          iconColor: '#00CC59',
        },
        [noteStates.personalized]: {
          result: 'Personalized',
          iconColor: '#00CC59',
        },
        [noteStates.pendingPersonalize]: {
          result: 'Pending personalization',
          iconColor: '#EBC604',
        },
        [noteStates.pendingRotate]: {
          result: 'Pending key rotation',
          iconColor: '#EBC604',
        },
        [noteStates.withdraw]: {
          result: 'Withdrawn',
          iconColor: '#FE7766',
        },
      }[note.state]),
    [note.state],
  );

  if (!warningContent) {
    return null;
  }

  return (
    <BadgeStatus
      iconName="cashIcon"
      text={warningContent.result}
      badgeVariant="status"
      textVariant="status"
      iconColor={warningContent.iconColor}
    />
  );
};

export default NoteStateBadge;
