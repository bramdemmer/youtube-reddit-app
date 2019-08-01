import '../scss/master.scss';
import component from '../components/component1/component';
import component2 from '../components/component2/component';
import '../../vue/index';

document.body.appendChild(component());


if (typeof component2 === 'function') {
  console.log(typeof component2);
}

console.log('logged!');

const fromTheFuture = async (args) => {
  const { a, b } = args;
  await console.log('hello form async', a, b);


  console.log('Done2.2');
};

fromTheFuture({ a: 1, b: 2 });


console.log(Array.from(document.querySelectorAll('div')));

console.log('foobar'.includes('foo'));
