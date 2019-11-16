import * as cipher from "../src/server/cipher";
import * as utils from "../src/server/utils";
import * as fs from "fs";
import * as util from "util";

describe("Cipher tests", () => {
  describe("#test1", () => {
    // const key = 0x80000000000000000000;
    // const iv = 0x00000000000000000000;
  // buffer.read(key);
    const readFile = util.promisify(fs.readFile);
    const key = "80000000000000000000";
    const iv = "00000000000000000000";
    const filePath = "test/testfile";


    let file: Buffer | undefined;
    test("vector1", async () => {

      try {
        console.log(filePath);
        console.log(key);
        console.log(iv);
        file = await readFile(filePath);
      } catch {
        file = undefined;
        console.log("Hay un problema con el archivo :(");
        process.exit(1);
      }
      const cipherBuffer = cipher.cipher(file as Buffer, key, iv);
      console.log(cipherBuffer);
      expect(cipherBuffer.slice(0, 63)).toEqual("38EB86FF730D7A9CAF8DF13A4420540DBB7B651464C87501552041C249F29A64D2FBF515610921EBE06C8F92CECF7F8098FF20CCCC6A62B97BE8EF7454FC80F9");
    });

  });

});
