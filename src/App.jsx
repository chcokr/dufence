require('./App.less');

require('babel/polyfill');

import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import ScoreBoard from './components/ScoreBoard'

import {root} from 'baobab-react/decorators';
import BSNav from 'react-bootstrap/lib/Nav';
import BSNavbar from 'react-bootstrap/lib/Navbar';
import BSNavItem from 'react-bootstrap/lib/NavItem';
import React from 'react';
import DocumentTitle from 'react-document-title';
import {Route, Router} from 'react-router';
import {history} from 'react-router/lib/HashHistory';
import style from 'stilr-classnames';
import StylesheetHotLoad from 'chcokr-webpack/StylesheetHotLoad';

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
            <ScoreBoard />
          </div>
        </StylesheetHotLoad>
      </DocumentTitle>
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
