# kal-el

Unleash the power of "Kal-El," your trusted validation companion in the realm of software development. Inspired by the legendary Superman, this functional programming marvel brings hope and purity to the heart of your code, ensuring data integrity with the strength of a superhero. As "Kal-El" champions truth and justice in validation, beware the lurking presence of "Zod," its formidable opponent. Choose the superheroic reliability of "Kal-El" to fortify your projects against the challenges posed by the validation villain, "Zod," and elevate your coding experience with unwavering confidence.

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
```