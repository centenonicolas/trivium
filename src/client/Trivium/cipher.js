"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const trivium = __importStar(require("./trivium"));
const utils = __importStar(require("./utils"));
function cipher(data, key, iv) {
    if (key.length !== 10 || iv.length !== 10) {
        throw new TypeError("Key and IV length should be 10");
    }
    const keyBitarray = utils.toBitarray(key);
    const ivBitarray = utils.toBitarray(iv);
    const state = trivium.initializeInternalState(keyBitarray, ivBitarray);
    const cipherBuffer = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i++) {
        const dataByte = data.readUInt8(i);
        const cipherByte = trivium.nextByte(state);
        cipherBuffer.writeUInt8(cipherByte ^ dataByte, i);
    }
    return cipherBuffer;
}
exports.cipher = cipher;
function cipherBmp(data, key, iv) {
    const BMP_HEADER_SIZE = 54;
    const header = data.slice(0, BMP_HEADER_SIZE);
    const payload = data.slice(BMP_HEADER_SIZE);
    const cipheredPayload = cipher(payload, key, iv);
    return Buffer.concat([header, cipheredPayload]);
}
exports.cipherBmp = cipherBmp;
//# sourceMappingURL=cipher.js.map