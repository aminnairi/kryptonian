export class Document {
  public bytes: string;
  public name: string;
  public mimeType: string;

  public constructor(bytes: string, name: string, mimeType: string) {
    this.bytes = bytes;
    this.name = name;
    this.mimeType = mimeType;
  }

  public static async fromFile(file: File): Promise<Document> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", (event) => {
        if (event.target && typeof event.target.result === "string") {
          console.log({ result: event.target.result });
          return resolve(new Document(event.target.result, file.name, file.type)); 
        }

        reject(new Error("File reader did not return a string"));
      });

      fileReader.readAsDataURL(file);
    }); 
  }

  public toBuffer(): Buffer {
    return Buffer.from(this.bytes.replace(/data:.*;base64,/, ""), "base64");
  }

  public toJSON() {
    return {
      bytes: this.bytes,
      name: this.name,
      mimeType: this.mimeType
    };
  }
}
