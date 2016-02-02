import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import ScoreBoardContainer from './containers/ScoreBoardContainer';

import {branch} from 'baobab-react/higher-order';
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
  minHeight: 630
};

const Game = branch(class extends React.Component {
  render() {
    const {hideNavigation} = this.props;

    const queryParams = qs.parse(location.search);

    const showMenInXs = queryParams.men && queryParams.men !== 'hide';

    const hideMenInNonXs = queryParams.men === 'hide' ||
      (hideNavigation &&
        (queryParams.men === '' || queryParams.men === undefined));

    const hideWomenInNonXs = queryParams.women === 'hide' ||
      (hideNavigation &&
        (queryParams.women === '' || queryParams.women === undefined));

    return (
      <div>
        <XsScoreBoardHolder className='visible-xs'>
          <ScoreBoardContainer
            hideNavigation={true}
            id={showMenInXs ? queryParams.men : queryParams.women}
            showTeam={true}
            team={showMenInXs ? 'men' : 'women'}/>
        </XsScoreBoardHolder>
        <BSRow className='hidden-xs'>
          <BSCol sm={10} smOffset={1}>
            {!hideMenInNonXs &&
            <NonXsScoreBoardHolder
              lgOffset={!hideWomenInNonXs ? 1 : 4}
              smOffset={!hideWomenInNonXs ? 0 : 3}>
              <NonXsScoreBoardContainer
                hideNavigation={hideNavigation}
                id={queryParams.men}
                team="men"/>
            </NonXsScoreBoardHolder>}
            {!hideWomenInNonXs &&
            <NonXsScoreBoardHolder
              lgOffset={!hideMenInNonXs ? 2 : 4}
              smOffset={!hideMenInNonXs ? 0 : 3}>
              <NonXsScoreBoardContainer
                hideNavigation={hideNavigation}
                id={queryParams.women}
                team="women"/>
            </NonXsScoreBoardHolder>}
          </BSCol>
        </BSRow>
      </div>
    );
  }
}, {
  cursors: {
    hideNavigation: ['hideNavigation']
  }
});

export default Game;

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
        lg={4}
        style={scoreBoardHolderCommonStyle}>
        {this.props.children}
      </BSCol>
    );
  }
}
