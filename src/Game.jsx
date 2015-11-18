import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import ScoreBoardContainer from './containers/ScoreBoardContainer';

import {branch} from 'baobab-react/decorators';
import qs from 'query-string';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import BSCol from 'react-bootstrap/lib/Col';
import BSRow from 'react-bootstrap/lib/Row';
import React from 'react';
import {Link} from 'react-router';

const teamChoiceRowHeight = 50;
const scoreBoardHeight = `calc(100vh - ${lessVars.navbarHeight}px` +
  ` - ${teamChoiceRowHeight}px)`;
const scoreBoardHolderCommonStyle = {
  height: scoreBoardHeight,
  minHeight: 400,
  maxHeight: 600
};

export default class Game extends React.Component {
  render() {
    const queryParams = qs.parse(location.search);

    const showMenInXs = queryParams.men;

    return (
      <div>
        <XsScoreBoardHolder className='visible-xs'>
          <ScoreBoardContainer
            hideChangeTeam={true}
            id={showMenInXs ? queryParams.men : queryParams.women}
            showTeam={true}
            team={showMenInXs ? 'men' : 'women'} />
        </XsScoreBoardHolder>
        <BSRow className='hidden-xs'>
          <BSCol sm={10} smOffset={1}>
            <NonXsScoreBoardHolder>
              <NonXsScoreBoardContainer
                id={queryParams.men}
                team="men" />
            </NonXsScoreBoardHolder>
            <NonXsScoreBoardHolder lgOffset={2}>
              <NonXsScoreBoardContainer
                id={queryParams.women}
                team="women" />
            </NonXsScoreBoardHolder>
          </BSCol>
        </BSRow>
      </div>
    );
  }
}

class NonXsScoreBoardContainer extends React.Component {
  render() {
    return (
      <ScoreBoardContainer
        {...this.props}
        style={{
          boxShadow: `0 0 10px ${lessVars.gray}`,
          marginTop: 30
        }}
        showTeam={true} />
    );
  }
}

class XsScoreBoardHolder extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        style={{
          ...scoreBoardHolderCommonStyle,
          width: '100vw'
        }}>
        {this.props.children}
      </div>
    );
  }
}

class NonXsScoreBoardHolder extends React.Component {
  render() {
    return (
      <BSCol
        {...this.props}
        sm={6}
        lg={5}
        style={scoreBoardHolderCommonStyle}>
        {this.props.children}
      </BSCol>
    );
  }
}

class TeamChoiceButton extends React.Component {
  render() {
    return (
      <BSButton
        {...this.props}
        style={{
          background: 'transparent',
          width: 82
        }}>
        {this.props.children}
      </BSButton>
    );
  }
}
