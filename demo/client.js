import Spring from '../spring.ts';

const box = document.getElementById('box');
const button = document.getElementById('button');

const spring = Spring(100);

spring.onUpdate(val => {
  box.style.transform = `translateX(${val}px) rotate(${val / 3}deg)`;
});

spring.onRest(() => {
  console.log('spring completed!');
});

let value = 0;
button.addEventListener('click', () => {
  value = value === 0 ? 300 : 0;
  spring.transitionTo(value);
});

const box2 = document.getElementById('box2');
const spring2 = Spring(0, { stiffness: 50 });

spring2.onUpdate(val => {
  box2.style.transform = `translateX(${val}px)`;
});

spring2.onRest(() => {
  console.log('spring2 completed!');
});

window.addEventListener('mousemove', e => {
  spring2.transitionTo(e.clientX);
});
