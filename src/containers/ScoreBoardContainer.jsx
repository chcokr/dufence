import appStateTree from '../appStateTree';
import ScoreBoard from '../components/Scoreboard';
import history from '../history';
import {formatDate, removeBackslashesFromStringDate} from '../utils';

import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import qs from 'query-string';
import React from 'react';
import {Navigation} from 'react-router';

const ScoreBoardContainer = React.createClass({
  mixins: [Navigation],

  onResetConfirm() {
    const {games, id, team} = this.props;

    const scores = games[id][team].scores;

    for (let scoreType of Object.keys(scores)) {
      appStateTree.set(
        ['games', id, team, 'scores', scoreType, 0],
        0);
      appStateTree.set(
        ['games', id, team, 'scores', scoreType, 1],
        0);
    }
  },

  render() {
    const {canEdit, games, id, schools, team} = this.props;

    const queryParams = qs.parse(location.search);

    const gamesOnThisDate =
      _(games)
        .groupBy(game => {
          return formatDate(new Date(game.date));
        })
        .filter(gamesInDate => {
          const thisDate = formatDate(new Date(gamesInDate[0].date));
          return removeBackslashesFromStringDate(thisDate) === queryParams.date
        })
        .first();

    let gamesOnThisDateForSameTeam = !gamesOnThisDate ? [] :
      gamesOnThisDate.filter(game => game[team]);

    const game = games[id];

    const otherTeamGameId = queryParams[team === 'men' ? 'women' : 'men'];

    if (!game) {
      return (
        <ScoreBoard
          {...this.props}
          canEdit={canEdit}
          gamesOnThisDateForSameTeam={gamesOnThisDateForSameTeam}
          noGameSelected={true}
          otherTeamGameId={otherTeamGameId}
          schools={schools} />
      );
    }

    const otherSchoolName = schools[game[team].otherSchoolId].name;
    const scores = game[team].scores;

    return (
      <ScoreBoard
        {...this.props}
        canEdit={canEdit}
        date={game.date}
        otherSchoolName={otherSchoolName}
        scores={scores}
        onDateClick={() =>
          appStateTree.select('hideNavigation').apply(x => !x)}
        onLeftScoreClick={(scoreType, decrOrIncr, curScore) => {
          appStateTree.set(
            ['games', id, team, 'scores', scoreType, 0],
            curScore + (decrOrIncr === 'decr' ? -1 : 1)); }}
        onResetConfirm={this.onResetConfirm}
        onRightScoreClick={(scoreType, decrOrIncr, curScore) => {
          appStateTree.set(
            ['games', id, team, 'scores', scoreType, 1],
            curScore + (decrOrIncr === 'decr' ? -1 : 1)); }} />
    );
  }
});

module.exports = branch(ScoreBoardContainer, {
  cursors: {
    canEdit: ['canEdit'],
    dataReceivedYet: ['dataReceivedYet'],
    games: ['games'],
    schools: ['schools']
  }
});
