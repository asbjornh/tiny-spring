import Spring from '../source/spring';

const spring = new Spring();

const box = document.getElementById('box');
const button = document.getElementById('button');

spring.onUpdate(val => {
  box.style.transform = `translateX(${val}px) rotate(${val / 3}deg)`;
});

let value = 0;
button.addEventListener('click', () => {
  value = value === 0 ? 300 : 0;
  spring.setEndValue(value);
});
