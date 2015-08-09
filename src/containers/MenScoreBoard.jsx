import {branch} from 'baobab-react/higher-order';
import ScoreBoard from '../components/ScoreBoard';
import ScoreBoardContainer from './ScoreBoardContainer';

import React from 'react';
import style from 'stilr-classnames';

export default branch(ScoreBoardContainer, {
  cursors: {
    otherSchoolName: ['men', 'otherSchoolName'],
    scores: ['men', 'scores']
  }
});
