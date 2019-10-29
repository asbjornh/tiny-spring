import Spring from '../spring';

const box = document.getElementById('box');
const button = document.getElementById('button');

const spring = Spring(100);

spring.onUpdate(val => {
  box.style.transform = `translateX(${val}px) rotate(${val / 3}deg)`;
});

let value = 0;
button.addEventListener('click', () => {
  value = value === 0 ? 300 : 0;
  spring.transitionTo(value);
});
