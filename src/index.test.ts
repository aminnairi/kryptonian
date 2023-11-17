import * as Kryptonian from ".";

const protect = Kryptonian.createProtector(Kryptonian.list({
  message: "This is not a number",
  rules: [],
  schema: Kryptonian.oneOf({
    message: "",
    schemas: [
      Kryptonian.numeric({
        message: "",
        rules: []
      }),
      Kryptonian.text({
        message: "",
        rules: []
      })
    ]
  })
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