import { UInt8 } from "bitwise/types";
import * as trivium from "./trivium";
import * as utils from "./utils";

export function cipher(data: Buffer, key: string, iv: string): Buffer {
  if (key.length !== 10 || iv.length !== 10) {
    throw new TypeError("Key and IV length should be 10");
  }

  const keyBitarray = utils.hexToBitArray(key);
  const ivBitarray = utils.hexToBitArray(iv);

  const state = trivium.initializeInternalState(keyBitarray, ivBitarray);

  const cipherBuffer = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i++) {
    const dataByte = data.readUInt8(i) as UInt8;
    const cipherByte = trivium.nextByte(state);
    cipherBuffer.writeUInt8(cipherByte ^ dataByte, i);
  }

  return cipherBuffer;
}
