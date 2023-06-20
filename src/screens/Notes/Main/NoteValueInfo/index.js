import {Box, Text} from 'native-base';
import React from 'react';
import {useNoteContext} from '../../../../stores/Note';
import ValuesBar from '../../components/ValuesBar';

const NoteValueInfo = () => {
  const {note} = useNoteContext();

  return (
    <Box>
      <Text variant="nominal" mb={1}>
        {note.nominalValue / 10e4} mBTC
      </Text>
      <ValuesBar />
    </Box>
  );
};

export default NoteValueInfo;
