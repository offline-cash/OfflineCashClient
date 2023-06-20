import React from 'react';
import {VStack, Box} from 'native-base';
import Card from '../../../../components/Card';
import CardHeader from '../CardHeader';
import CardSeparatorComponent from '../CardSeparatorComponent';
import SendFundsContent from './components/SendFundsContent';

const SendFundsSheetContent = () => {
  return (
    <Box>
      <VStack w={'full'} space={'xs'}>
        <Card>
          <CardHeader label={'Send Funds'} />
          <CardSeparatorComponent />
          <SendFundsContent />
        </Card>
      </VStack>
    </Box>
  );
};

export default SendFundsSheetContent;
