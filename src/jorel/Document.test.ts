import * as Vitest from "vitest";
import * as Jorel from "../jorel";

Vitest.describe("Document", () => {
  Vitest.test("It should be possible to create a document from a File", async () => {
    const documentFile = await Jorel.Document.fromFile(new File([], "file.txt"));

    Vitest.expect(documentFile).toBeInstanceOf(Jorel.Document);
  });

  Vitest.test("It should return an error if the file reader does not return bytes string", async () => {
    const FileReaderMock = Vitest.vi.fn(() => ({
      addEventListener: Vitest.vi.fn((_: string, callback: (event: { target: { result: null } }) => void) => {
        callback({
          target: {
            result: null
          }
        });
      }),
      readAsDataURL: Vitest.vi.fn(() => "")
    }));

    Vitest.vi.stubGlobal("FileReader", FileReaderMock);

    const binaryContent = new Uint8Array([0x48, 0x65, 0x6C, 0x6C, 0x6F]); // "Hello" in binary
    const blob = new Blob([binaryContent], { type: "application/octet-stream" });
    const binaryFile = new File([blob], "binary_file.bin", { type: "application/octet-stream" });

    try {
      await Jorel.Document.fromFile(binaryFile);

      throw new Error("Unexpected success");
    } catch (error) {
      Vitest.expect(error.message).toEqual("File reader did not return a string");
    }
  });

  Vitest.test("It should return a base64 encoded file", async () => {
    const documentFile = new Jorel.Document(Buffer.from("hello").toString("base64"), "test.txt", "text/plain");

    Vitest.expect(documentFile.toBuffer()).toEqual(Buffer.from("hello"));
  });

  Vitest.test("It should be stringifiable", async () => {
    const documentFile = new Jorel.Document(Buffer.from("hello").toString("base64"), "test.txt", "text/plain");
    const stringifiedFile = JSON.stringify(documentFile);

    Vitest.expect(stringifiedFile).toEqual("{\"bytes\":\"aGVsbG8=\",\"name\":\"test.txt\",\"mimeType\":\"text/plain\"}");
  });
});
