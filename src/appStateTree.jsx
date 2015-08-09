const Baobab = require('baobab');

const appStateTree = new Baobab({
  otherSchoolName: 'Cleveland St.',
  scores: {
    foil: [0, 0],
    epee: [0, 0],
    saber: [0, 0]
  }
});
export default appStateTree;
