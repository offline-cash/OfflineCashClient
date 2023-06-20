import React from 'react';
import NoteScreen from './index';
import {TWO_NOTE_HEADER_BG} from './utils/utils';

const TwoOfflineBanknote = () => (
  <NoteScreen
    source={require('../../assets/2.png')}
    androidHeaderBg={TWO_NOTE_HEADER_BG}
  />
);

export default TwoOfflineBanknote;
