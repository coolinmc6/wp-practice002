import _ from 'lodash';
import './style.css';
import Map from './gray-map.gif';
import Data from './data.xml';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const map = new Image();
  map.src = Map;

  element.appendChild(map);

  console.log(Data);

  return element;
}

document.body.appendChild(component());