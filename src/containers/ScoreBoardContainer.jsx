import appStateTree from '../appStateTree';
import ScoreBoard from '../components/ScoreBoard';

import {branch} from 'baobab-react/decorators';
import React from 'react';
import style from 'stilr-classnames';

@branch({
  cursors: {
    games: ['games'],
    schools: ['schools']
  }
})
export default class ScoreboardContainer extends React.Component {
  onResetConfirm = () => {
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
  };

  render() {
    const {games, id, schools, team} = this.props;

    const otherSchoolName = schools[games[id][team].otherSchoolId].name;
    const scores = games[id][team].scores;

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
}
