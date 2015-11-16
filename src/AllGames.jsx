import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import {getNewGame} from './data';

import {branch} from 'baobab-react/higher-order';
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
          {Object.keys(games)
            .sort((id1, id2) => games[id2].date - games[id1].date)
            .map((id, index) => {
              const game = games[id];
              const menOpponentSchoolName =
                schools[game.menOpponentSchoolId].name;
              const womenOpponentSchoolName =
                schools[game.womenOpponentSchoolId].name;

              const menOurScore =
                game.men.scores.foil[0] +
                game.men.scores.epee[0] +
                game.men.scores.saber[0];
              const menOtherScore =
                game.men.scores.foil[1] +
                game.men.scores.epee[1] +
                game.men.scores.saber[1];
              const womenOurScore =
                game.women.scores.foil[0] +
                game.women.scores.epee[0] +
                game.women.scores.saber[0];
              const womenOtherScore =
                game.women.scores.foil[1] +
                game.women.scores.epee[1] +
                game.women.scores.saber[1];

              return (
                <GameItem
                  highlight={queryParams.highlight && index === 0}
                  id={id}
                  key={id}
                  date={formatDate(new Date(game.date))}
                  menOtherSchool={menOpponentSchoolName}
                  menOtherScore={menOtherScore}
                  menOurScore={menOurScore}
                  womenOtherSchool={womenOpponentSchoolName}
                  womenOtherScore={womenOtherScore}
                  womenOurScore={womenOurScore} />
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

    this.replaceWith('/all-games?highlight=true');
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
      menOtherSchool, menOtherScore, menOurScore,
      womenOtherSchool, womenOtherScore, womenOurScore} = this.props;

    const lineHeight = 40;

    const isGameOver = editing || (
      (menOurScore === 14 || menOtherScore === 14) &&
      (womenOurScore === 14 || womenOtherScore === 14)
    );

    const versusOther =
      <span>
        <span
          style={{
            color: '#fff'
          }}>
          Men ({menOurScore} - {menOtherScore})
        </span>
        <br />
        v {menOtherSchool}
        <br />
        <span style={{
          color: '#fff'
        }}>
          Women ({womenOurScore} - {womenOtherScore})
        </span>
        <br />
        v {womenOtherSchool}
      </span>;

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
          <BSCol xs={4}
            style={{
              color: lessVars.grayLight,
              fontSize: lessVars.fontSizeSmall,
              marginBottom: 12,
              marginTop: 5
            }}>
            {editing ? formatDate(new Date()) : <span>{date}<br /></span>}
            {isGameOver ||
              <span style={{
                fontSize: lessVars.fontSizeSmaller
              }}>
                {isGameOver || 'In progress'}
              </span>}
          </BSCol>
          <BSCol xs={editing ? 12 : 8}>
            {!editing ? versusOther :
              <OpponentDropdown
                bsStyle={this.state.showMenError ? 'warning' : 'default'}
                defaultTitle={this.state.showMenError ?
                  'Men?' : "Men's opponent"}
                onSelect={this.onMenSelect}
                opponentId={this.state.menOpponentId} />}
          </BSCol>
          <BSCol xs={12}>
            {!editing ? null :
              <OpponentDropdown
                bsStyle={this.state.showWomenError ? 'warning' : 'default'}
                defaultTitle={this.state.showWomenError ?
                  'Women?' : "Women's opponent"}
                onSelect={this.onWomenSelect}
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
        <Link to={`/game/${id}/men`}>
          {body}
        </Link>
    );
  }
});

const OpponentDropdown = branch(class extends React.Component {
  render() {
    const {defaultTitle, opponentId, schools} = this.props;

    const buttonClassName = stilr.create({
      x: {
        width: '100%'
      }
    }).x;

    return (
      <BSDropdownButton
        {...this.props}
        buttonClassName={buttonClassName}
        title={!opponentId ? this.props.defaultTitle :
          schools[opponentId].name}
        type="submit"
        style={{
          marginBottom: 15,
          width: '100%'
        }}>
        {Object.keys(schools).map(id =>
          <BSMenuItem eventKey={id}>{schools[id].name}</BSMenuItem>)}
      </BSDropdownButton>
    );
  }
}, {
  cursors: {
    schools: ['schools']
  }
});

export default AllGames;
