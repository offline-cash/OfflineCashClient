import React from 'react';
import NoteScreen from './index';
import {TEN_NOTE_HEADER_BG} from './utils/utils';

const TenOfflineBanknote = () => (
  <NoteScreen
    source={require('../../assets/1.png')}
    androidHeaderBg={TEN_NOTE_HEADER_BG}
  />
);

export default TenOfflineBanknote;
