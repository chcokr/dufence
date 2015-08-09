require('./App.less');

require('babel/polyfill');

import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import MenScoreBoard from './containers/MenScoreBoard'
import WomenScoreBoard from './containers/WomenScoreBoard'

import {branch, root} from 'baobab-react/decorators';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import BSCol from 'react-bootstrap/lib/Col';
import BSNav from 'react-bootstrap/lib/Nav';
import BSNavbar from 'react-bootstrap/lib/Navbar';
import BSNavItem from 'react-bootstrap/lib/NavItem';
import React from 'react';
import DocumentTitle from 'react-document-title';
import {Route, Router} from 'react-router';
import {history} from 'react-router/lib/HashHistory';
import style from 'stilr-classnames';
import StylesheetHotLoad from 'chcokr-webpack/StylesheetHotLoad';

const teamChoiceRowHeight = 60;

@root(appStateTree)
export class AppTemplate extends React.Component {
  render() {
    return (
      <DocumentTitle title="Dufence">
        <StylesheetHotLoad>
          <div>
            <BSNavbar>
              <BSNav navbar right>
                <BSNavItem>+ New game</BSNavItem>
                <BSNavItem>
                  <span {...style({color: lessVars.brandPrimary})}>
                    See all games
                  </span>
                </BSNavItem>
              </BSNav>
            </BSNavbar>
            <TeamChoiceRow />
            <TeamScoreBoard />
          </div>
        </StylesheetHotLoad>
      </DocumentTitle>
    );
  }
}

@branch({
  cursors: {
    'curTeam': ['curTeam']
  }
})
class TeamScoreBoard extends React.Component {
  render() {
    return (
      <div {...style({
        height: `calc(100vh - ${lessVars.navbarHeight}px` +
        ` - ${teamChoiceRowHeight}px)`,
        width: '100vw'})}>
        {this.props.curTeam === 'men' ?
          <MenScoreBoard /> :
          <WomenScoreBoard />}
      </div>
    );
  }
}

class TeamChoiceRow extends React.Component {
  onMenClick = () => {
    appStateTree.set(['curTeam'], 'men');
  };

  onWomenClick = () => {
    console.log('yo');
    appStateTree.set(['curTeam'], 'women');
  };

  render() {
    return (
      <BSCol xs={12}
        {...style({
          alignItems: 'center',
          display: 'flex',
          height: teamChoiceRowHeight,
          position: 'relative'})}>
        <BSButtonGroup bsSize="xs"
          {...style({
            margin: '0 auto'})}>
          <TeamChoiceButton onClick={this.onMenClick}>
            Men
          </TeamChoiceButton>
          <TeamChoiceButton onClick={this.onWomenClick}>
            Women
          </TeamChoiceButton>
        </BSButtonGroup>
      </BSCol>
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

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={AppTemplate} />
      </Router>
    );
  }
}
