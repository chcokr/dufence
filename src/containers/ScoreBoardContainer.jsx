import appStateTree from '../appStateTree';
import ScoreBoard from '../components/ScoreBoard';

import {branch} from 'baobab-react/decorators';
import React from 'react';
import style from 'stilr-classnames';

@branch({
  cursors: {
    games: ['games']
  }
})
export default class ScoreboardContainer extends React.Component {
  render() {
    const {games, id, team} = this.props;

    const otherSchoolName = games[id][team].otherSchoolName;
    const scores = games[id][team].scores;

    return (
      <ScoreBoard
        otherSchoolName={otherSchoolName}
        scores={scores}
        onLeftScoreClick={(scoreType, curScore) => {
          appStateTree.set(
            ['games', id, team, 'scores', scoreType, 0],
            curScore + 1); }}
        onRightScoreClick={(scoreType, curScore) => {
          appStateTree.set(
            ['games', id, team, 'scores', scoreType, 1],
            curScore + 1); }} />
    );
  }
}
