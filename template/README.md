# template

## Requirements

- Node
- NPM

## Create project

```bash
npx degit aminnairi/kryptonian/template my-project
cd my-project
```

## Installation

```bash
npm install
```

## Development

### Shared

```bash
npm --workspace shared run build
```

### Server

```bash
npm --workspace server run dev
```

### Client

```bash
npm --workspace client run dev
```

## Production

```bash
npm --workspaces run build
```