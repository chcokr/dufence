const Baobab = require('baobab');

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

const appStateTree = new Baobab({
  curTeam: 'men',
  men: getNewScoreBoardState('Cleveland St.'),
  women: getNewScoreBoardState('Notre Dame')
});
export default appStateTree;
