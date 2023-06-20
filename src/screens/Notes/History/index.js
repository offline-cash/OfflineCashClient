import {Box, HStack, Text, VStack} from 'native-base';
import Transaction from './Transaction';
import React from 'react';
import {BadgeStatus} from '../../../theme/Components/BadgeStatus';
import {useNoteContext} from '../../../stores/Note';

const History = ({buttonGroupHeight}) => {
  const {
    note: {history, address},
  } = useNoteContext();
  const hasHistory = history && history.length > 0;

  const listOfTransactions = history?.map((transaction, index) => (
    <Transaction
      index={index}
      data={history}
      transactionDetail={transaction}
      key={transaction.txid + ';' + transaction.type + ';' + transaction.value}
    />
  ));

  const transactionsEmptyState = (
    <Text variant="history" pb={3} mt={-5} height="full">
      There are no transactions
    </Text>
  );

  return (
    <Box bgColor={'historyBg'} px={5} mb={buttonGroupHeight}>
      <VStack py={3}>
        <Text variant="nominal" mb={3}>
          History
        </Text>
        <HStack mb={5}>
          {hasHistory && (
            <BadgeStatus
              text={address}
              badgeVariant="status"
              textVariant="status"
              space="0"
            />
          )}
        </HStack>
        {hasHistory ? listOfTransactions : transactionsEmptyState}
      </VStack>
    </Box>
  );
};

export default History;
