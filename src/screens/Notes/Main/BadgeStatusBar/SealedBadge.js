import React from 'react';
import {useNoteContext} from '../../../../stores/Note';
import {BadgeStatus} from '../../../../theme/Components/BadgeStatus';

const SealedBadge = () => {
  const {
    note: {isSealed},
  } = useNoteContext();

  return (
    <BadgeStatus
      iconName="chipIcon"
      text={isSealed ? 'Sealed' : 'Unsealed'}
      badgeVariant="status"
      textVariant="status"
      iconColor={isSealed ? '#00CC59' : '#FE7766'}
    />
  );
};

export default SealedBadge;
