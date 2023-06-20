export const getActiveBalance = (nfcResult, btcBalances) => {
  if (
    nfcResult?.clientStruct?.clientPrivKeySlot1Version >=
    nfcResult?.clientStruct?.clientPrivKeySlot2Version
  ) {
    return btcBalances[0];
  }
  return btcBalances[1];
};

export const checkIsLoaded = (nfcResult, btcBalances) => {
  const activeBalance = getActiveBalance(nfcResult, btcBalances);
  return nfcResult?.serverStruct?.nominalValue <= activeBalance;
};

export const ONE_NOTE_HEADER_BG = '#f6ca9c';
export const TWO_NOTE_HEADER_BG = '#94b39a';
export const FIVE_NOTE_HEADER_BG = '#c99789';
export const TEN_NOTE_HEADER_BG = '#accbe1';
