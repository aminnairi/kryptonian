# kryptonian

Purity, hope, and the strength of Krypton in one package

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

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.empty({
      message: "Request should be void or undefined"
    }),
    response: Kryptonian.list({
      message: "Response should be an array",
      rules: [],
      schema: Kryptonian.record({
        message: "Response should be a record",
        rules: [],
        fields: {
          createdAt: Kryptonian.date({
            message: "Response record should have a property createdAt that is a date",
            rules: []
          }),
          name: Kryptonian.text({
            message: "Response record should be an array of strings",
            rules: []
          })
        }
      })
    })
  }
});
```

```typescript
import * as Kryptonian from "kryptonian"
import * as Http from "http";
import { routes } from "@template/shared";

const router = Kryptonian.Jorel.createRouter({
  client: "http://localhost:5173",
  routes,
  spaceships: {
    getKryptonians: async () => {
      return [
        {
          name: "Kalel",
          createdAt: new Date()
        },
        {
          name: "Jorel",
          createdAt: new Date()
        },
        {
          name: "Zorel",
          createdAt: new Date()
        }
      ];
    }
  }
});

const server = Http.createServer(router);

server.listen(8000, "0.0.0.0", () => {
  console.log("Spaceship launched and ready for communications");
});
```

```typescript
import * as React from "react";
import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";

const client = Kryptonian.Jorel.createClient({
  endpoint: "http://localhost:8000",
  routes
});

export interface Inhabitant {
  name: string,
  createdAt: Date
}

export const App = () => {
  const [kryptonians, setKryptonians] = React.useState<Array<Inhabitant>>([]);

  React.useEffect(() => {
    client.getKryptonians().then(kryptonians => {
      setKryptonians(kryptonians);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  return (
    <ul>
      {kryptonians.map(kryptonian => (
        <li key={kryptonian.name}>
          {kryptonian.name} - {kryptonian.createdAt.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
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

### boolean

Boolean is a schema representing a value that can either be true or false.

```typescript
import * as Kryptonian from "kryptonian";

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
```

```json
true
[
  {
    "path": "",
    "message": "This is not a boolean"
  }
]
```

### none

None is a schema representing a value that can be null.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.none({
  message: "This is not null"
}));

const goodData: unknown = null;
const badData: unknown = undefined;

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
null
[
  {
    "path": "",
    "message": "This is not null"
  }
]
```

### notDefined

NotDefined is a schema representing a value that can be undefined.

```typescript
import * as Kryptonian from "kryptonian";

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
```

```json
"undefined"
[
  {
    "path": "",
    "message": "This is not undefined"
  }
]
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

### date

Date is a schema representing a date object.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.date({
  message: "This should be a date",
  rules: []
}));

const goodData: unknown = new Date(2023, 1, 2, 3, 4, 5);
const alsoGoodData: unknown = "2023-11-19T13:32:34.479Z";
const badData: unknown = NaN;

const protectionGoneRight = protect(goodData);
const protectionGoneRightAgain = protect(alsoGoodData);
const protectionGoneWrong = protect(badData);

if (protectionGoneRight.success) {
  console.log(protectionGoneRight.data);
} else {
  console.log(protectionGoneRight.errors);
}

if (protectionGoneRightAgain.success) {
  console.log(protectionGoneRightAgain.data);
} else {
  console.log(protectionGoneRightAgain.errors);
}

if (protectionGoneWrong.success) {
  console.log(protectionGoneWrong.data);
} else {
  console.log(protectionGoneWrong.errors);
}
```

```json
Thu Feb 02 2023 03:04:05 GMT+0100
Sun Nov 19 2023 14:32:34 GMT+0100
[
  {
    "path": "",
    "message": "This should be a date"
  }
]
```

#### between

Validate that a date is between two dates.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.date({
  message: "This should be a date",
  rules: [
    Kryptonian.Date.between({
      minimum: new Date(2021, 0, 1, 0, 0, 0),
      maximum: new Date(2024, 0, 1, 1, 1, 1),
      message: "This should be a date between 01/01/2021 & 01/01/2024"
    })
  ]
}));

const goodData: unknown = new Date(2023, 0, 1, 0, 0, 0);
const badData: unknown = new Date(2025, 0, 1, 0, 0, 0);
const alsoBadData: unknown = new Date(2020, 0, 1, 0, 0, 0);

const protectionGoneRight = protect(goodData);
const protectionGoneWrong = protect(badData);
const protectionGoneWrongAgain = protect(alsoBadData);

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
Sun Jan 01 2023 00:00:00 GMT+0100 (heure normale d’Europe centrale)
[
  {
    "path": "",
    "message": "This should be a date between 01/01/2021 & 01/01/2024"
  }
]
[
  {
    "path": "",
    "message": "This should be a date between 01/01/2021 & 01/01/2024"
  }
]
```

#### before

Validate that a date is before a given date.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.date({
  message: "This should be a date",
  rules: [
    Kryptonian.Date.before({
      date: new Date(2025, 0, 1, 0, 0, 0),
      message: "This should be a date before 01/01/2025"
    })
  ]
}));

const goodData: unknown = new Date(2023, 0, 1, 0, 0, 0);
const badData: unknown = new Date(2028, 0, 1, 0, 0, 0);

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
Sun Jan 01 2023 00:00:00 GMT+0100 (heure normale d’Europe centrale)
[
  {
    "path": "",
    "message": "This should be a date before 01/01/2025"
  }
]
```

#### after

Validate that a date is after a given date.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.date({
  message: "This should be a date",
  rules: [
    Kryptonian.Date.after({
      date: new Date(2021, 0, 1, 0, 0, 0),
      message: "This should be a date after 01/01/2021"
    })
  ]
}));

const goodData: unknown = new Date(2023, 0, 1, 0, 0, 0);
const badData: unknown = new Date(2020, 0, 1, 0, 0, 0);

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
Sun Jan 01 2023 00:00:00 GMT+0100 (heure normale d’Europe centrale)
[
  {
    "path": "",
    "message": "This should be a date after 01/01/2021"
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

### unknown

Unknown is a schema representing a TypeScript unknown value.

```typescript
import * as Kryptonian from "kryptonian";

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
```

```json
"Hello, world!"
42
```

### any

Unknown is a schema representing a TypeScript any value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.any());

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
```

```json
"Hello, world!"
42
```

### empty

`empty` is a schema representing the `void` value in TypeScript. Any value that is `undefined` is allowed in this schema. Also, if validating function arguments, `void` represent the absence of value, so you can also omit the value in this schema.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.createProtector(Kryptonian.empty({
  message: "This should be empty (void or undefined)"
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
```

```json
undefined
[
  {
    "path": "",
    "message": "This should be empty (void or undefined)"
  }
]
```

### Jorel

Jorel is the name of the client/server technology that is inherent to the Kryptonian library. With it, you can define a server and a client that sends data to each other in a pure, functional and safe way.

#### createRoutes

createRoutes is a function that will help you define the shape of your server using a validation schema.

```typescript
import * as Kryptonian from "kryptonian";

const routes = Kryptonian.Jorel.createRoutes({
  createKryptonian: {
    request: Kryptonian.record({
      message: "This should be a record",
      rules: [],
      fields: {
        name: Kryptonian.text({
          message: "Name is not a string",
          rules: []
        })
      }
    }),
    response: Kryptonian.text({
      rules: [],
      message: "Expected a string as the response"
    })
  },
  getKryptonians: {
    request: Kryptonian.none({
      message: "Expected nothing except null"
    }),
    response: Kryptonian.list({
      message: "Response is not a list",
      rules: [],
      schema: Kryptonian.text({
        message: "Response is not a list of text",
        rules: []
      })
    })
  }
});
```

#### createServer

createServer is a function that will take as input your server, and will let your define an implementation for the latter. For now, we only support creating a server using the built-in `http` module from Node.js, and we intend on adding support for adapters for others libraries as well such as Express or Fastify.

```typescript
import * as Http from "http";
import * as Kryptonian from "kryptonian";
import { routes } from "./routes";

const kryptoniansDatabase: Array<string> = [];

const serverRouter = Kryptonian.Jorel.createRouter({
  client: "http://localhost:5173",
  routes,
  spaceships: {
    // Parameters are properly typed from the routes!
    createKryptonian: async ({ name }) => {
      kryptoniansDatabase.push(name);

      return "Successfully created the user";
    },
    getKryptonians: async () => {
      return [
        ...kryptonians
      ];
    }
  }
});

const port = 8000;
const hostname = "localhost";

const server = Http.createServer(serverRouter);

server.listen(port, hostname, () => {
  console.log("Kryptonian spaceship launched");
});
```

#### createClient

createClient is a function that will help you request informations from the server. It implements the `Fetch` Web API, and we intend on adding support for more HTTP libraries such as Axios for instance. Each time you request something, it will pick-up the validation schema and forces you to use this schema for all your request, preventing mistakes even if you decide to update the schema. When receiving the body, data validation is also applied, so that you can't mess up manipulating data that is not validated yet.

```tsx
import * as React from "react";
import * as Kryptonian from "kryptonian";
import { routes } from "./routes";

const client = Kryptonian.Jorel.createClient({
  endpoint: "http://localhost:8000",
  routes
});

export const Component = () => {
  const [kryptonian, setKryptonian] = useState("");
  const [kryptonians, setKryptonians] = React.useState<Array<string>>([]);

  const updateKryptonian: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
    setKryptonian(event.target.value);
  }, []);

  const getKryptonians = React.useCallback(() => {
    client.getKryptonians(null).then(kryptonian => {
      setKryptonians(kryptonian);
    }).catch(() => {
      alert("An error occurred");
    });
  }, []);

  const createKryptonian: React.FormEventHandler = React.useCallback(event => {
    event.preventDefault();

    client.createKryptonian({
      name: kryptonian
    }).then(() => {
      alert("Kryptonian saved!");
    }).catch(error => {
      alert("An error occurred");
    });
  }, [kryptonian]);

  return (
    <React.Fragment>
      <form onSubmit={createKryptonian}>
        <input
          type="text"
          value={kryptonian}
          onChange={updateKryptonian} />
        <button type="submit">
          Save
        </button>
      </form>
      <ul>
        {kryptonians.map(kryptonian => (
          <li>
            {kryptonian}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
```

That's it, in a few lines, you just created your own server/client appliation using React for this example. Note that it works with absolutely any JavaScript framework, and even Vanilla TypeScript since it has no external dependencies. You could of course do the same in Vue.js for instance.

```html
<script lang="ts" setup>
import * as Vue from "vue";
import * as Kryptonian from "kryptonian";
import { routes } from "./routes";

const client = Kryptonian.Jorel.createClient({
  endpoint: "http://localhost:8000",
  routes
});

const kryptonian = Vue.ref("");
const kryptonians = Vue.ref<Array<string>>([]);

const updateKryptonian = (event: EventTarget) => {
  kryptonian.value = event.target.value;
};

const getKryptonians = () => {
  client.getKryptonians(null).then(kryptonian => {
    setKryptonians(kryptonian);
  }).catch(() => {
    alert("An error occurred");
  });
};

const createKryptonian = (event: FormEvent) => {
  event.preventDefault();

  client.createKryptonian({
    name: kryptonian.value
  }).then(() => {
    alert("Kryptonian saved!");
  }).catch(error => {
    alert("An error occurred");
  });
}
</script>

<template>
  <form>
    <input v-model="kryptonian">
  </form>
  <ul>
    <li v-for="kryptonian in kryptonians">
      {{ kryptonian }}
    </li>
  </ul>
</template>
```

#### getting started

```bash
npx degit aminnairi/kryptonian/template my-project
cd my-project
# read the README.md!
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