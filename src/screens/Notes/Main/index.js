import React from 'react';
import {VStack} from 'native-base';
import NoteValueInfo from './NoteValueInfo';
import BadgeStatusBar from './BadgeStatusBar';
import ClaimBefore from './ClaimBefore';
import BitcoinAddress from './BitcoinAddress';
import SerialNumber from './SerialNumber';

const Main = () => {
  return (
    <VStack px={5} pt={'30px'}>
      <NoteValueInfo />
      <BadgeStatusBar />
      <ClaimBefore />
      <BitcoinAddress />
      <SerialNumber />
      {/* {Math.ceil(+new Date() / 1000) > nfcResult?.serverStruct.lockTime ? (
        <Text style={{color: 'red', fontWeight: 'bold'}}>
          EXPIRED BANK NOTE, DO NOT ACCEPT
        </Text>
      ) : (
        <Text style={{color: 'green', fontWeight: 'bold'}}>
          Bank note is still locked
        </Text>
      )} */}
    </VStack>
  );
};

export default Main;
