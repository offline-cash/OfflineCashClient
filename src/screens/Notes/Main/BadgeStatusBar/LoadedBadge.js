import React from 'react';
import {useNoteContext} from '../../../../stores/Note';
import {BadgeStatus} from '../../../../theme/Components/BadgeStatus';

const LoadedBadge = () => {
  const {
    note: {isLoaded},
  } = useNoteContext();

  return (
    <BadgeStatus
      iconName="chipIcon"
      text={isLoaded ? 'Loaded' : 'Unloaded'}
      badgeVariant={isLoaded ? 'statusLoaded' : 'status'}
      textVariant={isLoaded ? 'statusLoaded' : 'status'}
      iconColor={isLoaded ? '#FFF' : '#FE7766'}
    />
  );
};

export default LoadedBadge;
