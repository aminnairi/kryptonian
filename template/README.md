# template

## Requirements

- Node
- NPM

## Installation

```bash
npm install
npm --workspaces install kryptonian
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