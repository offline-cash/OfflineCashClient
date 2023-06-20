import React from 'react';
import {useNoteContext} from '../../../../stores/Note';
import {BadgeStatus} from '../../../../theme/Components/BadgeStatus';
import {DAYS_FOR_SIGNATURE_VERIFICATION} from '../../../../../Config';

const VerificationBadge = () => {
  const {
    note: {isVerificationValid},
    isVerified,
  } = useNoteContext();

  if (!isVerificationValid) {
    return (
      <BadgeStatus
        iconName="signatureIcon"
        text="Failed to verify"
        badgeVariant="status"
        textVariant="status"
        iconColor="#FE7766"
      />
    );
  }
  if (!isVerified()) {
    return (
      <BadgeStatus
        iconName="signatureIcon"
        text={`Verified > ${DAYS_FOR_SIGNATURE_VERIFICATION} days`}
        badgeVariant="status"
        textVariant="status"
        iconColor="#EBC604"
      />
    );
  }

  return (
    <BadgeStatus
      iconName="signatureIcon"
      text={`Verified < ${DAYS_FOR_SIGNATURE_VERIFICATION} days`}
      badgeVariant="status"
      textVariant="status"
      iconColor="#00CC59"
    />
  );
};

export default VerificationBadge;
