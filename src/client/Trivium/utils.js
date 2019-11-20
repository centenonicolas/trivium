"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitwise = __importStar(require("bitwise"));
function toBitarray(string) {
    const buffer = Buffer.from(string);
    return bitwise.buffer.read(buffer);
}
exports.toBitarray = toBitarray;
//# sourceMappingURL=utils.js.map