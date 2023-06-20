// Configuration
import * as bitcoin from 'bitcoinjs-lib';

// Crypto Cash customer backend address
const UPDATE_CHECK_ADDRESS = 'https://update-check.b21.cash/notice';
const CUSTOMER_SERVER_ADDRESS = 'wss://backend.b21.cash/customer';

// Blockchain explorer address, used in order to independently verify wallet balances and transaction statuses
const ESPLORA_API = 'https://blockstream.info/api';
const ESPLORA_HISTORY_URL = 'https://blockstream.info/tx/';

// Which Bitcoin network to use, actual bitcoin or testnet
const BITCOIN_NETWORK = bitcoin.networks.bitcoin;

// Suggested network fee for personalization procedure
const PERSONALISATION_FEE_SATS = 500;

// Suggested network fee for the key rotation procedure
const ROTATION_FEE_SATS = 500;

// How long the offline verification signature is valid (days)
const DAYS_FOR_SIGNATURE_VERIFICATION = 30;

// Pinned Airtime Network's Root CA for secure communication with the customer backend
const AIRTIME_ROOT_AX6_PEM =
  '-----BEGIN CERTIFICATE-----\n' +
  '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\n' +
  '-----END CERTIFICATE-----\n';

export {
  UPDATE_CHECK_ADDRESS,
  CUSTOMER_SERVER_ADDRESS,
  ESPLORA_HISTORY_URL,
  ESPLORA_API,
  BITCOIN_NETWORK,
  ROTATION_FEE_SATS,
  PERSONALISATION_FEE_SATS,
  DAYS_FOR_SIGNATURE_VERIFICATION,
  AIRTIME_ROOT_AX6_PEM,
};
