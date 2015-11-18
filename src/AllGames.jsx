import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import {getNewGame} from './data';
import history from './history';

import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import React from 'react';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonInput from 'react-bootstrap/lib/ButtonInput';
import BSCol from 'react-bootstrap/lib/Col';
import BSDropdownButton from 'react-bootstrap/lib/DropdownButton';
import BSInput from 'react-bootstrap/lib/Input';
import BSMenuItem from 'react-bootstrap/lib/MenuItem';
import BSRow from 'react-bootstrap/lib/Row';
import {Link, Navigation} from 'react-router';
import {formatDate} from './utils';

const mapFromGamesToCol = (games, teamName, schools) => {
  const gameItems =
    games.map(game => {
      const opponentSchoolName =
        schools[game[teamName].otherSchoolId].name;

      const ourScore =
        game[teamName].scores.foil[0] +
        game[teamName].scores.epee[0] +
        game[teamName].scores.saber[0];
      const otherScore =
        game[teamName].scores.foil[1] +
        game[teamName].scores.epee[1] +
        game[teamName].scores.saber[1];

      return (
        <GameItem
          id={game.id}
          key={game.id}
          date={formatDate(new Date(game.date))}
          otherSchool={opponentSchoolName}
          otherScore={otherScore}
          ourScore={ourScore}
          ourTeamName={teamName === 'men' ? 'Men' : 'Women'} />
      );
    });

  return (
    <BSCol xs={6}>
      {gameItems}
    </BSCol>
  );
};

const AllGames = branch(class extends React.Component {
  render() {
    const {games, schools} = this.props;
    let queryParams = this.props.location && this.props.location.query;
    let params = this.props.params;

    if (!params) {
      params = {};
    }
    if (!queryParams) {
      queryParams = {};
    }

    const showLoadingMsg = Object.keys(games).length === 0;

    const mapFromDateStringToMenAndWomenGames =
      _(games)
        .groupBy(game => {
          return formatDate(new Date(game.date));
        })
        .map(gamesInDate => ({
          date: formatDate(new Date(gamesInDate[0].date)),
          firstGameDate: gamesInDate[0].date, // for sorting below
          menGames:
            _(gamesInDate)
              .filter(g => g.men)
              .sortBy(g => schools[g.men.otherSchoolId].name)
              .value(),
          womenGames:
            _(gamesInDate)
              .filter(g => g.women)
              .sortBy(g => schools[g.women.otherSchoolId].name)
              .value()
        }))
        .sortByOrder(['firstGameDate'], ['desc'])
        .value();

    return (
      <div className='container'>
        <BSCol xs={12}
            sm={6} smOffset={3}
            md={4} mdOffset={4}>
          <h3>{params.addNew ? 'Add new game' : 'List of past games'}</h3>
          {params.addNew && <GameItem editing/>}
          {showLoadingMsg &&
            <span
              style={{
                color: lessVars.grayLight
              }}>
              Loading...
            </span>}
          {mapFromDateStringToMenAndWomenGames
            .map((menAndWomenGames, index) => {
              const menGames = menAndWomenGames.menGames;
              const womenGames = menAndWomenGames.womenGames;

              return (
                <BSRow
                  key={index}
                  style={{
                    marginBottom: 50
                  }}>
                  <p
                    style={{ 
                      color: lessVars.grayLight, 
                      fontSize: lessVars.fontSizeSmall, 
                      marginBottom: 5, 
                      marginTop: 10
                    }}>
                    {formatDate(new Date(menGames[0].date))}
                  </p>
                  {mapFromGamesToCol(menGames, 'men', schools)}
                  {mapFromGamesToCol(womenGames, 'women', schools)}
                </BSRow>
              );
            })}
        </BSCol>
      </div>
    );
  }
}, {
  cursors: {
    games: ['games'],
    schools: ['schools']
  }
});

const GameItem = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      menOpponentId: '',
      showMenError: false,
      showWomenError: false,
      womenOpponentId: ''
    };
  },

  onSubmit(e) {
    e.preventDefault();

    const {menOpponentId, womenOpponentId} = this.state;

    if (!menOpponentId) {
      this.setState({
        showMenError: true
      });
    }

    if (!womenOpponentId) {
      this.setState({
        showWomenError: true
      });
    }

    if (!menOpponentId || !womenOpponentId) {
      return;
    }

    const newGame =
      getNewGame(
        menOpponentId,
        womenOpponentId,
        Date.now());
    appStateTree.set(['games', newGame.id], newGame);

    history.replaceState({}, '/all-games?highlight=true');
  },

  onMenSelect(schoolId) {
    this.setState({
      menOpponentId: schoolId,
      showMenError: false,
      showWomenError: false
    });
  },

  onWomenSelect(schoolId) {
    this.setState({
      womenOpponentId: schoolId,
      showMenError: false,
      showWomenError: false
    });
  },

  render() {
    const {
      date, editing, id,
      otherSchool, otherScore,
      ourTeamName, ourScore} = this.props;

    const versusOther =
      <div
        style={{
          color: '#fff'
        }}>
        <span
          className={ourTeamName === 'Men' ? 'text-success' : 'text-danger'}>
        {ourTeamName}
        </span>{' '}
        ({ourScore} - {otherScore})
        <br />
        <span
          className="text-primary">
          v {otherSchool}
        </span>
      </div>;

    const formButton =
      <BSButtonInput
        bsStyle="primary"
        type="submit"
        style={{
          width: '100%'
        }}>
        Add
      </BSButtonInput>;

    const body =
      <form onSubmit={this.onSubmit}>
        <BSRow
          style={{
            border: !this.props.highlight ? '' :
              `1px solid ${lessVars.brandPrimary}`,
            paddingTop: 15
          }}>
          <BSCol xs={12}>
            {!editing ? versusOther :
              <OpponentDropdown
                bsStyle={this.state.showMenError ? 'warning' : 'default'}
                defaultTitle={this.state.showMenError ?
                  'Men?' : "Men's opponent"}
                onSelect={(e, key) => this.onMenSelect(key)}
                opponentId={this.state.menOpponentId} />}
          </BSCol>
          <BSCol xs={12}>
            {!editing ? null :
              <OpponentDropdown
                bsStyle={this.state.showWomenError ? 'warning' : 'default'}
                defaultTitle={this.state.showWomenError ?
                  'Women?' : "Women's opponent"}
                onSelect={(e, key) => this.onWomenSelect(key)}
                opponentId={this.state.womenOpponentId} />}
          </BSCol>
        </BSRow>
        <BSRow>
          <BSCol xs={12} xsOffset={0}>
            {editing && formButton}
          </BSCol>
        </BSRow>
      </form>;

    return (
      editing ? body :
        <Link to={`/game/?${ourTeamName === 'Men' ? 'men' : 'women'}=${id}`}>
          {body}
        </Link>
    );
  }
});

const OpponentDropdown = branch(class extends React.Component {
  render() {
    const {defaultTitle, opponentId, schools} = this.props;

    return (
      <BSDropdownButton
        {...this.props}
        title={!opponentId ? this.props.defaultTitle :
          schools[opponentId].name}
        type="submit"
        style={{
          marginBottom: 15,
          width: '100%'
        }}>
        {Object.keys(schools).map(id =>
          <BSMenuItem key={id} eventKey={id}>{schools[id].name}</BSMenuItem>)}
      </BSDropdownButton>
    );
  }
}, {
  cursors: {
    schools: ['schools']
  }
});

export default AllGames;
