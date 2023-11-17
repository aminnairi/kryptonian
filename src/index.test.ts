import * as Kryptonian from ".";

const protect = Kryptonian.createProtector(Kryptonian.boolean({
  message: "This is not a boolean"
}));

const goodData: unknown = true;
const badData: unknown = [];

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