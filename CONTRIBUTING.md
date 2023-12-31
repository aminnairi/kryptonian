# Contributing

## Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Clone

```bash
git clone https://github.com/aminnairi/kryptonian
cd kryptonian
```

## Setup

```bash
cp .env.example .env
```

## Startup

```bash
docker compose up --detach
```

## Library

### Install

```bash
docker compose exec node npm install
```

### Development

```bash
docker compose exec node npm run dev
```

### Test

```bash
docker compose exec node npm test
```

### Coverage report

```bash
docker compose exec node npm run coverage
```

### Build

```bash
docker compose exec node npm run build
```

## Template

### Install

```bash
docker compose exec node npm --workspaces install
```

### Development

```bash
docker compose exec node npm --workspace template/shared run dev
docker compose exec node npm --workspace template/server run dev
docker compose exec node npm --workspace template/client run dev
```

### Build

```bash
docker compose exec node npm --workspaces run build
```

Or

```bash
docker compose node npm --workspace template/shared run build
docker compose node npm --workspace template/server run build
docker compose node npm --workspace template/client run build
```

## Publish

### Setup

Go on [npmjs.com](https://www.npmjs.com/) and login as a maintainer of the package. Create a publish key and add it to the `.npmrc` file.

```bash
touch .npmrc
```

```bash
//registry.npmjs.org/:_authToken=INSERTAUTHTOKENHERE
```

#### Build

```bash
docker compose exec node npm run build
```

#### Changelog

Add the necessary changelogs in the `CHANGELOG.md` file for the next release.

#### Package Version

Update the package version in the `package.json` file to reflect the new release.

#### Publish

```bash
docker compose exec node npm publish
```

## Shutdown

```bash
docker compose down --remove-orphans --volumes --timeout 0
```
