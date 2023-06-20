import React from 'react';
import NoteScreen from './index';
import {FIVE_NOTE_HEADER_BG} from './utils/utils';

const FiveOfflineBanknote = () => (
  <NoteScreen
    source={require('../../assets/5.png')}
    androidHeaderBg={FIVE_NOTE_HEADER_BG}
  />
);

export default FiveOfflineBanknote;
