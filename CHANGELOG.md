# Changelog

## Versions

- [`4.0.1`](#401)
- [`4.0.0`](#400)
- [`3.0.3`](#303)
- [`3.0.2`](#302)
- [`3.0.1`](#301)
- [`3.0.0`](#300)
- [`2.1.0`](#210)
- [`2.0.1`](#201)
- [`2.0.0`](#200)
- [`1.1.0`](#110)
- [`1.0.0`](#100)
- [`0.3.0`](#030)
- [`0.2.0`](#020)
- [`0.1.0`](#010)

## 4.0.1

- Fixed the installation the Kryptonian package inside the template workspaces ([#151](https://github.com/aminnairi/kryptonian/pull/151))
- Fixed the impossibility to access to the client app due to a misconfiguration of Docker Compose ([#154](https://github.com/aminnairi/kryptonian/pull/154))
- Fixed the usage to reflect the recent API changes ([#155](https://github.com/aminnairi/kryptonian/pull/155))
- Fixes instructions outdated & mistakes in the contribution guildelines ([#156](https://github.com/aminnairi/kryptonian/pull/156))

## 4.0.0

- Now using workspaces to ease the testing of the library locally ([#123](https://github.com/aminnairi/kryptonian/pull/123))
- Added way more comments for types & functions ([#124](https://github.com/aminnairi/kryptonian/pull/124))
- Added the ability to create its own router adapter for any HTTP library ([#130](https://github.com/aminnairi/kryptonian/pull/130))
- Added running the npm audit command in the continuous integration workflow ([#131](https://github.com/aminnairi/kryptonian/pull/131))
- Renamed the createClient function into createClientRoutes ([#132](https://github.com/aminnairi/kryptonian/pull/132))
- Renamed create router to create server router ([#133](https://github.com/aminnairi/kryptonian/pull/133))
- Renamed spaceships to implementation in the source-code, template & documentation ([#134](https://github.com/aminnairi/kryptonian/pull/134))
- Renamed pathway occurrences to implementation ([#135](https://github.com/aminnairi/kryptonian/pull/135))
- Updated contribution guildelines to include instructions on how to test the package ([#136](https://github.com/aminnairi/kryptonian/pull/136))
- Added a coverage report badge ([#137](https://github.com/aminnairi/kryptonian/pull/137))

## 3.0.3

- Fixed types not exported ([#112](https://github.com/aminnairi/kryptonian/pull/112))

## 3.0.2

- Fixed an issue with the createServerRoute function not exported properly (again) ([#110](https://github.com/aminnairi/kryptonian/pull/110))

## 3.0.1

- Fixed an issue with the createServerRoute function not exported properly ([#110](https://github.com/aminnairi/kryptonian/pull/110))

## 3.0.0

- Added a new function to help creating smaller implementation of the routes ([#102](https://github.com/aminnairi/kryptonian/pull/102))
- Renamed createServer in createRouter in the documentation ([#103](https://github.com/aminnairi/kryptonian/pull/103))
- Renamed numeric to number ([#104](https://github.com/aminnairi/kryptonian/pull/104))
- Renamed text to string ([#105](https://github.com/aminnairi/kryptonian/pull/105))
- More array rules ([#106](https://github.com/aminnairi/kryptonian/pull/106))
- Added more string rules ([#107](https://github.com/aminnairi/kryptonian/pull/107))
- Added more number rules ([#108](https://github.com/aminnairi/kryptonian/pull/108))

## 2.1.0

- Removed unecessary debug logs ([#89](https://github.com/aminnairi/kryptonian/pull/89))
- Marked this package as side-effects free ([#90](https://github.com/aminnairi/kryptonian/pull/90))
- Added a linter and an automation for pull request linting ([#91](https://github.com/aminnairi/kryptonian/pull/91))
- Added unit tests ([#94](https://github.com/aminnairi/kryptonian/pull/94))
- Added more instruction for getting started ([#96](https://github.com/aminnairi/kryptonian/pull/96))
- Initial path unknown schema accounted ([#97](https://github.com/aminnairi/kryptonian/pull/97))
- Added error handling examples in the documentation ([#98](https://github.com/aminnairi/kryptonian/pull/98))

## 2.0.1

- Client package kryptonian path fix ([#84](https://github.com/aminnairi/kryptonian/pull/84))

## 2.0.0

- Displaying the minzipped size of this package in the documentation ([#72](https://github.com/aminnairi/kryptonian/pull/72))
- Displaying the license in the documentation ([#73](https://github.com/aminnairi/kryptonian/pull/73))
- Added installation instructions ([#74](https://github.com/aminnairi/kryptonian/pull/74))
- Added a summary and backlinks to the summary for each sections ([#75](https://github.com/aminnairi/kryptonian/pull/75))
- Renamed endpoint to server in the createClient function's options ([#76](https://github.com/aminnairi/kryptonian/pull/76))
- Now allowing Fetch API's options in the client's actions ([#77](https://github.com/aminnairi/kryptonian/pull/77))
- Added multiple client support in createServer ([#78](https://github.com/aminnairi/kryptonian/pull/78))
- Renamed list to array ([#79](https://github.com/aminnairi/kryptonian/pull/79))
- Added a new namespace named Kalel for all core functions and types ([#81](https://github.com/aminnairi/kryptonian/pull/81))
- Renamed record to object ([#82](https://github.com/aminnairi/kryptonian/pull/82))

## 1.1.0

- Added a template and updated the instruction on how to get started with the client/server architecture ([#52](https://github.com/aminnairi/kryptonian/pull/52))
- Added void support ([#55](https://github.com/aminnairi/kryptonian/pull/55))
- Added support for dates ([#56](https://github.com/aminnairi/kryptonian/pull/56))
- Added InferType documentation ([#63](https://github.com/aminnairi/kryptonian/pull/63))
- Added documentation for custom rules ([#64](https://github.com/aminnairi/kryptonian/pull/64))
- More contribution guidelines ([#65](https://github.com/aminnairi/kryptonian/pull/65))
- Added literal values support ([#66](https://github.com/aminnairi/kryptonian/pull/66))
- Added one of support ([#67](https://github.com/aminnairi/kryptonian/pull/67))
- Added more keywords in the package definition file ([#68](https://github.com/aminnairi/kryptonian/pull/68))

## 1.0.0

- Module & CORS fixes ([#49](https://github.com/aminnairi/kryptonian/pull/49))

## 0.3.0

- Added unknown & any support ([#31](https://github.com/aminnairi/kryptonian/pull/31))
- Added boolean support ([#34](https://github.com/aminnairi/kryptonian/pull/34))
- Added null & undefined support ([#37](https://github.com/aminnairi/kryptonian/pull/37))
- Added support for Jorel, a library for creating HTTP servers & clients from a validation schema ([#44](https://github.com/aminnairi/kryptonian/pull/44))
- Updated the description in the documentation and package ([#46](https://github.com/aminnairi/kryptonian/pull/46))

## 0.2.0

- Updated the introduction in the README ([#7](https://github.com/aminnairi/kryptonian/pull/7))
- Added a badge with a link to the npm page of this package ([#8](https://github.com/aminnairi/kryptonian/pull/8))
- Added a typescript badge in the README ([#9](https://github.com/aminnairi/kryptonian/pull/9))
- Added a changelog file ([#10](https://github.com/aminnairi/kryptonian/pull/10))
- Added more informations in the package definition file ([#12](https://github.com/aminnairi/kryptonian/pull/12))
- Moved dependencies into development dependencies ([#13](https://github.com/aminnairi/kryptonian/pull/13))
- Stricter TypeScript configuration ([#15](https://github.com/aminnairi/kryptonian/pull/15))
- Added minimumLength, maximumLength & lengthBetween functions for lists ([#17](https://github.com/aminnairi/kryptonian/pull/17))
- Added more numeric rules ([#19](https://github.com/aminnairi/kryptonian/pull/19))
- Full api documentation ([#22](https://github.com/aminnairi/kryptonian/pull/22))
- Added tsdoc documentation ([#23](https://github.com/aminnairi/kryptonian/pull/23))

## 0.1.0

- Initial version
