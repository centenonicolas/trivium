import * as trivium from "./trivium";
import * as utils from "./utils";

export function cipher(data, key, iv) {
  if (key.length !== 10 || iv.length !== 10) {
    throw new TypeError("Key and IV length should be 10");
  }

  const keyBitarray = utils.hexToBitArray(key);
  const ivBitarray = utils.hexToBitArray(iv);

  const state = trivium.initializeInternalState(keyBitarray, ivBitarray);

  const cipherBuffer = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i++) {
    const dataByte = data.readUInt8(i);
    const cipherByte = trivium.nextByte(state);
    cipherBuffer.writeUInt8(cipherByte ^ dataByte, i);
  }

  return cipherBuffer;
}

export function cipherBmp(data, key, iv) {
  const BMP_HEADER_SIZE = 54;
  const header = data.slice(0, BMP_HEADER_SIZE);
  const payload = data.slice(BMP_HEADER_SIZE);

  const cipheredPayload = cipher(payload, key, iv);

  return Buffer.concat([header, cipheredPayload]);
}
