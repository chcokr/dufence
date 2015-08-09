import {getNewGame} from './data';

const Baobab = require('baobab');

const appStateTree = new Baobab({
  games: normalize([
    getNewGame('Cleveland St.', new Date(2015, 7, 20)),
    getNewGame('Notre Dame', new Date(2015, 7, 20)),
    getNewGame('UNC', new Date(2015, 7, 21))
  ])
});
export default appStateTree;

function normalize(arr) {
  let rtn = {};

  for (let item of arr) {
    rtn[item.id] = item;
  }

  return rtn;
}
