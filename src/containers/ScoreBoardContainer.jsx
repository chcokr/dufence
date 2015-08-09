import appStateTree from '../appStateTree';
import ScoreBoard from '../components/ScoreBoard';

import {branch} from 'baobab-react/decorators';
import React from 'react';
import style from 'stilr-classnames';

export default class ScoreboardContainer extends React.Component {
  render() {
    return (
      <ScoreBoard
        otherSchoolName={this.props.otherSchoolName}
        scores={this.props.scores}
        onLeftScoreClick={(scoreType, curScore) => {
          const curTeam = appStateTree.get('curTeam');
          appStateTree.set(
            [curTeam, 'scores', scoreType, 0],
            curScore + 1); }}
        onRightScoreClick={(scoreType, curScore) => {
          const curTeam = appStateTree.get('curTeam');
          appStateTree.set(
            [curTeam, 'scores', scoreType, 1],
            curScore + 1); }} />
    );
  }
}
