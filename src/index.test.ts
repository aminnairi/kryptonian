import * as Kryptonian from ".";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: [
    Kryptonian.Numeric.integer({
      message: "This should be an integer number"
    })
  ]
}));

const goodData: unknown = 15;
const wrongData: unknown = 17.2;

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