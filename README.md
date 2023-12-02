# kryptonian

Purity, hope, and the strength of Krypton in one package

[![npm](https://img.shields.io/npm/v/kryptonian)](https://www.npmjs.com/package/kryptonian) [![npm type definitions](https://img.shields.io/npm/types/kryptonian)](https://github.com/aminnairi/kryptonian) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/kryptonian)](https://bundlephobia.com/package/kryptonian) [![NPM](https://img.shields.io/npm/l/kryptonian)](https://github.com/aminnairi/kryptonian/blob/development/LICENSE)

## Summary

- [Features](#features)
  - [TypeScript](#typescript)
  - [Functional Programming](#functional-programming)
  - [Treeshakeable](#treeshakeable)
  - [Extensible](#extensible)
  - [Custom Error Messages](#custom-error-messages)
  - [Client & Server-Side Support](#client--server-side-support)
  - [Zero Dependencies](#zero-dependencies)
  - [Inspired by Zod](#inspired-by-zod)
  - [Open-Source](#open-source)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [createProtector](#createprotector)
  - [literal](#literal)
  - [boolean](#boolean)
  - [none](#none)
  - [notDefined](#notdefined)
  - [string](#string)
    - [length](#length)
    - [minimumLength](#minimumlength)
    - [includes](#includes)
    - [startsWith](#startswith)
    - [endsWith](#endswith)
    - [email](#email)
    - [uniformResourceLocator](#uniformresourcelocator)
    - [internetProtocolVersion4](#internetprotocolversion4)
    - [internetProtocolVersion4WithClasslessInterDomainRouting](#internetprotocolversion4withclasslessinterdomainrouting)
  - [number](#number)
    - [between](#between)
    - [divisibleBy](#divisibleby)
    - [notDivisibleBy](#notdivisibleby)
    - [even](#even)
    - [odd](#odd)
    - [positive](#positive)
    - [negative](#negative)
    - [integer](#integer)
    - [greater](#greater)
    - [lower](#lower)
    - [greaterOrEqual](#greaterorequal)
    - [lowerOrEqual](#lowerorequal)
    - [finite](#finite)
  - [date](#date)
    - [between](#between-1)
    - [before](#before)
    - [after](#after)
  - [object](#object)
  - [array](#array)
    - [length](#length-1)
    - [lengthBetween](#lengthbetween)
    - [minimumLength](#minimumlength-1)
    - [maximumLength](#maximumlength)
    - [nonEmpty](#nonempty)
  - [unknown](#unknown)
  - [any](#any)
  - [empty](#empty)
  - [oneOf](#oneof)
  - [Jorel](#jorel)
    - [createRoutes](#createroutes)
    - [createServerRouter](#createserverrouter)
    - [createServerRoute](#createserverroute)
    - [createClientRoutes](#createclientroutes)
    - [getting started](#getting-started)
  - [InferType](#infertype)
  - [Custom rules](#custom-rules)
- [Issues](#issues)
- [Changelog](#changelog)
- [Code of conduct](#code-of-conduct)
- [Contributing](#contributing)
- [License](#license)
- [Security](#security)

## Features

### TypeScript

Benefit from robust TypeScript support with intelligent code completion, type inference, and error checking. The library provides a seamless development experience by leveraging TypeScript's static typing capabilities, catching potential issues during development rather than at runtime.

[Back to summary](#summary)

### Functional Programming

Adopt a functional programming paradigm within your validation logic, promoting immutability and avoiding mutations. This approach ensures that the state of your data remains predictable and maintainable, contributing to a more reliable codebase.

[Back to summary](#summary)

### Treeshakeable

Experience optimized bundles through the library's tree-shaking capabilities. This feature allows you to eliminate unused code during the build process, resulting in smaller production bundles and improved application performance.

[Back to summary](#summary)

### Extensible

Enjoy a comprehensive set of TypeScript types that enhance the overall developer experience. The library provides rich type definitions, ensuring maximum code quality and facilitating a smooth integration process within TypeScript projects.

[Back to summary](#summary)

### Custom Error Messages

Provide custom error messages for rules and schemas, enhancing user-facing error feedback. Tailor error messages to better communicate validation issues, improving the overall user experience.

[Back to summary](#summary)

### Client & Server-Side Support

Seamlessly integrate the validation library into both client and server-side projects. Whether you're building a web application or a server-side API, the library offers universal compatibility, empowering you to maintain consistent validation logic across different environments.

[Back to summary](#summary)

### Zero Dependencies

Minimize project dependencies with the library's commitment to a lightweight footprint. By avoiding external dependencies, you can maintain a streamlined project structure and reduce potential compatibility issues, contributing to a more efficient development process.

[Back to summary](#summary)

### Inspired by Zod

Draw inspiration from Zod's design principles, incorporating best practices for validation. The library takes cues from Zod to provide a well-designed and reliable validation solution that aligns with industry standards.

[Back to summary](#summary)

### Open-Source

Participate in the open-source community by contributing to the project through bug reports, feature requests, or pull requests. The library encourages collaboration and welcomes input from developers worldwide, fostering a community-driven approach to continuous improvement.

[Back to summary](#summary)

## Installation

```bash
npm install kryptonian
```

[Back to summary](#summary)

## Usage

```typescript
import * as Kryptonian from "kryptonian";

export const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.Kalel.empty({
      message: "Request should be void or undefined"
    }),
    response: Kryptonian.Kalel.array({
      message: "Response should be an array",
      rules: [],
      schema: Kryptonian.Kalel.object({
        message: "Response should be an object",
        fields: {
          createdAt: Kryptonian.Kalel.date({
            message: "Response object should have a property createdAt that is a date",
            rules: []
          }),
          name: Kryptonian.Kalel.string({
            message: "Response object should have a property name that is a string",
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

const router = Kryptonian.Jorel.createServerRouter({
  clients: ["http://localhost:5173"],
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

const client = Kryptonian.Jorel.createClientRoutes({
  server: "http://localhost:8000",
  routes
});

export interface Inhabitant {
  name: string,
  createdAt: Date
}

export const App = () => {
  const [kryptonians, setKryptonians] = React.useState<Array<Inhabitant>>([]);

  React.useEffect(() => {
    client.getKryptonians({
      parameters: null,
      options: {}
    }).then(kryptonians => {
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

[Back to summary](#summary)

## API

### createProtector

Create a protection function helping you validate data according to the schema passed as argument. Unless you type check that the `success` property is true or false, you do not get access to the `data` property. This prevents unintentional access when there might be an error, protecting your from making mistakes in your source-code.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
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

[Back to summary](#summary)

### literal

`literal` is a function that will create a `LiteralSchema<Value>` that can validate values that are exactly equal to the value that you'll pass. Beware, literal values works well for scalar data types that can be compared with each others like `string` or `boolean`, but not so well for `array` and `object` since they are compared by references.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.literal({
  message: "This should be true",
  value: true as const
}));

const goodData: unknown = true;
const badData: unknown = false;

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
    "message": "This should be true"
  }
]
```

Beware, if you use this in a server, you should use the `as const` keyword in order to create literal values instead of plain values.

```typescript
import * as Kryptonian from "kryptonian";
import { routes } from "./routes";

export const router = Kryptonian.Jorel.createServerRouter({
  getKryptonians: async () => {
    return [
      {
        success: true as const, // Instead of just "true"
        name: "Kalel"
      }
    ];
  }
});
```

[Back to summary](#summary)

### boolean

Boolean is a schema representing a value that can either be true or false.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.boolean({
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

[Back to summary](#summary)

### none

None is a schema representing a value that can be null.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.none({
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

[Back to summary](#summary)

### notDefined

NotDefined is a schema representing a value that can be undefined.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.notDefined({
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

[Back to summary](#summary)

### string

`string` is a schema representing a string.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
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

[Back to summary](#summary)

#### length

Validate that a string has exactly a given length.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not a string",
  rules: [
    Kryptonian.Kalel.String.length({
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

[Back to summary](#summary)

#### minimumLength

Validate that a string has a minimum length.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.String.minimumLength({
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

[Back to summary](#summary)

#### includes

Validate that a string is included in another one.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.String.includes({
      string: "type",
      message: "This should be a string with the word type"
    })
  ]
}));

const goodData: unknown = "typescript";
const wrongData: unknown = "javascript";

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
"typescript"
[
  {
    "path": "",
    "message": "This should be a string with the word type"
  }
]
```

[Back to summary](#summary)

#### startsWith

Validate that a string is starting with another one.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.String.startsWith({
      string: "type",
      message: "This should be a string starting with the word type"
    })
  ]
}));

const goodData: unknown = "typescript";
const wrongData: unknown = "javascript";

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
"typescript"
[
  {
    "path": "",
    "message": "This should be a string starting with the word type"
  }
]
```

[Back to summary](#summary)

#### endsWith

Validate that a string is ending with another one.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.String.endsWith({
      string: "script",
      message: "This should be a string ending with the word script"
    })
  ]
}));

const goodData: unknown = "typescript";
const wrongData: unknown = "typeform";

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
"typescript"
[
  {
    "path": "",
    "message": "This should be a string ending with the word script"
  }
]
```

[Back to summary](#summary)

#### email

Validate that a string is a valid email.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not a string",
  rules: [
    Kryptonian.Kalel.String.email({
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

[Back to summary](#summary)

#### uniformResourceLocator

Validate that a string is a valid url.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not a string",
  rules: [
    Kryptonian.Kalel.String.uniformResourceLocator({
      message: "This should be a valid URL"
    })
  ]
}));

const goodData: unknown = "https://krypton.dev";
const wrongData: unknown = "https:/krypton.dev";

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
"https://krypton.dev"
[
  {
    "path": "",
    "message": "This should be a valid URL"
  }
]
```

[Back to summary](#summary)

#### internetProtocolVersion4

Validate that a string is a valid Internet Protocol version 4 format.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.String.internetProtocolVersion4({
      message: "This should be a valid IPv4 address"
    })
  ]
}));

const goodData: unknown = "1.2.3.4";
const wrongData: unknown = "1.2.3";

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
"1.2.3.4"
[
  {
    "path": "",
    "message": "This should be a valid IPv4 address"
  }
]
```

[Back to summary](#summary)

#### internetProtocolVersion4WithClasslessInterDomainRouting

Validate that a string is a valid Internet Protocol version 4 with classless inter-domain routing format.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.string({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.String.internetProtocolVersion4WithClasslessInterDomainRouting({
      message: "This should be a valid IPv4 address with CIDR"
    })
  ]
}));

const goodData: unknown = "1.2.3.4/16";
const wrongData: unknown = "1.2.3/32";

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
"1.2.3.4/16"
[
  {
    "path": "",
    "message": "This should be a valid IPv4 address with CIDR"
  }
]
```

[Back to summary](#summary)

### number

`number` is a schema representing a number.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
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

[Back to summary](#summary)

#### between

Validate that a number is between two values.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.between({
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

[Back to summary](#summary)

#### divisibleBy

Validate that a number can be divided by another number without remaining value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.divisibleBy({
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

[Back to summary](#summary)

#### notDivisibleBy

Validate that a number cannot be divided by another number without remaining value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.notDivisibleBy({
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

[Back to summary](#summary)

#### even

Validate that a number is even.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.even({
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

[Back to summary](#summary)

#### odd

Validate that a number is odd.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.odd({
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

[Back to summary](#summary)

#### positive

Validate that a number is positive.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.positive({
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

[Back to summary](#summary)

#### negative

Validate that a number is negative.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.negative({
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

[Back to summary](#summary)

#### integer

Validate that a number is integer

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.integer({
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

[Back to summary](#summary)

#### greater

Validate that a number is greater than another value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.greater({
      number: 5,
      message: "This should be greater than 5"
    })
  ]
}));

const goodData: unknown = 15;
const wrongData: unknown = 2;

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
    "message": "This should be greater than 5"
  }
]
```

[Back to summary](#summary)

#### lower

Validate that a number is lower than another value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.lower({
      number: 5,
      message: "This should be lower than 5"
    })
  ]
}));

const goodData: unknown = 2;
const wrongData: unknown = 15;

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
2
[
  {
    "path": "",
    "message": "This should be lower than 5"
  }
]
```

[Back to summary](#summary)

#### greaterOrEqual

Validate that a number is greater or equal to another value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.greaterOrEqual({
      number: 5,
      message: "This should be greater or equal to 5"
    })
  ]
}));

const goodData: unknown = 5;
const wrongData: unknown = 2;

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
5
[
  {
    "path": "",
    "message": "This should be greater or equal to 5"
  }
]
```

[Back to summary](#summary)

#### lowerOrEqual

Validate that a number is greater or equal to another value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.lowerOrEqual({
      number: 5,
      message: "This should be lower or equal to 5"
    })
  ]
}));

const goodData: unknown = 5;
const wrongData: unknown = 7;

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
5
[
  {
    "path": "",
    "message": "This should be lower or equal to 5"
  }
]
```

[Back to summary](#summary)

#### finite

Validate that a number is finite.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.number({
  message: "This is not a number",
  rules: [
    Kryptonian.Kalel.Number.finite({
      message: "This should be finite"
    })
  ]
}));

const goodData: unknown = 5;
const wrongData: unknown = Infinity;

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
5
[
  {
    "path": "",
    "message": "This should be finite"
  }
]
```

[Back to summary](#summary)

### date

Date is a schema representing a date object.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.date({
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
"Thu Feb 02 2023 03:04:05 GMT+0100"
"Sun Nov 19 2023 14:32:34 GMT+0100"
[
  {
    "path": "",
    "message": "This should be a date"
  }
]
```

[Back to summary](#summary)

#### between

Validate that a date is between two dates.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.date({
  message: "This should be a date",
  rules: [
    Kryptonian.Kalel.Date.between({
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
"Sun Jan 01 2023 00:00:00 GMT+0100"
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

[Back to summary](#summary)

#### before

Validate that a date is before a given date.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.date({
  message: "This should be a date",
  rules: [
    Kryptonian.Kalel.Date.before({
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
"Sun Jan 01 2023 00:00:00 GMT+0100"
[
  {
    "path": "",
    "message": "This should be a date before 01/01/2025"
  }
]
```

[Back to summary](#summary)

#### after

Validate that a date is after a given date.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.date({
  message: "This should be a date",
  rules: [
    Kryptonian.Kalel.Date.after({
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
"Sun Jan 01 2023 00:00:00 GMT+0100"
[
  {
    "path": "",
    "message": "This should be a date after 01/01/2021"
  }
]
```

[Back to summary](#summary)

### object

`object` is a schema representing an object.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.object({
  message: "This is not an object",
  fields: {
    email: Kryptonian.Kalel.string({
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

[Back to summary](#summary)

### array

`array` is a schema representing an array

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.array({
  message: "This is not an array",
  rules: [],
  schema: Kryptonian.Kalel.string({
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

[Back to summary](#summary)

#### length

Validate the length of a array.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.array({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.Array.length({
      length: 3,
      message: "This should be an array of 3 elements"
    })
  ],
  schema: Kryptonian.Kalel.string({
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

[Back to summary](#summary)

#### lengthBetween

Validate that the length of a array is between a range.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.array({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.Array.lengthBetween({
      minimum: 2,
      maximum: 3,
      message: "This should be an array of 2 to 3 elements"
    })
  ],
  schema: Kryptonian.Kalel.string({
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

[Back to summary](#summary)

#### minimumLength

Validate that the length of a array is above a value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.array({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.Array.minimumLength({
      minimum: 2,
      message: "This should be an array of at least 2 elements"
    })
  ],
  schema: Kryptonian.Kalel.string({
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

[Back to summary](#summary)

#### maximumLength

Validate that the length of a array is above a value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.array({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.Array.maximumLength({
      maximum: 2,
      message: "This should be an array of at most 2 elements"
    })
  ],
  schema: Kryptonian.Kalel.string({
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

[Back to summary](#summary)

#### nonEmpty

Validate that the length of a array is above 0.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.array({
  message: "This is not an array",
  rules: [
    Kryptonian.Kalel.Array.nonEmpty({
      message: "This should be an array of at least 1 element"
    })
  ],
  schema: Kryptonian.Kalel.string({
    message: "This is not a string",
    rules: []
  })
}));

const goodData: unknown = [ "Hello", "world" ];

const wrongData: unknown = [];

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
    "message": "This should be an array of at least 1 element"
  }
]
```

[Back to summary](#summary)

### unknown

Unknown is a schema representing a TypeScript unknown value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.unknown());

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

[Back to summary](#summary)

### any

Unknown is a schema representing a TypeScript any value.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.any());

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

[Back to summary](#summary)

### empty

`empty` is a schema representing the `void` value in TypeScript. Any value that is `undefined` is allowed in this schema. Also, if validating function arguments, `void` represent the absence of value, so you can also omit the value in this schema.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.empty({
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

[Back to summary](#summary)

### oneOf

`oneOf` is a function that returns a `OneOfSchema<Schema>` that helps you validate a union of multiple things, very useful to return multiple types at once and have the client validate them.

For instance, you may want to return multiple business errors without the fear of changing anything and desynchronizing your client application and your server application. Returning business errors this way is a very powerful way of discriminating errors and preventing logic errors.

```typescript
import * as Kryptonian from "kryptonian";

const protect = Kryptonian.Kalel.createProtector(Kryptonian.Kalel.oneOf([
  Kryptonian.Kalel.object({
    message: "This should be an object",
    fields: {
      success: Kryptonian.Kalel.literal({
        value: true as const,
        message: "This should be true"
      }),
      message: Kryptonian.Kalel.string({
        message: "This should be a string",
        rules: []
      })
    }
  }),
  Kryptonian.Kalel.object({
    message: "This should be an object",
    fields: {
      success: Kryptonian.Kalel.literal({
        value: false as const,
        message: "This should be false"
      }),
      error: Kryptonian.Kalel.string({
        message: "This should be a string",
        rules: []
      })
    }
  })
]));

const data: unknown = {
  success: true,
  message: "Successfully added the user in database"
};

const anotherData: unknown = {
  success: false,
  error: "Username is already taken"
}

const protection = protect(data);
const anotherProtection = protect(anotherData);

if (protection.success) {
  if (protection.data.success) {
    console.log(protection.data.message);
  } else {
    protection.data.error;
  }
} else {
  console.log(protection.errors);
}

if (anotherProtection.success) {
  if (anotherProtection.data.success) {
    console.log(anotherProtection.data.message);
  } else {
    console.log(anotherProtection.data.error)
  }
} else {
  console.log(anotherProtection.errors);
}
```

```json
"Successfully added the user in database"
"Username is already taken"
```

[Back to summary](#summary)

### Jorel

Jorel is the name of the client/server technology that is inherent to the Kryptonian library. With it, you can define a server and a client that sends data to each other in a pure, functional and safe way.

[Back to summary](#summary)

#### createRoutes

createRoutes is a function that will help you define the shape of your server using a validation schema.

```typescript
import * as Kryptonian from "kryptonian";

const routes = Kryptonian.Kalel.Jorel.createRoutes({
  createKryptonian: {
    request: Kryptonian.Kalel.object({
      message: "This should be a object",
      fields: {
        name: Kryptonian.Kalel.string({
          message: "Name is not a string",
          rules: []
        })
      }
    }),
    response: Kryptonian.Kalel.string({
      rules: [],
      message: "Expected a string as the response"
    })
  },
  getKryptonians: {
    request: Kryptonian.Kalel.none({
      message: "Expected nothing except null"
    }),
    response: Kryptonian.Kalel.array({
      message: "Response is not a array",
      rules: [],
      schema: Kryptonian.Kalel.string({
        message: "Response is not a array of string",
        rules: []
      })
    })
  }
});
```

[Back to summary](#summary)

#### createServerRouter

`createServerRouter` is a function that will take as input your server, and will let your define an implementation for the latter. Once it has been created, it must be fed to an adapter that can turn an abstract response into a concrete HTTP response.

```typescript
import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";
import { getKryptonians } from "./routes/getKryptonians";
import { createKryptonian } from "./routes/createKryptonian";
import { createHttpServer } from "./adapters/createHttpServer";

const router = Kryptonian.Jorel.createServerRouter({
  routes,
  spaceships: {
    getKryptonians,
    createKryptonian
  }
});

const server = createHttpServer({
  router,
  clients: ["http://localhost:5173"]
});

server.listen(8000, "0.0.0.0", () => {
  console.log("Spaceship launched and ready for communications");
});
```

Adapters are function that take a router (just like the `createHttpServer` function above) and will receive each requests from the client applications. Whenever a request has been made, the adapter transform the request into an abstraction that can be understood by the router, and will get back an abstract response that can be turned into a concrete HTTP response.

You can of course create your own adapter to support your favorite HTTP library. Here is an example of an adapter for the built-in `http` module.

```typescript
import * as Kryptonian from "kryptonian";
import * as Http from "http";
import * as Path from "path";

/**
 * Options used to create the HTTP server's router adapter
 */
export type CreateHttpServerOptions = {
  /**
   * The router created using the Kryptonian.Jorel.createServerRouter function
   */
  router: Kryptonian.Jorel.Router,
  /**
   * A list of clients that must be allowed to request the server when in a browser
   */
  clients: Array<string>
}

/**
 * Create an adapter for the Router using the Node.js built-in HTTP module
 */
export const createHttpServer = ({ clients, router }: CreateHttpServerOptions) => {
  const getJsonBody = (request: Http.IncomingMessage) => {
    return new Promise<JSON>((resolve, reject) => {
      let body = "";

      request.on("data", chunk => {
        body += chunk;
      });

      request.on("end", () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (error) {
          resolve(undefined);
        }
      });

      request.on("error", (error) => {
        reject(new Error(String(error)));
      });
    });
  };

  return Http.createServer(async (request, response) => {
    const url = new URL(Path.join("http://localhost/", request.url ?? ""));
    const origin = request.headers.origin ?? "";
    const path = url.pathname;
    const method = request.method ?? "GET";
    const foundClient = clients.find(client => origin === client) ?? "";

    const baseHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Origin": foundClient
    };

    try {
      const body = await getJsonBody(request);

      const routerResponse = await router({
        body,
        origin,
        method,
        path
      });

      const routerResponseHeadersWithBaseHeaders = {
        ...routerResponse.headers,
        ...baseHeaders
      };

      response
        .writeHead(routerResponse.status, routerResponseHeadersWithBaseHeaders)
        .end(JSON.stringify(routerResponse.body));
    } catch (error) {
      response
        .writeHead(500, baseHeaders)
        .end(JSON.stringify({
          success: false,
          errors: [
            {
              path: "",
              message: String(error)
            }
          ]
        }));
    }
  });
};
```

You can find examples of adapters in the [`template/server/apdaters`](./template/server/adapters) folder.

[Back to summary](#summary)

#### createServerRoute

`createServerRoute` is a functon that will help you break down the routes implementations into smaller route that you can easily export.

```typescript
import * as Kryptonian from "kryptonian";

const routes = Kryptonian.Jorel.createRoutes({
  getUsers: {
    request: Kryptonian.Kalel.object({
      message: "Request should be an object",
      fields: {
        since: Kryptonian.Kalel.date({
          message: "Request should contain a property since of type Date",
          rules: []
        })
      }
    }),
    response: Kryptonian.Kalel.array({
      message: "Response should be an array",
      rules: [],
      schema: Kryptonian.Kalel.string({
        message: "Response should be an array of strings",
        rules: []
      })
    })
  }
});
```

```typescript
import * as Kryptonian from "kryptonian";
import { routes } from "./routes";

export const getUsers = Kryptonian.Jorel.createServerRoute({
  routes,
  route: "getUsers",
  response: async ({ since }) => {
    return [
      "Kalel",
      "Zorel",
      "Jorel"
    ]
  }
});
```

```typescript
import * as Kryptonian from "kryptonian";
import * as Http from "http";
import { routes } from "./routes";
import { getUsers } from "./routes/getUsers";

const router = Kryptonian.Jorel.createServerRouter({
  routes,
  clients: [
    "http://localhost:5173"
  ],
  spaceships: {
    getUsers
  }
});

const server = Http.createServer(router);

server.listen(8000, "0.0.0.0", () => {
  console.log("Spaceships launched and ready for communications!");
});
```

#### createClientRoutes

`createClientRoutes` is a function that will help you request informations from the server. It implements the `Fetch` Web API, and we intend on adding support for more HTTP libraries such as Axios for instance. Each time you request something, it will pick-up the validation schema and forces you to use this schema for all your request, preventing mistakes even if you decide to update the schema. When receiving the body, data validation is also applied, so that you can't mess up manipulating data that is not validated yet.

```tsx
import * as React from "react";
import * as Kryptonian from "kryptonian";
import { routes } from "./routes";

const client = Kryptonian.Jorel.createClientRoutes({
  server: "http://localhost:8000",
  routes
});

export const Component = () => {
  const [kryptonian, setKryptonian] = useState("");
  const [kryptonians, setKryptonians] = React.useState<Array<string>>([]);

  const updateKryptonian: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
    setKryptonian(event.target.value);
  }, []);

  const getKryptonians = React.useCallback(() => {
    client.getKryptonians({
      parameters: null,
      options: {}
    }).then(kryptonian => {
      setKryptonians(kryptonian);
    }).catch(() => {
      if (error instanceof Kryptonian.Jorel.BadRequestError) {
        console.log(error.errors);

        return alert("Bad request, please check your form");
      } 

      if (error instanceof Kryptonian.Jorel.BadResponseError) {
        console.log(error.errors);

        return alert("Bad response from the server, please try again later.");
      }

      alert("Unknown error, sorry for the inconvenience!");
    });
  }, []);

  const createKryptonian: React.FormEventHandler = React.useCallback(event => {
    event.preventDefault();

    client.createKryptonian({
      parameters: {
        name: kryptonian
      },
      options: {}
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

const client = Kryptonian.Jorel.createClientRoutes({
  server: "http://localhost:8000",
  routes
});

const kryptonian = Vue.ref("");
const kryptonians = Vue.ref<Array<string>>([]);

const updateKryptonian = (event: EventTarget) => {
  kryptonian.value = event.target.value;
};

const getKryptonians = () => {
  client.getKryptonians({
    parameters: null,
    options: {}
  }).then(kryptonian => {
    setKryptonians(kryptonian);
  }).catch(error => {
    if (error instanceof Kryptonian.Jorel.BadRequestError) {
      console.log(error.errors);

      return alert("Bad request, please check your form");
    } 

    if (error instanceof Kryptonian.Jorel.BadResponseError) {
      console.log(error.errors);

      return alert("Bad response from the server, please try again later.");
    }

    alert("Unknown error, sorry for the inconvenience!");
  });
};

const createKryptonian = (event: FormEvent) => {
  event.preventDefault();

  client.createKryptonian({
    parameters: {
      name: kryptonian.value
    },
    options: {}
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

[Back to summary](#summary)

#### getting started

You can start writing client & server applications right away by using the template folder.

Here is how you can get this template to get started developing locally.

```bash
npx degit aminnairi/kryptonian/template#production my-project
cd my-project
# read the README.md!
```

Where `production` is the branch to use. We recommend starting from the `production` branch since it is the most stable branch for using this template, but you can use any branches from the GitHub repository as well as tags.

Here is an example using the `2.0.0` release tag for demonstration purposes.

```bash
npx degit aminnairi/kryptonian/template#2.0.0 my-project
cd my-project
# read the README.md!
```

Be sure to install the package for all workspaces inside the template using the following command before starting the servers.

Here again, using the `2.0.0` release tag for demonstration purposes.

```bash
npm --workspaces install kryptonian@2.0.0
```

[Back to summary](#summary)

### InferType

`InferType` helps you get the underlying TypeScript type of a schema.

```typescript
import * as Kryptonian from "kryptonian";

const schema = Kryptonian.Kalel.array({
  message: "This should be an array",
  rules: [],
  schema: Kryptonian.Kalel.string({
    message: "This should be an array of strings",
    rules: []
  })
});

type Schema = Kryptonian.InferType<typeof schema>;
// string[]

const anotherSchema = Kryptonian.Kalel.object({
  message: "This should be an object",
  fields: {
    email: Kryptonian.Kalel.string({
      message: "Field email should be a string"
    }),
    administrator: Kryptonian.Kalel.boolean({
      message: "Field administrator should be a boolean"
    })
  }
});

type AnotherSchema = Kryptonian.Kalel.InferType<typeof anotherSchema>;
// { email: string, administrator: boolean }
```

[Back to summary](#summary)

### Custom rules

A rule is a function that is applied in most functions exposed by this library. Every time you see a function taking a `rules` properties as its argument, it means that it is accepting an array of rules. In fact, creating custom rules would be exactly the same as the rules defined by this library. Here is for instance the source-code for the `Kyrptonian.Kalel.Array.length` rule.

```typescript
export interface LengthOptions {
  length: number,
  message: string
}

export const length = ({ length, message }: LengthOptions): ArrayRule => {
  return {
    message,
    valid: value => value.length === length
  };
};
```

And here is another example featuring the `Kryptonian.Kalel.String.minimumLength` rule.

```typescript
export interface MinimumLengthOptions {
  minimum: number,
  message: string
}

export const minimumLength = ({ minimum, message }: MinimumLengthOptions): StringRule => {
  return {
    message,
    valid: value => value.length >= minimum
  }
}
```

As you probably guessed, a rule is a function. And those functions must return a rule. There as several rules that you can return and for each type that is exposed (`Kryptonian.Kalel.Array`, `Kryptonian.Kalel.String`, ...) there is an associated rule that you can import.

Here is a non-exhaustive list of rules, and many more to come in a near future.

```typescript
import * as Kryptonian from "kryptonian";

Kryptonian.Kalel.StringRule; // For strings
Kryptonian.Kalel.NumberRule; // For numbers
Kryptonian.Kalel.ArrayRule; // For arrays
Kryptonian.Kalel.DateRule; // For dates
```

Every rule is a pure function, meaning it should take an argument (you can also choose not to accept any argument such as the `Kryptonian.Kalel.String.email` rule) and must return a rule. There is no mutation nor effect that is going on in a rule, bringing guarantees and robustness to the library itself. In fact, every function exposed (except for `Jorel.createClientRoutes` and `Jorel.createServerRouter`) is a pure function and will not imply side-effects of any kind.

Here is an example of a rule that you might want to create to valide that a user's age is in legal compliance with your business domain.

```typescript
import * Kryptonian from "kryptonian";

export interface ValidAgeOptions {
  message: string
}

export const validAge = ({ message }: ValidAgeOptions): Kryptonian.Kalel.NumberRule => {
  return {
    message,
    valid: age => age >= 18 && age <= 60
  }
};
```

As you can see, here we can validate that the age of a user is between `18` and `60` (those are abritrary values, of course this would be different from an application to another).

One important thing to note here is that you don't have to type yourself the value of the `age` variable in this case, the `NumberRule` is here to ensure that it is always a `number` type.

What would happen if you use the wrong rule? Let's find out.

```typescript
import * as Kryptonian from "kryptonian";

export interface ValidAgeOptions {
  message: string
}

export const validAge = ({ message }: ValidAgeOptions): Kryptonian.Kalel.StringRule => {
  return {
    message,
    valid: age => age >= 18 && age <= 60
    // Operator '>=' cannot be applied to types 'string' and 'number'.ts(2365)
    // Operator '<=' cannot be applied to types 'string' and 'number'.ts(2365)
  }
};
```

We added a comment to help you understand this code without having to test it yourself (but you are encouraged to do so!). As you can see, there is no way we can make a mistake by comparing a `string` with a `number` here since now that we replaced `Kryptonian.Kalel.NumberRule` with `Kryptonian.Kalel.StringRule`, the `age` value is typed as a `string`, not a `number`. Hence the error we got in the comment below the comparison.

That's it! There is nothing more to know about custom rules and it is very trivial and easy to create its own. 

More validation are yet to be brought with each and every future releases of this library, and if you don't find your use-case in those, you can probably be off creating your own custom rule in no time!

[Back to summary](#summary)

## Issues

See [`issues`](./issues).

[Back to summary](#summary)

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

[Back to summary](#summary)

## Code of conduct

See [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

[Back to summary](#summary)

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

[Back to summary](#summary)

## License

See [`LICENSE`](./LICENSE).

[Back to summary](#summary)

## Security

See [`SECURITY.md`](./SECURITY.md).

[Back to summary](#summary)