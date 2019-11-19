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
const Buffer = require('buffer/').Buffer;
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
//# sourceMappingURL=cipher.js.map