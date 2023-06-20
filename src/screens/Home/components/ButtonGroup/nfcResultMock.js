const clientStruct = {
  clientPrivKeySlot1: [
    203, 195, 217, 249, 237, 237, 60, 97, 81, 137, 181, 237, 115, 200, 225, 93,
    199, 151, 218, 156, 130, 199, 168, 94, 54, 43, 32, 104, 239, 104, 235, 225,
  ],
  clientPrivKeySlot1Offset: 36,
  clientPrivKeySlot1Version: 1,
  clientPrivKeySlot2: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  clientPrivKeySlot2Offset: 72,
  clientPrivKeySlot2Version: 0,
  curveType: 37,
  serverDataHash: [
    90, 7, 83, 237, 121, 234, 196, 45, 55, 79, 196, 18, 83, 10, 211, 132, 20,
    235, 71, 158, 114, 187, 18, 164, 130, 228, 74, 18, 197, 95, 253, 181,
  ],
};

export const nfcResultMock = {
  btc: {
    addressSlot1: '2N4btKjJoY3WUJLADh8fFGq2LM5ZjKovHuG',
    addressSlot2: null,
  },
  clientStruct: clientStruct,
  postVerify: {
    client_key_ver: 0,
    client_keys: [[Object]],
    serial_number: 'BG00003AV1',
    state: 'pending_personalize',
    tagtamper: 'secure',
  },
  serverStruct: {
    block_height: 2344916,
    block_height_bin: [212, 199, 35, 0],
    client_key_ver: 0,
    client_key_ver_bin: [0, 0, 0, 0],
    curveType: 37,
    encServerIV: [
      248, 25, 15, 65, 118, 30, 215, 117, 211, 157, 167, 225, 194, 123, 23, 85,
    ],
    encServerPrivKey: [
      189, 90, 171, 179, 102, 14, 203, 77, 13, 34, 101, 203, 61, 130, 213, 4, 8,
      84, 201, 22, 81, 167, 126, 215, 121, 242, 254, 227, 233, 120, 118, 234,
    ],
    lockTime: 1862611200,
    lockTimeBin: [0, 49, 5, 111],
    ndefRecords: [[Object]],
    nominalValue: 100000,
    nominalValueBin: [160, 134, 1, 0],
    nonce: [25, 26, 121, 104, 142, 133, 177, 144],
    serverPsHash:
      '5a0753ed79eac42d374fc412530ad38414eb479e72bb12a482e44a12c55ffdb5',
    serverPubKey: [
      151, 186, 229, 34, 4, 59, 99, 176, 9, 77, 217, 75, 49, 174, 193, 85, 37,
      5, 81, 239, 147, 103, 151, 252, 205, 182, 127, 47, 178, 122, 213, 31, 8,
      182, 158, 116, 173, 173, 120, 0, 135, 167, 109, 251, 54, 69, 42, 19, 191,
      15, 95, 166, 89, 193, 108, 98, 177, 150, 197, 64, 174, 82, 189, 217,
    ],
    sig_verification: null,
    sig_verified: false,
    signature_r: [
      67, 2, 151, 36, 184, 150, 133, 96, 111, 103, 128, 60, 198, 40, 40, 124,
      158, 130, 83, 7, 25, 111, 183, 252, 57, 109, 199, 50, 4, 127, 182, 110,
    ],
    signature_s: [
      193, 36, 124, 122, 229, 213, 59, 228, 238, 233, 80, 17, 204, 114, 145, 33,
      195, 68, 41, 21, 110, 14, 179, 116, 96, 228, 29, 43, 91, 94, 198, 107,
    ],
    state: 'pp',
    state_bin: [112, 112],
    state_offset: 152,
    tagHash: [143, 133, 12, 98, 15, 15, 53, 193],
  },
  type: 'verify',
};

export const nfcResultMock2 = {
  serverStruct: {
    ndefRecords: [
      {
        tnf: 1,
        type: 'U',
        id: [],
        payload: [
          4, 107, 111, 110, 103, 46, 99, 97, 115, 104, 47, 97, 112, 112,
        ],
      },
    ],
    tagHash: [60, 114, 51, 250, 169, 59, 213, 47],
    nominalValueBin: [32, 161, 7, 0],
    nominalValue: 500000,
    lockTimeBin: [0, 49, 5, 111],
    lockTime: 1862611200,
    curveType: 37,
    encServerIV: [
      112, 90, 31, 134, 197, 124, 133, 49, 196, 48, 253, 242, 81, 233, 15, 83,
    ],
    encServerPrivKey: [
      116, 60, 160, 111, 197, 82, 23, 221, 142, 122, 165, 117, 89, 240, 53, 32,
      209, 237, 195, 52, 82, 13, 130, 222, 209, 233, 52, 62, 13, 219, 154, 235,
    ],
    serverPubKey: [
      46, 126, 206, 5, 156, 160, 252, 137, 16, 35, 93, 6, 140, 53, 103, 12, 56,
      73, 65, 225, 105, 188, 98, 238, 86, 155, 84, 5, 245, 82, 206, 14, 37, 135,
      156, 111, 208, 43, 36, 231, 100, 152, 207, 82, 185, 104, 46, 210, 159, 69,
      115, 61, 237, 77, 219, 238, 152, 229, 212, 185, 138, 246, 53, 12,
    ],
    serverPsHash:
      '02c534346766842fd7bf27fc3d92b1e75cdd97817aaa77554e709f7717880a6f',
    state_offset: 152,
    state_bin: [112, 112],
    state: 'pp',
    client_key_ver_bin: [0, 0, 0, 0],
    client_key_ver: 0,
    nonce: [200, 239, 87, 245, 128, 16, 214, 46],
    block_height_bin: [200, 208, 35, 0],
    block_height: 2347208,
    signature_r: [
      219, 248, 188, 36, 180, 58, 31, 229, 42, 122, 108, 14, 45, 2, 226, 62, 76,
      156, 125, 182, 86, 108, 229, 227, 19, 159, 85, 70, 166, 183, 179, 173,
    ],
    signature_s: [
      57, 42, 36, 101, 156, 67, 75, 126, 70, 121, 209, 183, 93, 164, 142, 31,
      228, 89, 58, 50, 26, 108, 66, 44, 146, 180, 73, 162, 73, 58, 250, 104,
    ],
    sig_verified: false,
    sig_verification: null,
  },
  clientStruct: {
    curveType: 37,
    serverDataHash: [
      2, 197, 52, 52, 103, 102, 132, 47, 215, 191, 39, 252, 61, 146, 177, 231,
      92, 221, 151, 129, 122, 170, 119, 85, 78, 112, 159, 119, 23, 136, 10, 111,
    ],
    clientPrivKeySlot1: [
      88, 25, 102, 172, 232, 239, 17, 99, 101, 91, 67, 41, 222, 23, 8, 70, 184,
      84, 164, 165, 159, 53, 228, 174, 158, 122, 198, 110, 234, 38, 59, 132,
    ],
    clientPrivKeySlot1Version: 1,
    clientPrivKeySlot1Offset: 36,
    clientPrivKeySlot2: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ],
    clientPrivKeySlot2Version: 0,
    clientPrivKeySlot2Offset: 72,
  },
  btc: {
    addressSlot1: '2N7wWqgxAAVqFHXjFsF4PvXHW3THfb6zvdk',
    addressSlot2: null,
  },
  postVerify: {
    state: 'pending_personalize',
    tagtamper: 'secure',
    client_key_ver: 0,
    serial_number: 'BG00002AV1',
    client_keys: [
      {
        version: 1,
        client_pub_key:
          '0431fedc90b420d40f0c3d0abc8726dd66b55916d0464190c7c8f8c40cdd8b1883aa155393e3ae258d04d90e6611dec62e1ede419afc7c1912aabb5e1f79224340',
        address: '2N7wWqgxAAVqFHXjFsF4PvXHW3THfb6zvdk',
      },
    ],
  },
};

export const unpersonalizedNote = {
  serverStruct: {
    ndefRecords: [
      {
        tnf: 1,
        type: 'U',
        id: [],
        payload: [
          4, 111, 102, 102, 108, 105, 110, 101, 46, 99, 97, 115, 104, 47, 63,
          110, 102, 99,
        ],
      },
    ],
    tagHash: [166, 194, 197, 255, 204, 183, 8, 255],
    nominalValueBin: [160, 134, 1, 0],
    nominalValue: 100000,
    lockTimeBin: [0, 72, 253, 110],
    lockTime: 1862092800,
    curveType: 37,
    encServerIV: [
      29, 199, 221, 184, 77, 9, 74, 182, 163, 68, 38, 24, 90, 40, 111, 222,
    ],
    encServerPrivKey: [
      10, 121, 254, 70, 254, 85, 4, 223, 91, 242, 100, 72, 151, 151, 45, 16, 60,
      33, 89, 19, 144, 232, 39, 35, 214, 60, 34, 192, 97, 189, 13, 215,
    ],
    serverPubKey: [
      245, 207, 180, 36, 226, 139, 97, 42, 62, 173, 54, 157, 248, 152, 120, 134,
      131, 206, 15, 200, 250, 11, 133, 41, 254, 181, 209, 77, 132, 80, 129, 24,
      144, 108, 227, 50, 141, 174, 95, 163, 95, 75, 117, 252, 28, 200, 185, 94,
      50, 78, 108, 104, 130, 88, 209, 142, 146, 135, 163, 30, 177, 143, 102,
      129,
    ],
    serverPsHash:
      'bce394e4ac428389acc0b34dee0ad7a2ca0358a68a709756f1adceabd64c3700',
    state_offset: 156,
    state_bin: [66, 76],
    state: 'BL',
    client_key_ver_bin: [0, 0, 0, 0],
    client_key_ver: 0,
    nonce: [134, 42, 21, 133, 84, 200, 197, 19],
    block_height_bin: [111, 139, 11, 0],
    block_height: 756591,
    signature_r: [
      173, 94, 179, 252, 99, 39, 76, 96, 121, 10, 2, 82, 205, 20, 46, 168, 51,
      150, 115, 239, 64, 192, 28, 156, 67, 206, 40, 42, 77, 209, 1, 33,
    ],
    signature_s: [
      169, 194, 50, 47, 212, 124, 220, 83, 45, 192, 110, 194, 140, 36, 172, 2,
      164, 19, 228, 6, 135, 127, 115, 119, 185, 174, 238, 226, 77, 115, 78, 77,
    ],
    sig_verified: false,
    sig_verification: null,
  },
  clientStruct: null,
  postVerify: {
    state: 'provisioned',
    tagtamper: 'secure',
    client_key_ver: 0,
    serial_number: 'BG02252AV3',
    client_keys: [],
  },
};

export const productionScan = {
  serverStruct: {
    ndefRecords: [
      {
        tnf: 1,
        type: 'U',
        id: [],
        payload: [
          4, 111, 102, 102, 108, 105, 110, 101, 46, 99, 97, 115, 104, 47, 63,
          110, 102, 99,
        ],
      },
    ],
    tagHash: [189, 52, 125, 186, 51, 11, 165, 5],
    nominalValueBin: [160, 134, 1, 0],
    nominalValue: 100000,
    lockTimeBin: [0, 72, 253, 110],
    lockTime: 1862092800,
    curveType: 37,
    encServerIV: [
      68, 149, 252, 210, 1, 223, 176, 144, 35, 98, 63, 163, 89, 36, 83, 108,
    ],
    encServerPrivKey: [
      170, 231, 12, 187, 140, 42, 55, 251, 168, 156, 94, 92, 168, 178, 101, 90,
      8, 251, 91, 65, 55, 71, 243, 47, 28, 148, 5, 217, 209, 225, 116, 184,
    ],
    serverPubKey: [
      179, 21, 138, 80, 120, 172, 241, 72, 5, 44, 110, 233, 231, 219, 39, 193,
      49, 142, 66, 210, 40, 209, 208, 178, 95, 119, 153, 101, 134, 96, 90, 224,
      78, 110, 188, 9, 82, 72, 68, 192, 67, 90, 216, 236, 42, 189, 139, 200,
      114, 22, 191, 210, 113, 214, 129, 243, 145, 108, 77, 137, 227, 80, 114,
      79,
    ],
    serverPsHash:
      'e7f7400e2f3ea4fa8441dd5fe8356a7dd251e77da5a31274ae522dfe5ade7f6a',
    state_offset: 156,
    state_bin: [66, 76],
    state: 'BL',
    client_key_ver_bin: [0, 0, 0, 0],
    client_key_ver: 0,
    nonce: [180, 129, 102, 56, 117, 140, 99, 199],
    block_height_bin: [129, 150, 11, 0],
    block_height: 759425,
    signature_r: [
      12, 124, 201, 254, 110, 147, 255, 123, 57, 151, 193, 183, 27, 188, 61,
      154, 174, 34, 79, 199, 107, 26, 148, 10, 229, 5, 62, 57, 59, 26, 218, 179,
    ],
    signature_s: [
      177, 14, 76, 40, 94, 56, 13, 175, 62, 124, 239, 191, 122, 229, 196, 122,
      118, 250, 62, 116, 189, 105, 82, 172, 66, 97, 97, 16, 254, 232, 27, 112,
    ],
    sig_verified: false,
    sig_verification: null,
  },
  clientStruct: null,
  postVerify: {
    state: 'provisioned',
    tagtamper: 'secure',
    client_key_ver: 0,
    serial_number: 'BG99000AV3',
    client_keys: [],
  },
};
