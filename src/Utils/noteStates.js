export const noteStates = {
  provisioned: 'BL',
  personalized: 'PS',
  pendingPersonalize: 'PP',
  pendingRotate: 'PR',
  withdraw: 'WD',
  error: 'ERR', // this state is artificial (not from BE)
};

export const backendStateMap = {
  provisioned: noteStates.provisioned,
  personalized: noteStates.personalized,
  pending_personalize: noteStates.pendingPersonalize,
  pending_rotate: noteStates.pendingRotate,
  withdraw: noteStates.withdraw,
  error: noteStates.error
};
