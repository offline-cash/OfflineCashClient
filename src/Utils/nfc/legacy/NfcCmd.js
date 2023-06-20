import {bytesToHex, hexToBytes} from '../../Util';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import {sha256} from 'js-sha256';
import {ec as EC} from 'elliptic';
import {Buffer} from 'buffer';
import {ESPLORA_API} from '../../../../Config';
import axios from 'axios';

const nfcCmd = {
  SELECT_APP: 'SELECT_APP',
  READ_DATA: 'READ_DATA',
  WRITE_DATA: 'WRITE_DATA',
};

function validateServerCommand(cmdApdu, serverStateStructOffset) {
  // [CLA] [INS] [P1] [P2] [Lc] [...] [Le]

  function validate_file_settings(cmdApdu) {
    // only file #03 can be targetted
    return cmdApdu[5] === 0x03;
  }

  function validate_read_data(cmdApdu) {
    // only file #02 can be read by the server
    return cmdApdu[5] === 0x02;
  }

  function validate_write_data(cmdApdu) {
    // only file #02 might be written by the server
    // and not below state structure offset

    if (cmdApdu[5] !== 0x02) {
      // target file != 0x02
      return false;
    }

    if (cmdApdu[6] < serverStateStructOffset) {
      // writing below server state structure
      return false;
    }

    if (cmdApdu[7] !== 0 || cmdApdu[8] !== 0) {
      // offset > 255
      return false;
    }

    return true;
  }

  const CMD_WHITELIST = [
    {cla: 0x00, ins: 0xa4, extra: null}, // ISOSelectFile
    {cla: 0x90, ins: 0xaf, extra: null}, // Command chaining
    {cla: 0x90, ins: 0x71, extra: null}, // AuthenticateLRPFirst
    {cla: 0x90, ins: 0x77, extra: null}, // AuthenticateLRPNonFirst
    {cla: 0x90, ins: 0x51, extra: null}, // GetCardUID
    {cla: 0x90, ins: 0xf5, extra: null}, // GetFileSettings
    {cla: 0x90, ins: 0x64, extra: null}, // GetKeyVersion
    {cla: 0x90, ins: 0x60, extra: null}, // GetVersion
    {cla: 0x90, ins: 0xad, extra: validate_read_data}, // ReadData
    {cla: 0x90, ins: 0x8d, extra: validate_write_data}, // WriteData
    {cla: 0x90, ins: 0xf7, extra: null}, // GetTTStatus
  ];

  return CMD_WHITELIST.some(function (cmd) {
    if (cmd.cla !== cmdApdu[0] || cmd.ins !== cmdApdu[1]) {
      return false;
    }

    return !cmd.extra || cmd.extra(cmdApdu);
  });
}

function validateFileNo(fileNo) {
  if (typeof fileNo !== 'number') {
    throw Error('Expected file number to be number.');
  }

  if (fileNo !== 0x01 && fileNo !== 0x02 && fileNo !== 0x03) {
    throw Error('Invalid file number.');
  }

  return fileNo;
}

function validateByte(byteVal) {
  if (typeof byteVal !== 'number') {
    throw Error('Invalid byte value, expected number.');
  }

  if (byteVal < 0 || byteVal > 255) {
    throw Error('Numeric value of the byte is out of range.');
  }

  return byteVal;
}

function makeApduCmd(cmdType, options) {
  if (cmdType === nfcCmd.SELECT_APP) {
    return [
      0x00, 0xa4, 0x04, 0x00, 0x07, 0xd2, 0x76, 0x00, 0x00, 0x85, 0x01, 0x01,
      0x00,
    ];
  } else if (cmdType === nfcCmd.READ_DATA) {
    const file_no = validateFileNo(options.file_no);
    const read_offset = validateByte(options.read_offset);
    const read_length = validateByte(options.read_length);

    return [
      0x90,
      0xad,
      0x00,
      0x00,
      0x07,
      file_no,
      read_offset,
      0x00,
      0x00,
      read_length,
      0x00,
      0x00,
      0x00,
    ];
  } else if (cmdType === nfcCmd.WRITE_DATA) {
    const file_no = validateFileNo(options.file_no);
    const data = options.data;

    if (!Array.isArray(data)) {
      throw Error('Expected write data to be array.');
    }

    const write_offset = validateByte(options.write_offset);
    const write_length = validateByte(data.length);

    return [
      0x90,
      0x8d,
      0x00,
      0x00,
      0x07 + write_length,
      file_no,
      write_offset,
      0x00,
      0x00,
      write_length,
      0x00,
      0x00,
      ...data,
      0x00,
    ];
  } else {
    throw Error('Invalid command type.');
  }
}

function unwrapResponse(data) {
  let respCode = data.splice(-2, 2);

  if (respCode[0] == 0x90 && respCode[1] == 0x00) {
    return data;
  }

  if (respCode[0] == 0x91 && respCode[1] == 0x00) {
    return data;
  }

  throw Error('Command failed with code: ' + bytesToHex(respCode));
}

function parseFile2(data) {
  let result = {};
  const fullLength = data.length;

  // the first two bytes will be length of NDEF
  let ndefLen = data.splice(0, 2);

  if (ndefLen[0] !== 0) {
    throw Error('Unexpected NDEF length, expected length < 256');
  }

  result.ndefRecords = Ndef.decodeMessage(data.splice(0, ndefLen[1]));

  // read header of persistent server structure
  let psHeader = data.splice(0, 2);

  if (bytesToHex(psHeader).toUpperCase() !== 'C0FE') {
    throw Error('Expected header of persistent server structure.');
  }

  let psVersion = data.splice(0, 1);

  if (psVersion[0] !== 0x01) {
    throw Error('Unknown version of persistent server structure.');
  }

  result.tagHash = data.splice(0, 8);
  result.nominalValueBin = data.splice(0, 4);
  result.nominalValue = Buffer.from(result.nominalValueBin).readInt32LE(0);
  result.lockTimeBin = data.splice(0, 4);
  result.lockTime = Buffer.from(result.lockTimeBin).readInt32LE(0);
  result.curveType = data.splice(0, 1)[0];
  result.encServerIV = data.splice(0, 16);
  result.encServerPrivKey = data.splice(0, 32);
  result.serverPubKey = data.splice(0, 64);

  // hash all fields of server's persistent structure
  result.serverPsHash = sha256(
    psHeader +
      psVersion +
      result.tagHash +
      result.nominalValueBin +
      result.lockTimeBin +
      [result.curveType] +
      result.encServerIV +
      result.encServerPrivKey +
      result.serverPubKey,
  );

  result.state_offset = fullLength - data.length;

  let stHeader = data.splice(0, 2);

  if (bytesToHex(stHeader).toUpperCase() !== 'BEEF') {
    throw Error('Expected header of server state structure.');
  }

  let stVersion = data.splice(0, 1);

  if (stVersion[0] !== 0x01) {
    throw Error('Unknown version of server state structure.');
  }

  result.state_bin = data.splice(0, 2);
  result.state = String.fromCharCode(...result.state_bin);
  result.client_key_ver_bin = data.splice(0, 4);
  result.client_key_ver = Buffer.from(result.client_key_ver_bin).readInt32LE(0);
  result.nonce = data.splice(0, 8);
  result.block_height_bin = data.splice(0, 4);
  result.block_height = Buffer.from(result.block_height_bin).readInt32LE(0);
  result.signature_r = data.splice(0, 32);
  result.signature_s = data.splice(0, 32);
  result.sig_verified = false;
  result.sig_verification = null;
  return result;
}

async function verifyStateSignature(result) {
  let block;

  try {
    let resH = await axios.get(
      ESPLORA_API + '/block-height/' + result.block_height,
    );
    let blockHash = resH.data;
    let resB = await axios.get(ESPLORA_API + '/block/' + blockHash);
    block = resB.data;
  } catch (e) {
    console.error(e);
    return {valid: false, hash: null, timestamp: null};
  }

  let ec = new EC('secp256k1');
  let vk = ec.keyFromPublic(
    '04882541f6c8666a0035a66449049be4601b76b3bf1cf341f814b5e75c592795352d65f2a5049794f75136ace7715896a06c936177d79417e687f7bc6f0718c5bf',
    'hex',
  );

  let v_res = vk.verify(
    sha256([
      ...result.state_bin,
      ...result.client_key_ver_bin,
      ...result.nonce,
      ...result.block_height_bin,
      ...hexToBytes(block.id),
    ]),
    {
      r: result.signature_r,
      s: result.signature_s,
    },
  );

  return {
    valid: v_res,
    number: result.block_height,
    hash: block.id,
    timestamp: block.timestamp,
  };
}

async function readFile2() {
  unwrapResponse(
    await NfcManager.isoDepHandler.transceive(makeApduCmd(nfcCmd.SELECT_APP)),
  );

  let dataPart1 = unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.READ_DATA, {
        file_no: 0x02,
        read_offset: 0x00,
        read_length: 0x40,
      }),
    ),
  );

  let dataPart2 = unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.READ_DATA, {
        file_no: 0x02,
        read_offset: 0x40,
        read_length: 0x40,
      }),
    ),
  );

  let dataPart3 = unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.READ_DATA, {
        file_no: 0x02,
        read_offset: 0x80,
        read_length: 0x40,
      }),
    ),
  );

  let dataPart4 = unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.READ_DATA, {
        file_no: 0x02,
        read_offset: 0xc0,
        read_length: 0x40,
      }),
    ),
  );

  let data = [...dataPart1, ...dataPart2, ...dataPart3, ...dataPart4];
  console.log('parse');
  let result = parseFile2(data);
  // console.log('state check');
  // result.sig_verification = await verifyStateSignature(result);
  return result;
}

// header of our structure: magic number and structure's layout version
const CLIENT_STRUCT_VER = 0x01;
const CLIENT_STRUCT_MAGIC = [0x21, 0x37, CLIENT_STRUCT_VER];
// defined by NTAG 424 DNA datasheet, size of File #03
const FILE_03_SIZE = 128;
// our internal identifier to mark the type of curve
const EC_TYPE_SECP256K1 = 0x25;

function makeClientStruct(serverDataHash, clientPrivateKey) {
  if (serverDataHash.length !== 32) {
    throw Error('Expected serverDataHash to be 32 bytes.');
  }

  let slot1Version = Buffer.alloc(4);
  slot1Version.writeInt32LE(1, 0);

  let slot2Version = Buffer.alloc(4);
  slot2Version.writeInt32LE(0, 0);

  let out = [
    ...CLIENT_STRUCT_MAGIC,
    ...serverDataHash,
    EC_TYPE_SECP256K1,
    ...slot1Version,
    ...clientPrivateKey,
    ...slot2Version,
    ...Array(32).fill(0),
  ];

  if (out.length > FILE_03_SIZE) {
    throw Error('Packed structure is too large for File #03');
  }

  return out;
}

function unpackClientStruct(data) {
  const fullLength = data.length;
  let header = data.splice(0, 3);

  if (
    header[0] !== CLIENT_STRUCT_MAGIC[0] ||
    header[1] !== CLIENT_STRUCT_MAGIC[1] ||
    header[2] !== CLIENT_STRUCT_MAGIC[2]
  ) {
    throw Error('Invalid struct header');
  }

  let serverDataHash = data.splice(0, 32);
  let curveType = data.splice(0, 1);

  if (curveType[0] !== EC_TYPE_SECP256K1) {
    throw Error('Invalid curve type');
  }

  let clientPrivKeySlot1Offset = fullLength - data.length;
  let clientPrivKeySlot1Version = Buffer.from(data.splice(0, 4)).readInt32LE(0);
  let clientPrivKeySlot1 = data.splice(0, 32);

  let clientPrivKeySlot2Offset = fullLength - data.length;
  let clientPrivKeySlot2Version = Buffer.from(data.splice(0, 4)).readInt32LE(0);
  let clientPrivKeySlot2 = data.splice(0, 32);

  return {
    curveType: EC_TYPE_SECP256K1,
    serverDataHash: serverDataHash,
    clientPrivKeySlot1: clientPrivKeySlot1,
    clientPrivKeySlot1Version: clientPrivKeySlot1Version,
    clientPrivKeySlot1Offset: clientPrivKeySlot1Offset,
    clientPrivKeySlot2: clientPrivKeySlot2,
    clientPrivKeySlot2Version: clientPrivKeySlot2Version,
    clientPrivKeySlot2Offset: clientPrivKeySlot2Offset,
  };
}

async function readFile3(options) {
  if (!options) {
    options = {};
  }

  if (!options.dont_select) {
    unwrapResponse(
      await NfcManager.isoDepHandler.transceive(makeApduCmd(nfcCmd.SELECT_APP)),
    );
  }

  let dataPart1 = unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.READ_DATA, {
        file_no: 0x03,
        read_offset: 0x00,
        read_length: 0x40,
      }),
    ),
  );

  let dataPart2 = unwrapResponse(
    await NfcManager.isoDepHandler.transceive(
      makeApduCmd(nfcCmd.READ_DATA, {
        file_no: 0x03,
        read_offset: 0x40,
        read_length: 0x40,
      }),
    ),
  );

  return unpackClientStruct([...dataPart1, ...dataPart2]);
}

export {
  nfcCmd,
  makeApduCmd,
  makeClientStruct,
  unwrapResponse,
  readFile2,
  readFile3,
  unpackClientStruct,
  EC_TYPE_SECP256K1,
  validateServerCommand,
  verifyStateSignature,
};
