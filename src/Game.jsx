import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import ScoreBoardContainer from './containers/ScoreBoardContainer';

import {branch} from 'baobab-react/decorators';
import stylesheetHotLoad from 'chcokr-webpack/style-hot/decorator';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import BSCol from 'react-bootstrap/lib/Col';
import BSRow from 'react-bootstrap/lib/Row';
import React from 'react';
import {Link} from 'react-router';
import style from 'stilr-classnames';

const teamChoiceRowHeight = 50;
const scoreBoardHeight = `calc(100vh - ${lessVars.navbarHeight}px` +
  ` - ${teamChoiceRowHeight}px)`;
const scoreBoardHolderCommonStyle = {
  height: scoreBoardHeight,
  minHeight: 400,
  maxHeight: 600
};

@stylesheetHotLoad(appStateTree)
export default class Game extends React.Component {
  render() {
    return (
      <div>
        <div {...style({}, 'visible-xs')}>
          <TeamChoiceRow
            id={this.props.params.id}
            team={this.props.params.team} />
        </div>
        <XsScoreBoardHolder {...style({}, 'visible-xs')}>
          <ScoreBoardContainer
            {...this.props.params} />
        </XsScoreBoardHolder>
        <BSRow {...style({}, 'hidden-xs')}>
          <BSCol sm={10} smOffset={1}>
            <NonXsScoreBoardHolder>
              <NonXsScoreBoardContainer
                id={this.props.params.id}
                team="men" />
            </NonXsScoreBoardHolder>
            <NonXsScoreBoardHolder lgOffset={2}>
              <NonXsScoreBoardContainer
                id={this.props.params.id}
                team="women" />
            </NonXsScoreBoardHolder>
          </BSCol>
        </BSRow>
      </div>
    );
  }
}

@stylesheetHotLoad(appStateTree)
class NonXsScoreBoardContainer extends React.Component {
  render() {
    return (
      <ScoreBoardContainer
        {...this.props}
        {...style({
          boxShadow: `0 0 10px ${lessVars.gray}`,
          marginTop: 30})}
        showTeam={true} />
    );
  }
}

@stylesheetHotLoad(appStateTree)
class XsScoreBoardHolder extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        {...style({
          ...scoreBoardHolderCommonStyle,
          width: '100vw'}, this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

@stylesheetHotLoad(appStateTree)
class NonXsScoreBoardHolder extends React.Component {
  render() {
    return (
      <BSCol
        {...this.props}
        sm={6}
        lg={5}
        {...style({
          ...scoreBoardHolderCommonStyle}, this.props.className)}>
        {this.props.children}
      </BSCol>
    );
  }
}

@stylesheetHotLoad(appStateTree)
class TeamChoiceRow extends React.Component {
  render() {
    const {curTeam, id, team} = this.props;

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
          <TeamChoiceButton>
            <Link to={`/game/${id}/men`}
              {...style({
                color: team === 'men' ?
                  lessVars.brandPrimary : '#fff'})}>
              Men
            </Link>
          </TeamChoiceButton>
          <TeamChoiceButton>
            <Link to={`/game/${id}/women`}
              {...style({
                color: team === 'women' ?
                  lessVars.brandPrimary : '#fff'})}>
              Women
            </Link>
          </TeamChoiceButton>
        </BSButtonGroup>
      </div>
    );
  }
}

@stylesheetHotLoad(appStateTree)
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
