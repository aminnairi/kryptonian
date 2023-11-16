import * as Kryptonian from ".";

const protect = Kryptonian.createProtector(Kryptonian.record({
  message: "This should be a record",
  rules: [],
  fields: {
    email: Kryptonian.text({
      message: "This should be a string",
      rules: [
        Kryptonian.Text.minimum({
          minimum: 8,
          message: "Email should be at least 8 characters"
        }),
        Kryptonian.Text.email({
          message: "Email should be valid"
        }),
      ]
    }),
    languages: Kryptonian.list({
      message: "Should be an array",
      rules: [
        Kryptonian.List.length({
          length: 4,
          message: "There should be exactly 4 languages"
        })
      ],
      schema: Kryptonian.text({
        message: "Should be a string",
        rules: [],
      })
    }),
    age: Kryptonian.numeric({
      message: "This should be a number",
      rules: [
        Kryptonian.Numeric.between({
          minimum: 18,
          maximum: 55,
          message: "Should be between 18 and 55"
        })
      ]
    })
  },
}));

const protection = protect({
  email: "you@krypton.io",
  age: 16,
  languages: [
    "JavaScript",
    "PHP",
    "HTML",
    null
  ]
});

if (protection.success) {
  console.log(`Email is ${protection.data.email}`);
  console.log(`You are ${protection.data.age} years old`);
  console.log(`You like the following languages: ${protection.data.languages.join(", ")}`);
} else {
  console.log(protection.errors);
  // [
  //   {
  //     "path": ".languages[3]",
  //     "message": "Should be a string"
  //   },
  //   {
  //     "path": ".age",
  //     "message": "Should be between 18 and 55"
  //   }
  // ]
}