import appStateTree from '../appStateTree';
import ScoreBoard from '../components/Scoreboard';

import {branch} from 'baobab-react/higher-order';
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

  componentWillUpdate() {
    const {dataReceivedYet, games, id, team} = this.props;

    if (dataReceivedYet && (!games[id] || !games[id][team])) {
      this.replaceWith('/');
    }
  },

  render() {
    const {canEdit, games, id, schools, team} = this.props;

    const game = games[id];

    if (!game) {
      return null;
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
