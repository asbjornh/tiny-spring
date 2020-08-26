const test = require('ava');

global.requestAnimationFrame = func => setTimeout(func, 16);
global.cancelAnimationFrame = id => clearTimeout(id);

const packageJson = require('./package.json');

// NOTE: Import from built source rather than source
const Spring = require(packageJson.main).default;

test('Initial value', t => {
  let value = 0;
  const spring = Spring(100);
  spring.onUpdate(v => (value = v));
  t.is(100, value);
});

test.cb('Config', t => {
  let v1 = 0;
  let v2 = 0;
  let v3 = 0;
  let v4 = 0;

  const s1 = Spring(0);
  const s2 = Spring(0, { stiffness: 500 });
  const s3 = Spring(0, { damping: 40 });
  const s4 = Spring(0, { precision: 0.01 });

  s1.onUpdate(v => (v1 = v));
  s2.onUpdate(v => (v2 = v));
  s3.onUpdate(v => (v3 = v));
  s4.onUpdate(v => (v4 = v));

  s1.transitionTo(100);
  s2.transitionTo(100);
  s3.transitionTo(100);
  s4.transitionTo(100);

  setTimeout(() => {
    t.not(v1, v2);
    t.not(v1, v3);
    t.not(v1, v4);
    t.end();
  }, 500);
});

test('setValue', t => {
  let value = 0;
  const spring = Spring();
  spring.onUpdate(v => (value = v));
  t.is(0, value);
  spring.setValue(100);
  t.is(100, value);
});

test.cb('transitionTo', t => {
  let value = 0;
  const spring = Spring();
  spring.onUpdate(v => (value = v));
  spring.transitionTo(100);

  setTimeout(() => {
    t.is(true, value > 0);

    setTimeout(() => {
      t.is(100, value);
      t.end();
    }, 2000);
  }, 500);
});

test.cb('onUpdate', t => {
  const spring = Spring();
  const endValue = 100;
  let values = [];
  spring.onUpdate(v => (values = values.concat(v)));

  spring.transitionTo(endValue);

  // NOTE: 50 values is very arbitrary and might need to be adjusted if tests fail
  setTimeout(() => {
    t.is(true, values.length > 50);
    t.is(true, values.every(v => typeof v === 'number'));
    t.not(values[0], values[1]);
    t.is(endValue, values.slice(-1)[0]);
    t.end();
  }, 2500);
});

test.cb('onRest', t => {
  const spring = Spring();
  let completed = false;

  spring.onRest(v => (completed = true));
  spring.transitionTo(10);

  setTimeout(() => {
    t.is(true, completed);
    t.end();
  }, 2000);
});
