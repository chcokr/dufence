require('./App.less');

import AllGames from './AllGames'
import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import Game from './Game';
import history from './history';

import {branch, root} from 'baobab-react/higher-order';
import fastclick from 'fastclick';
import BSNav from 'react-bootstrap/lib/Nav';
import BSNavbar from 'react-bootstrap/lib/Navbar';
import BSNavBrand from 'react-bootstrap/lib/NavBrand';
import BSNavItem from 'react-bootstrap/lib/NavItem';
import React from 'react';
import DocumentTitle from 'react-document-title';
import {Link, Route, Router} from 'react-router';

const AppTemplate = branch(class extends React.Component {
  render() {
    const {hideNavigation} = this.props;

    const addNewGameButton =
      <NavItem to="/all-games/new">
        + New game
      </NavItem>;
    const readOnlyWarning =
      <BSNavItem
        style={{
          marginTop: 10
        }}>
        <p
          className="text-warning">
          Read-only
        </p>
      </BSNavItem>;

    return (
      <DocumentTitle title="Dufence">
        <div>
          <BSNavbar>
            <BSNavBrand>
              <Logo
                hideNavigation={hideNavigation} />
            </BSNavBrand>
            <BSNav navbar right>
              {this.props.canEdit ? addNewGameButton : readOnlyWarning}
              {hideNavigation ||
                <NavItem to="/all-games">
                  <span>
                    See all games
                  </span>
                </NavItem>}
            </BSNav>
          </BSNavbar>
          {this.props.children || <AllGames />}
        </div>
      </DocumentTitle>
    );
  }
}, {
  cursors: {
    canEdit: ['canEdit'],
    hideNavigation: ['hideNavigation']
  }
});

class Logo extends React.Component {
  render() {
    const {hideNavigation} = this.props;

    const imgAndName =
      <div>
        <img
          src={require('./App.logo.png')}
          style={{
            height: 30,
            marginRight: 10
          }}/>
          <span
            className="hidden-xs"
            style={{
              color: lessVars.textColor
            }}>
            Dufence
          </span>
      </div>;

    return (
      <div
        style={{
          height: 30,
          margin: '10px 0 0 15px'
        }}>
        {hideNavigation ? imgAndName :
          <Link to="/">{imgAndName}</Link>}
      </div>
    );
  }
}

class NavItem extends React.Component {
  render() {
    return (
      <BSNavItem>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </BSNavItem>
    );
  }
}

const App = root(class extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={AppTemplate}>
          <Route path="all-games" component={AllGames} />
          <Route path="all-games/:addNew" component={AllGames} />
          <Route path="game" component={Game} />
        </Route>
      </Router>
    );
  }
}, appStateTree);

export default App;

fastclick.attach(document.body);
