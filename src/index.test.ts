import * as Kryptonian from ".";

const protect = Kryptonian.createProtector(Kryptonian.notDefined({
  message: "This is not undefined"
}));

const goodData: unknown = undefined;
const badData: unknown = null;

const protectionGoneRight = protect(goodData);
const protectionGoneWrong = protect(badData);

if (protectionGoneRight.success) {
  console.log(protectionGoneRight.data);
} else {
  console.log(protectionGoneRight.errors);
}

if (protectionGoneWrong.success) {
  console.log(protectionGoneWrong.data);
} else {
  console.log(protectionGoneWrong.errors);
}