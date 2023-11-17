import * as Kryptonian from ".";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not an array",
  rules: [
    Kryptonian.Numeric.between({
      minimum: 10,
      maximum: 20,
      message: "This should be a number between 10 & 20"
    })
  ]
}));

const goodData: unknown = 15;
const wrongData: unknown = 172;

const protectionGoneRight = protect(goodData);
const protectionGoneWrong = protect(wrongData);

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