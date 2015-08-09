import appStateTree from '../appStateTree';
import ScoreBoard from '../components/ScoreBoard';

import {branch} from 'baobab-react/higher-order';
import React from 'react';
import {Navigation} from 'react-router';
import style from 'stilr-classnames';

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

  componentWillMount() {
    const {games, id, team} = this.props;

    if (!games[id] || !games[id][team]) {
      this.replaceWith('/');
    }
  },

  render() {
    const {games, id, schools, team} = this.props;

    const game = games[id];

    if (!game) {
      return null;
    }

    const otherSchoolName = schools[game[team].otherSchoolId].name;
    const scores = game[team].scores;

    return (
      <ScoreBoard
        otherSchoolName={otherSchoolName}
        scores={scores}
        onLeftScoreClick={(scoreType, curScore) => {
          appStateTree.set(
            ['games', id, team, 'scores', scoreType, 0],
            curScore + 1); }}
        onResetConfirm={this.onResetConfirm}
        onRightScoreClick={(scoreType, curScore) => {
          appStateTree.set(
            ['games', id, team, 'scores', scoreType, 1],
            curScore + 1); }} />
    );
  }
});

module.exports = branch(ScoreBoardContainer, {
  cursors: {
    games: ['games'],
    schools: ['schools']
  }
});
