const test = require('ava');

global.requestAnimationFrame = func => setTimeout(func, 16);
global.cancelAnimationFrame = id => clearTimeout(id);

// NOTE: Import from built source rather than source
const Spring = require('./index').default;

test("Can be new'ed", t => {
  const spring = new Spring();
  t.is(true, spring instanceof Spring);
});

test('Initial value', t => {
  const spring = new Spring(100);
  t.is(100, spring.position);
});

test.cb('Config', t => {
  const s1 = new Spring(0);
  const s2 = new Spring(0, { stiffness: 500 });
  const s3 = new Spring(0, { damping: 40 });
  const s4 = new Spring(0, { precision: 20 });

  s1.transitionTo(100);
  s2.transitionTo(100);
  s3.transitionTo(100);
  s4.transitionTo(100);

  setTimeout(() => {
    t.not(s1.position, s2.position);
    t.not(s1.position, s3.position);
    t.not(s1.position, s4.position);
    t.end();
  }, 500);
});

test('setValue', t => {
  const spring = new Spring();
  t.is(0, spring.position);
  spring.setValue(100);
  t.is(100, spring.position);
});

test.cb('transitionTo', t => {
  const spring = new Spring();
  spring.transitionTo(100);

  setTimeout(() => {
    t.is(true, spring.position > 0);

    setTimeout(() => {
      t.is(100, spring.position);
      t.end();
    }, 2000);
  }, 500);
});

test.cb('onUpdate', t => {
  const spring = new Spring();
  const endValue = 100;
  let values = [];
  spring.onUpdate(v => (values = values.concat(v)));

  spring.transitionTo(endValue);

  // NOTE: 50 values is very arbitrary and might need to be adjusted if tests fail
  setTimeout(() => {
    t.is(true, values.length > 50);
    t.is(true, values.every(v => typeof v === 'number'));
    t.is(true, values[0] !== values[1]);
    t.is(true, values.slice(-1)[0] === endValue);
    t.end();
  }, 2000);
});
