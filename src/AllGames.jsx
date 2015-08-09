import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';

import {branch} from 'baobab-react/decorators';
import React from 'react';
import BSCol from 'react-bootstrap/lib/Col';
import BSRow from 'react-bootstrap/lib/Row';
import {Link} from 'react-router';
import style from 'stilr-classnames';
import {formatDate} from './utils';

@branch({
  cursors: {
    games: ['games']
  }
})
export default class AllGames extends React.Component {
  render() {
    const {games} = this.props;

    return (
      <div {...style({}, 'container')}>
        <BSCol xs={12}>
          <h3>List of past games</h3>
          {Object.keys(games).map(id =>
            <GameItem
              id={id}
              date={formatDate(games[id].date)}
              otherSchool={games[id].otherSchoolName} />)}
        </BSCol>
      </div>
    );
  }
}

class GameItem extends React.Component {
  render() {
    const {date, id, otherSchool} = this.props;

    const lineHeight = 40;

    return (
      <BSRow>
        <Link to={`/game/${id}/men`}>
        <BSCol xs={4}
          {...style({
            color: lessVars.grayLight,
            fontSize: lessVars.fontSizeSmall,
            marginTop: 11,
            height: lineHeight})}>
          {date}
        </BSCol>
        <BSCol xs={8}
          {...style({
            lineHeight: lineHeight,
            height: lineHeight})}>
            <span {...style({color: lessVars.textColor})}>
              v {otherSchool}
            </span>
        </BSCol>
        </Link>
      </BSRow>
    );
  }
}
