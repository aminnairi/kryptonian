# Contributing

## Requirements

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

## Clone

```bash
git clone https://github.com/aminnairi/kryptonian
cd kryptonian
```

### Library

#### Install

```bash
npm install
```

#### Build

```bash
npm run build
```

### Template

```bash
cd template
```

#### Install

```bash
npm --workspaces install
```

#### Build

```bash
npm --workspaces run build
```

Or

```bash
npm --workspace shared run build
npm --workspace shared run server
npm --workspace shared run client
```

#### Development

```bash
npm --workspace shared run dev
npm --workspace shared run dev
npm --workspace shared run dev
```