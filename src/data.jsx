import md5 from 'md5';

export function getNewGame(
    gender,
    opponentSchoolId,
    dateUtcMillisec) {
  return {
    date: dateUtcMillisec,
    id: md5(
      gender +
      opponentSchoolId +
      dateUtcMillisec),
    [gender]: getNewScoreBoardState(opponentSchoolId)
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
