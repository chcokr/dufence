const Baobab = require('baobab');
import md5 from 'md5';

function getNewScoreBoardState(otherSchoolName) {
  return {
    otherSchoolName,
    scores: {
      foil: [0, 0],
      epee: [0, 0],
      saber: [0, 0]
    }
  };
}

function getNewGame(otherSchoolName, dateInstance) {
  return {
    date: dateInstance,
    id: md5(otherSchoolName + dateInstance.toUTCString()),
    men: getNewScoreBoardState(otherSchoolName),
    otherSchoolName,
    women: getNewScoreBoardState(otherSchoolName)
  };
}

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
