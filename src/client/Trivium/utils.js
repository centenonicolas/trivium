import * as bitwise from "bitwise";

export function toBitarray(string) {
  const buffer = Buffer.from(string);
  return bitwise.buffer.read(buffer);
}

export function hexToAscii(string) {
  let str = "";
  for (let n = 0; n < string.length; n += 2) {
    str += String.fromCharCode(parseInt(string.substr(n, 2), 16));
  }
  return str;
}

export function hexToBitArray(hexString) {
  return toBitarray(hexToAscii(hexString));
}
