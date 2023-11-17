# kryptonian

Where validation meets purity, hope, and the strength of Krypton

[![npm](https://img.shields.io/npm/v/kryptonian)](https://www.npmjs.com/package/kryptonian) [![npm type definitions](https://img.shields.io/npm/types/kryptonian)](https://github.com/aminnairi/kryptonian)

## Features

### TypeScript

Benefit from robust TypeScript support with intelligent code completion, type inference, and error checking. The library provides a seamless development experience by leveraging TypeScript's static typing capabilities, catching potential issues during development rather than at runtime.

### Functional Programming

Adopt a functional programming paradigm within your validation logic, promoting immutability and avoiding mutations. This approach ensures that the state of your data remains predictable and maintainable, contributing to a more reliable codebase.

### Treeshakeable

Experience optimized bundles through the library's tree-shaking capabilities. This feature allows you to eliminate unused code during the build process, resulting in smaller production bundles and improved application performance.

### Extensible

Enjoy a comprehensive set of TypeScript types that enhance the overall developer experience. The library provides rich type definitions, ensuring maximum code quality and facilitating a smooth integration process within TypeScript projects.

### Custom Error Messages

Provide custom error messages for rules and schemas, enhancing user-facing error feedback. Tailor error messages to better communicate validation issues, improving the overall user experience.

### Client & Server-Side Support

Seamlessly integrate the validation library into both client and server-side projects. Whether you're building a web application or a server-side API, the library offers universal compatibility, empowering you to maintain consistent validation logic across different environments.

### Zero Dependencies

Minimize project dependencies with the library's commitment to a lightweight footprint. By avoiding external dependencies, you can maintain a streamlined project structure and reduce potential compatibility issues, contributing to a more efficient development process.

### Inspired by Zod

Draw inspiration from Zod's design principles, incorporating best practices for validation. The library takes cues from Zod to provide a well-designed and reliable validation solution that aligns with industry standards.

### Open-Source

Participate in the open-source community by contributing to the project through bug reports, feature requests, or pull requests. The library encourages collaboration and welcomes input from developers worldwide, fostering a community-driven approach to continuous improvement.

## Usage

```typescript
import * as Kryptonian from "kryptonian";

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
}
```

```json
[
  {
    "path": ".languages[3]",
    "message": "Should be a string"
  },
  {
    "path": ".age",
    "message": "Should be between 18 and 55"
  }
]
```

## API

### createProtector

Create a protection function helping you validate data according to the schema passed as argument. Unless you type check that the `success` property is true or false, you do not get access to the `data` property. This prevents unintentional access when there might be an error, protecting your from making mistakes in your source-code.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.text({
  message: "This is not a string",
  rules: []
}));

const data: unknown = "Hello, world!";
const protection = protect(data);

if (protection.success) {
  console.log(protection.data);
} else {
  console.log(protection.errors);
}
```

```json
"Hello, world!"
```

### text

Text is a schema representing a string.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.text({
  message: "This is not a string",
  rules: []
}));

const goodData: unknown = "Hello, world!";
const badData: unknown = 123;

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
```

```json
"Hello, world!"
[
  {
    "path": "",
    "message": "This is not a string"
  }
]
```

#### length

Validate that a string has exactly a given length.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.text({
  message: "This is not an array",
  rules: [
    Kryptonian.Text.length({
      length: 13,
      message: "This should be a string of 10 characters"
    })
  ]
}));

const goodData: unknown = "Hello, world!";
const wrongData: unknown = "Hello";

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
```

```json
"Hello, world!"
[
  {
    "path": "",
    "message": "This should be a string of 10 characters"
  }
]
```

#### minimumLength

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.text({
  message: "This is not an array",
  rules: [
    Kryptonian.Text.minimumLength({
      minimum: 10,
      message: "This should be a string of at least 10 characters"
    })
  ]
}));

const goodData: unknown = "Hello, world!";
const wrongData: unknown = "Hello";

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
```

```json
"Hello, world!"
[
  {
    "path": "",
    "message": "This should be a string of at least 10 characters"
  }
]
```

#### email

Validate that a string is a valid email.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.text({
  message: "This is not an array",
  rules: [
    Kryptonian.Text.email({
      message: "This should be a valid email"
    })
  ]
}));

const goodData: unknown = "kalel@krypton.io";
const wrongData: unknown = "kalel@krypton";

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
```

```json
"kalel@krypton.io"
[
  {
    "path": "",
    "message": "This should be a valid email"
  }
]
```

### numeric

Numeric is a schema representing a number.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: []
}));

const goodData: unknown = 123;
const wrongData: unknown = "Hello, world!";

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
```

```json
123
[
  {
    "path": "",
    "message": "This is not a number"
  }
]
```

#### between

Validate that a number is between two values.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
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
```

```json
15
[
  {
    "path": "",
    "message": "This should be a number between 10 & 20"
  }
]
```

#### divisibleBy

Validate that a number can be divided by another number without remaining value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: [
    Kryptonian.Numeric.divisibleBy({
      divisor: 5,
      message: "This should be a number divisible by 5"
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
```

```json
15
[
  {
    "path": "",
    "message": "This should be a number divisible by 5"
  }
]
```

#### notDivisibleBy

Validate that a number cannot be divided by another number without remaining value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: [
    Kryptonian.Numeric.notDivisibleBy({
      divisor: 2,
      message: "This should be a number not divisible by 2"
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
```

```json
15
[
  {
    "path": "",
    "message": "This should be a number not divisible by 2"
  }
]
```

#### even

Validate that a number is even.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: [
    Kryptonian.Numeric.even({
      message: "This should be an even number"
    })
  ]
}));

const goodData: unknown = 14;
const wrongData: unknown = 173;

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
```

```json
14
[
  {
    "path": "",
    "message": "This should be an even number"
  }
]
```

#### odd

Validate that a number is odd.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: [
    Kryptonian.Numeric.odd({
      message: "This should be an odd number"
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
```

```json
15
[
  {
    "path": "",
    "message": "This should be an odd number"
  }
]
```

#### positive

Validate that a number is positive.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: [
    Kryptonian.Numeric.positive({
      message: "This should be a positive number"
    })
  ]
}));

const goodData: unknown = 15;
const wrongData: unknown = -172;

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
```

```json
15
[
  {
    "path": "",
    "message": "This should be a positive number"
  }
]
```

#### negative

Validate that a number is negative.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.numeric({
  message: "This is not a number",
  rules: [
    Kryptonian.Numeric.negative({
      message: "This should be a negative number"
    })
  ]
}));

const goodData: unknown = -15;
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
```

```json
-15
[
  {
    "path": "",
    "message": "This should be a negative number"
  }
]
```

#### integer

Validate that a number is integer

```typescript
import * as Kryptonian from "kryptonian";

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
```

```json
15
[
  {
    "path": "",
    "message": "This should be an integer number"
  }
]
```

### record

Record is a schema representing an object.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.record({
  message: "This is not an object",
  rules: [],
  fields: {
    email: Kryptonian.text({
      message: "This is not a string",
      rules: []
    })
  }
}));

const goodData: unknown = {
  email: "kalel@krypton.io"
};

const wrongData: unknown = "Hello, world!";

const anotherWrongData: unknown = {
  email: 123
}

const protectionGoneRight = protect(goodData);
const protectionGoneWrong = protect(wrongData);
const protectionGoneWrongAgain = protect(anotherWrongData);

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

if (protectionGoneWrongAgain.success) {
  console.log(protectionGoneWrongAgain.data);
} else {
  console.log(protectionGoneWrongAgain.errors);
}
```

```json
{
  "email": "kalel@krypton.io"
}
[
  {
    "path": "",
    "message": "This is not an object"
  }
]
[
  {
    "path": ".email",
    "message": "This is not a string"
  }
]
```

### list

List is a schema representing an array

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.list({
  message: "This is not an array",
  rules: [],
  schema: Kryptonian.text({
    message: "This is not a string",
    rules: []
  })
}));

const goodData: unknown = [ "Hello", "world!" ];

const wrongData: unknown = "Hello, world!";

const anotherWrongData: unknown = [ "Hello", 123 ];

const protectionGoneRight = protect(goodData);
const protectionGoneWrong = protect(wrongData);
const protectionGoneWrongAgain = protect(anotherWrongData);

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

if (protectionGoneWrongAgain.success) {
  console.log(protectionGoneWrongAgain.data);
} else {
  console.log(protectionGoneWrongAgain.errors);
}
```

```json
[ "Hello", "world!" ]
[
  {
    "path": "",
    "message": "This is not an array"
  }
]
[
  {
    "path": "[1]",
    "message": "This is not a string"
  }
]
```

#### length

Validate the length of a list.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.list({
  message: "This is not an array",
  rules: [
    Kryptonian.List.length({
      length: 3,
      message: "This should be an array of 3 elements"
    })
  ],
  schema: Kryptonian.text({
    message: "This is not a string",
    rules: []
  })
}));

const goodData: unknown = [ "Hello", "world", "!" ];

const wrongData: unknown = "Hello, world!";

const anotherWrongData: unknown = [ "Hello", "world!" ];

const protectionGoneRight = protect(goodData);
const protectionGoneWrong = protect(wrongData);
const protectionGoneWrongAgain = protect(anotherWrongData);

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

if (protectionGoneWrongAgain.success) {
  console.log(protectionGoneWrongAgain.data);
} else {
  console.log(protectionGoneWrongAgain.errors);
}
```

```json
[ "Hello", "world", "!" ]
[
  {
    "path": "",
    "message": "This is not an array"
  }
]
[
  {
    "path": "",
    "message": "This should be an array of 3 elements"
  }
]
```

#### lengthBetween

Validate that the length of a list is between a range.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.list({
  message: "This is not an array",
  rules: [
    Kryptonian.List.lengthBetween({
      minimum: 2,
      maximum: 3,
      message: "This should be an array of 2 to 3 elements"
    })
  ],
  schema: Kryptonian.text({
    message: "This is not a string",
    rules: []
  })
}));

const goodData: unknown = [ "Hello", "world", "!" ];

const wrongData: unknown = [ "Hello" ];

const anotherWrongData: unknown = [ "Well", "hello", "world", "!" ];

const protectionGoneRight = protect(goodData);
const protectionGoneWrong = protect(wrongData);
const protectionGoneWrongAgain = protect(anotherWrongData);

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

if (protectionGoneWrongAgain.success) {
  console.log(protectionGoneWrongAgain.data);
} else {
  console.log(protectionGoneWrongAgain.errors);
}
```

```json
[ "Hello", "world", "!" ]
[
  {
    "path": "",
    "message": "This should be an array of 2 to 3 elements"
  }
]
[
  {
    "path": "",
    "message": "This should be an array of 2 to 3 elements"
  }
]
```

#### minimumLength

Validate that the length of a list is above a value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.list({
  message: "This is not an array",
  rules: [
    Kryptonian.List.minimumLength({
      minimum: 2,
      message: "This should be an array of at least 2 elements"
    })
  ],
  schema: Kryptonian.text({
    message: "This is not a string",
    rules: []
  })
}));

const goodData: unknown = [ "Hello", "world" ];

const wrongData: unknown = [ "Hello" ];

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
```

```json
[ "Hello", "world" ]
[
  {
    "path": "",
    "message": "This should be an array of at least 2 elements"
  }
]
```

#### maximumLength

Validate that the length of a list is above a value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.list({
  message: "This is not an array",
  rules: [
    Kryptonian.List.maximumLength({
      maximum: 2,
      message: "This should be an array of at most 2 elements"
    })
  ],
  schema: Kryptonian.text({
    message: "This is not a string",
    rules: []
  })
}));

const goodData: unknown = [ "Hello", "world" ];

const wrongData: unknown = [ "Hello", "world", "!" ];

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
```

```json
[ "Hello", "world" ]
[
  {
    "path": "",
    "message": "This should be an array of at most 2 elements"
  }
]
```

## Issues

See [`issues`](./issues).

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## Code of conduct

See [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

See [`LICENSE`](./LICENSE).

## Security

See [`SECURITY.md`](./SECURITY.md).