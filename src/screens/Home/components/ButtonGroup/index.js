import React from 'react';
import {Button, VStack} from 'native-base';
import {useNfc} from '../../../../Utils/hooks/useNfc';
import {nfcResultMock2} from './nfcResultMock';
import {useNoteContext} from '../../../../stores/Note';

const ButtonGroup = () => {
  const {updateResult} = useNoteContext();
  const {scanNote, scanNoteOffline} = useNfc();

  // overwrite this if you need to test without having notes to scan
  const iDontHaveNote = false;

  return (
    <VStack space={1}>
      <Button variant="solid" size={'main'} onPress={() => scanNote()}>
        Scan Note
      </Button>
      <Button
        variant="outline"
        size={'main'}
        onPress={() => {
          iDontHaveNote ? updateResult(nfcResultMock2) : scanNoteOffline();
        }}>
        Offline Scan
      </Button>
    </VStack>
  );
};

export default ButtonGroup;
