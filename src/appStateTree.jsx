import {getNewGame} from './data';

import Firebase from 'firebase';

const Baobab = require('baobab');

const firebaseRef = new Firebase('https://dufence.firebaseio.com');

const schools = [
  {id: '96180bde96c85a137b9bbee3ec833a28', name: "Air Force"},
  {id: '4c14d27f92a23d73664dd121828b0e6d', name: "Boston College"},
  {id: 'ed63fc91500594c3086714f86b3001e4', name: "Brown"},
  {id: '498c39cd37bf6c260b965367caf4c8fe', name: "Cleveland State"},
  {id: 'bc65f426282a1a198804b1d7602b25d4', name: "Columbia"},
  {id: '43a9616a147c80fbefdfe2dbc988896c', name: "Cornell"},
  {id: '444db2256aaa6ca07d1148828a1bfd67', name: "Detroit Mercy"},
  {id: 'ef440c917120850336638d82fb323826', name: "Fairleigh Dickinson"},
  {id: '6808dd0e73ce8c42a097bc74c523775f', name: "Harvard"},
  {id: 'ce4bd51dc48091ddb7e42d5161ae307b', name: "Lafayette"},
  {id: '89dbc0c30c27a826ee9f65f2aabdb68c', name: "New Jersey Inst. Tech."},
  {id: '130c7ca8daccb66ef614ec3331a0f665', name: "North Carolina"},
  {id: 'de398df78a0ddcf4d410c41544aa26f8', name: "Northwestern"},
  {id: '2868c45828f1d11d82b5364e54164493', name: "Notre Dame"},
  {id: '8a816c3129a128dd79248e26ccd4547a', name: "Ohio State"},
  {id: '67d7f75fc8a73a5186bb3e1dc64d18e1', name: "Penn. State"},
  {id: '9d8f63a335335289bf4f4a330eafc64d', name: "Princeton"},
  {id: '9bd1bfc98a4ce4f61041711c478756f1', name: "Sacred Heart"},
  {id: '2ca60751d1e7be10fe662000c47ecc96', name: "St. John's"},
  {id: '45ebe6bd838f67040a398bf6fd40841d', name: "Stanford"},
  {id: '54026e80aeaf32220fe0b10441eaca0d', name: "Temple"},
  {id: '3bcae3162f73748824d193481c55df6d', name: "U Penn."},
  {id: '8313cfb88735f2109dd49e39e1345a67', name: "Yale"}
];

const appStateTree = new Baobab({
  games: {},
  schools: {}
});
export default appStateTree;

let firebaseLoadedYet = false;

firebaseRef.on('value', snapshot => {
  const val = snapshot.val();

  appStateTree.set('games', val.games);
  appStateTree.set('schools', val.schools);

  firebaseLoadedYet = true;
});

appStateTree.on('update', e => {
  if (!firebaseLoadedYet) {
    return;
  }

  const data = e.data.data;

  firebaseRef.set({
    games: data.games,
    schools: data.schools
  });
});

function normalize(arr) {
  let rtn = {};

  for (let item of arr) {
    rtn[item.id] = item;
  }

  return rtn;
}

function chooseRandomSchoolId() {
  return schools[Math.floor(Math.random() * schools.length)].id;
}
