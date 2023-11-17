import * as Kryptonian from ".";

const protect = Kryptonian.createProtector(Kryptonian.unknown());

const goodData: unknown = "Hello, world!";
const alsoGoodData: unknown = 42;

const protectionGoneRight = protect(goodData);
const alsoGoodProtection = protect(alsoGoodData);

if (protectionGoneRight.success) {
  console.log(protectionGoneRight.data);
} else {
  console.log(protectionGoneRight.errors);
}

if (alsoGoodProtection.success) {
  console.log(alsoGoodProtection.data);
} else {
  console.log(alsoGoodProtection.errors);
}