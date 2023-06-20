import React from 'react';
import NoteScreen from './index';
import {ONE_NOTE_HEADER_BG} from './utils/utils';

const OneOfflineBanknote = () => (
  <NoteScreen
    source={require('../../assets/1.png')}
    androidHeaderBg={ONE_NOTE_HEADER_BG}
  />
);

export default OneOfflineBanknote;
