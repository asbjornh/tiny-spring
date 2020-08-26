# Changelog

## 1.0.0

- No breaking changes (it seemed about time to properly semver this)
- Adds `onRest` callback

## 0.3.2

- Fixes typos and updates things in README.md

## 0.3.1

- Adds repo field to `package.json`

## 0.3.0

- Fixes fast, consecutive updates animating way too fast
- BREAKING: Inverts the magnitude of `precision`. Larger values now give greater precision. Default is now at `100` (which is more precise in practice than before). To convert old precision values, divide one by the old value:

```
const oldValue = 0.001;
const newValue = 1 / oldValue; // 100
```

## 0.2.1

- Fixes missing files!

## 0.2.0

- Refactors from class to function. `new` keyword is no longer necessary.
- Tinier! Now 2kB (600B gzipped), instead 4kB (1kB gzipped).
- Adds typescript definition file.
