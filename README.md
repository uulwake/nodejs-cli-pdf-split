# Node.js CLI PDF Split

Split your PDF file from start page to end page.

## Getting Started

1. Install node.js v18 or greater
2. Download this repository
3. Open command prompt and cd to the repo
4. Run `npm i`
5. Run `node index.js split <filepath> --start=<start-page> --end=<end-page>`. For example `node index.js sbn.pdf --start=1 --end=20`
6. Output will be in folder `splits`

## Split

```bash
node index.js split <filepath> --start=<start-page> --end=<end-page>
```

Example

```bash
node index.js split sbn.pdf --start=1 --end=20
```

## Multiple Splits & Merge

```bash
node index.js split-merge <filepath> --pages=<start-page>-<end-page>,<start-page>-<end-page>
```

Example

```bash
node index.js split-merge sbn.pdf --pages=10-12,15-20
```
