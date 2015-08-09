import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import ScoreBoardContainer from './containers/ScoreBoardContainer';

import {branch} from 'baobab-react/decorators';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import BSCol from 'react-bootstrap/lib/Col';
import React from 'react';
import {Link} from 'react-router';
import style from 'stilr-classnames';

const teamChoiceRowHeight = 50;

export default class Game extends React.Component {
  render() {
    return (
      <div>
        <TeamChoiceRow
          id={this.props.params.id}
          curTeam={this.props.params.team} />
        <div {...style({
            height: `calc(100vh - ${lessVars.navbarHeight}px` +
              ` - ${teamChoiceRowHeight}px)`,
            minHeight: 400,
            maxHeight: 800,
            width: '100vw'})}>
          <ScoreBoardContainer
            id={this.props.params.id}
            team={this.props.params.team} />
        </div>
      </div>
    );
  }
}

class TeamChoiceRow extends React.Component {
  render() {
    const {curTeam, id} = this.props;

    return (
      <div
        {...style({
          alignItems: 'center',
          display: 'flex',
          height: teamChoiceRowHeight,
          position: 'relative'})}>
        <BSButtonGroup bsSize="xs"
          {...style({
            margin: '0 auto'})}>
          <TeamChoiceButton onClick={this.onMenClick}
            {...style({
              color: curTeam === 'men' ?
                lessVars.brandPrimary : 'inherit'})}>
            <Link to={`/game/${id}/men`}
              {...style({
                color: '#fff'})}>
              Men
            </Link>
          </TeamChoiceButton>
          <TeamChoiceButton onClick={this.onWomenClick}
            {...style({
              color: curTeam === 'women' ?
                lessVars.brandPrimary : 'inherit'})}>
            <Link to={`/game/${id}/women`}
              {...style({
                color: '#fff'})}>
              Women
            </Link>
          </TeamChoiceButton>
        </BSButtonGroup>
      </div>
    );
  }
}

class TeamChoiceButton extends React.Component {
  render() {
    return (
      <BSButton
        {...this.props}
        {...style({
          background: 'transparent',
          width: 82})}>
        {this.props.children}
      </BSButton>
    );
  }
}
