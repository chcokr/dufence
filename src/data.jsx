import md5 from 'md5';

// TODO: not sure why this is necessary here, but it is, for Safari
require('babel/polyfill');

export function getNewGame(
    menOpponentSchoolId,
    womenOpponentSchoolId,
    dateInstance) {
  return {
    date: dateInstance,
    id: md5(
      menOpponentSchoolId +
      womenOpponentSchoolId +
      dateInstance.toUTCString()),
    men: getNewScoreBoardState(menOpponentSchoolId),
    menOpponentSchoolId,
    women: getNewScoreBoardState(womenOpponentSchoolId),
    womenOpponentSchoolId
  };
}

function getNewScoreBoardState(otherSchoolId) {
  return {
    otherSchoolId,
    scores: {
      foil: [0, 0],
      epee: [0, 0],
      saber: [0, 0]
    }
  };
}
