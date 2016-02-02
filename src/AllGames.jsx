import lessVars from '!!less-interop!./App.less'
import appStateTree, {SECRET_KEY_FOR_EDIT_ACCESS} from './appStateTree';
import {getNewGame} from './data';
import history from './history';
import {removeBackslashesFromStringDate} from './utils.jsx';

import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import qs from 'query-string';
import React from 'react';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import BSButtonInput from 'react-bootstrap/lib/ButtonInput';
import BSCol from 'react-bootstrap/lib/Col';
import BSDropdownButton from 'react-bootstrap/lib/DropdownButton';
import BSInput from 'react-bootstrap/lib/Input';
import BSMenuItem from 'react-bootstrap/lib/MenuItem';
import BSRow from 'react-bootstrap/lib/Row';
import {Link, Navigation} from 'react-router';
import {formatDate} from './utils';

const mapFromGamesToCol = (games, teamName, schools, canEdit) => {
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

      const queryParams = qs.parse(location.search);

      return (
        <GameItem
          highlight={game.id === queryParams.highlight}
          id={game.id}
          isCoach={canEdit}
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
    const {canEdit, games, schools} = this.props;
    let queryParams = this.props.location && this.props.location.query;
    let params = this.props.params;

    if ((params && params.addNew) && !canEdit) {
      return null;
    }

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
              .sortByOrder([g => g.date], ['desc'])
              .value(),
          womenGames:
            _(gamesInDate)
              .filter(g => g.women)
              .sortByOrder([g => g.date], ['desc'])
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

              const menOrWomenGames =
                (menGames && menGames.length > 0) ? menGames : womenGames;

              return (
                <BSRow
                  key={index}
                  style={{
                    background: lessVars.grayLighter,
                    border: '2px solid',
                    marginBottom: 20,
                    paddingBottom: 20
                  }}>
                  <p
                    style={{ 
                      color: lessVars.grayLight, 
                      marginBottom: 5, 
                      marginTop: 10,
                      padding: '7px 10px 5px 10px'
                    }}>
                    {formatDate(new Date(menOrWomenGames[0].date))}
                  </p>
                  {mapFromGamesToCol(menGames, 'men', schools, canEdit)}
                  {mapFromGamesToCol(womenGames, 'women', schools, canEdit)}
                </BSRow>
              );
            })}
        </BSCol>
      </div>
    );
  }
}, {
  cursors: {
    canEdit: ['canEdit'],
    games: ['games'],
    schools: ['schools']
  }
});

const GameItem = branch(React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      opponentId: '',
      showAddError: false
    };
  },

  onSubmit(e) {
    e.preventDefault();

    const {addNewGameGenderIsMen} = this.props;
    const {opponentId} = this.state;

    if (!opponentId) {
      this.setState({
        showAddError: true
      });

      return;
    }

    const newGame =
      getNewGame(
        addNewGameGenderIsMen ? 'men' : 'women',
        opponentId,
        Date.now());
    appStateTree.set(['games', newGame.id], newGame);

    history.replaceState({}, `/all-games?highlight=${newGame.id}`);
  },

  render() {
    const {
      addNewGameGenderIsMen,
      date, editing, id, isCoach,
      otherSchool, otherScore,
      ourTeamName, ourScore} = this.props;

    const versusOther =
      <div
        style={{
          border: this.props.highlight ?
            `4px solid ${lessVars.brandPrimary}` :
            `1px solid ${lessVars.grayLight}`,
          padding: 10
        }}>
        <span
          className={ourTeamName === 'Men' ? 'text-success' : 'text-danger'}>
        {ourTeamName}
        </span>
        <br />
        <span
          style={{
            color: lessVars.textColor
          }}>
          ({ourScore} - {otherScore})
        </span>
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
            paddingTop: 15
          }}>
          <BSCol xs={12}>
            {!editing ? versusOther :
              <div>
                <div
                  style={{
                    marginBottom: 25
                  }}>
                  <BSButtonGroup>
                    <BSButton
                      bsStyle={addNewGameGenderIsMen ? 'success' : 'default'}
                      onClick={() => {
                        appStateTree.set(['addNewGameGenderIsMen'], true);
                      }}>
                      Men
                    </BSButton>
                    <BSButton
                      bsStyle={addNewGameGenderIsMen ? 'default' : 'danger'}
                      onClick={() => {
                        appStateTree.set(['addNewGameGenderIsMen'], false);
                      }}>
                      Women
                    </BSButton>
                  </BSButtonGroup>
                </div>
                <OpponentDropdown
                  bsStyle={this.state.showAddError ? 'warning' : 'default'}
                  defaultTitle='Choose school'
                  onSelect={(e, key) =>
                    this.setState({
                      opponentId: key,
                      showAddError: false
                    })}
                  opponentId={this.state.opponentId} />
              </div>}
          </BSCol>
        </BSRow>
        <BSRow>
          <BSCol xs={12} xsOffset={0}>
            {editing && formButton}
          </BSCol>
        </BSRow>
      </form>;

    if (!date) {
      return body;
    }

    return (
      editing ? body :
        <Link to={
          `/game/?${ourTeamName === 'Men' ? 'men' : 'women'}=${id}&` +
            `date=${removeBackslashesFromStringDate(date)}` +
            (!isCoach ? '' : ('&' + SECRET_KEY_FOR_EDIT_ACCESS))
        }>
          {body}
        </Link>
    );
  }
}), {
  cursors: {
    addNewGameGenderIsMen: ['addNewGameGenderIsMen']
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
