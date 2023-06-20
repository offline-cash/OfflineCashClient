import {Box, Divider, HStack, Link, Text} from 'native-base';
import React from 'react';
import {format} from 'date-fns';
import {ESPLORA_HISTORY_URL} from '../../../../../Config';
import ArrowUpRightIcon from '../../../../components/ArrowUpRightIcon';

const Transaction = ({transactionDetail, index, data}) => {
  // TODO: transactions could be transformed in transformNfcResult.js
  const transactionTimestamp = transactionDetail?.time
    ? format(new Date(transactionDetail?.time * 1000), 'PPppp')
    : 'pending';

  return (
    <Box>
      <HStack>
        <Link href={ESPLORA_HISTORY_URL + transactionDetail.txid} flex={1}>
          <Text variant="history" flex={1} mr={3}>
            {transactionTimestamp}
          </Text>
          <Text variant="history" flex={1.3} mr={3}>
            {transactionDetail.txid}
          </Text>
          <Text
            flex={1}
            textAlign={'right'}
            variant="history"
            mr={3}
            color={transactionDetail.value >= 0 ? 'positive' : 'negative'}>
            {transactionDetail.value / 10e7} BTC
          </Text>
          <ArrowUpRightIcon />
        </Link>
      </HStack>
      {index < data.length - 1 && <Divider my={3} bg={'divider'} />}
    </Box>
  );
};

export default Transaction;
