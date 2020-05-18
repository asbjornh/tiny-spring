# tiny-spring

[![npm version](https://img.shields.io/npm/v/tiny-spring)](https://npmjs.com/package/tiny-spring)
![](https://img.shields.io/badge/dependencies-zero-green)
![](https://img.shields.io/bundlephobia/min/tiny-spring)

Simple spring dynamics for physics-driven animations. Also it's tiny (2kB before minification and gzip).

```
npm install tiny-spring
```

This small library helps you interpolate values using [spring dynamics](https://en.wikipedia.org/wiki/Harmonic_oscillator). There's no DOM-stuff or framework specifics included so you can use it with whatever framework or library you want.

If you're using `React.js`, there is [use-spring-effect](https://www.npmjs.com/package/use-spring-effect) which uses `tiny-spring` internally.

## Browser support

`tiny-spring` uses `requestAnimationFrame`, so if you need to support older browsers make sure you use a polyfill.

## TLDR usage

```js
import Spring from 'tiny-spring';

const spring = Spring();
const element = document.getElementById('some-id');

spring.onUpdate(val => {
  element.style.transform = `translateX(${val}px)`;
});

// Set value to 50 without animating
spring.setValue(50);

// Transition from current value (50) to 100
spring.transitionTo(100);

// Transition again from whatever the current value is to 200
spring.transitionTo(200);

// Stop animation and remove callback
spring.destroy();
```

## API

### `Spring(initialValue: number, config: SpringConfig): spring`

A factory function that returns a new `spring` object.

### `SpringConfig (object)`

**`stiffness: number = 200`**

Stiffness controls how "fast" your animation will be. Higher values result in faster motion.

**`damping: number = 10`**

Damping controls how much friction is applied to the spring. You can think of this as how "wobbly" the resulting motion is. Lower values result in more wobblyness.

**`precision: number = 100`**

Used to determine when to stop animating. With a precision of `0` the spring will reach its end value immediately. With really high values it might keep animating fractions of a pixel for a long time. Tweak this value if animations end abruptly or linger for too long. When tweaking this value you'll want to make big changes in order to see an effect (like adding/removing zeros).

### `spring (object)`

**`onUpdate(fn: (val: number): void)`**

Add a callback which will be called every time the value of the spring changes.

**NOTE**: `spring` only supports one callback, so calling this method more than once results in previously attached callbacks being overwritten.

```js
spring.onUpdate(value => {
  /* do something with value */
});
```

**`setValue(value: number)`**

Set the value of the spring without animating.

**`transitionTo(value: number)`**

Start animating to `value` from the current value of the spring.

**`destroy()`**

Aborts animation and removes the callback.
