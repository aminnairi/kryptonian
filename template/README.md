# template

## Requirements

- Node
- NPM

## Setup

Replace all occurrences of this string

```typescript
import * as Kryptonian from "../../";
```

By

```typescript
import * as Kryptonian from "kryptonian";
```

In these files

```
client/index.ts
server/index.ts
shared/index.ts
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