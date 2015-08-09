import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import {getNewGame} from './data';

import {branch} from 'baobab-react/decorators';
import React from 'react';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonInput from 'react-bootstrap/lib/ButtonInput';
import BSCol from 'react-bootstrap/lib/Col';
import BSDropdownButton from 'react-bootstrap/lib/DropdownButton';
import BSInput from 'react-bootstrap/lib/Input';
import BSMenuItem from 'react-bootstrap/lib/MenuItem';
import BSRow from 'react-bootstrap/lib/Row';
import {Link, Navigation} from 'react-router';
import stilr from 'stilr';
import style from 'stilr-classnames';
import {formatDate} from './utils';

@branch({
  cursors: {
    games: ['games'],
    schools: ['schools']
  }
})
export default class AllGames extends React.Component {
  render() {
    const {games, schools} = this.props;
    let params = this.props.params;

    if (!params) {
      params = {};
    }

    return (
      <div {...style({}, 'container')}>
        <BSCol xs={12}
            sm={6} smOffset={3}
            md={4} mdOffset={4}>
          <h3>{params.addNew ? 'Add new game' : 'List of past games'}</h3>
          {params.addNew && <GameItem editing/>}
          {Object.keys(games)
            .sort((id1, id2) => games[id2].date - games[id1].date)
            .map(id => {
              const game = games[id];
              const menOpponentSchoolName =
                schools[game.menOpponentSchoolId].name;
              const womenOpponentSchoolName =
                schools[game.womenOpponentSchoolId].name;

              return (
                <GameItem
                  id={id}
                  date={formatDate(game.date)}
                  menOtherSchool={menOpponentSchoolName}
                  womenOtherSchool={womenOpponentSchoolName} />
              );
            })}
        </BSCol>
      </div>
    );
  }
}

const GameItem = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      menOpponentId: '',
      womenOpponentId: ''
    };
  },

  onSubmit(e) {
    e.preventDefault();

    const newGame =
      getNewGame(
        this.state.menOpponentId,
        this.state.womenOpponentId,
        new Date());
    appStateTree.set(['games', newGame.id], newGame);

    this.replaceWith('/all-games');
  },

  onMenSelect(schoolId) {
    this.setState({
      menOpponentId: schoolId
    });
  },

  onWomenSelect(schoolId) {
    this.setState({
      womenOpponentId: schoolId
    });
  },

  render() {
    const {date, editing, id, menOtherSchool, womenOtherSchool} = this.props;

    const lineHeight = 40;

    const versusOther =
      <span>
        <span {...style({
            color: '#fff'})}>
          Men
        </span>
        <br />
        v {menOtherSchool}
        <br />
        <span {...style({
          color: '#fff'})}>
          Women
        </span>
        <br />
        v {womenOtherSchool}
      </span>;

    const formButton =
      <BSButtonInput
        bsStyle="primary"
        type="submit"
        {...style({
          width: '100%' })}>
        Add
      </BSButtonInput>;

    const body =
      <form onSubmit={this.onSubmit}>
        <BSRow
          {...style({
            paddingTop: 15})}>
          <BSCol xs={4}
            {...style({
              color: lessVars.grayLight,
              fontSize: lessVars.fontSizeSmall,
              marginBottom: 12,
              marginTop: 5})}>
            {editing ? formatDate(new Date()) : date}
          </BSCol>
          <BSCol xs={editing ? 12 : 8}>
            {!editing ? versusOther :
              <OpponentDropdown
                defaultTitle="Men's opponent"
                onSelect={this.onMenSelect}
                opponentId={this.state.menOpponentId} />}
          </BSCol>
          <BSCol xs={12}>
            {!editing ? null :
              <OpponentDropdown
                defaultTitle="Women's opponent"
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

@branch({
  cursors: {
    schools: ['schools']
  }
})
class OpponentDropdown extends React.Component {
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
        {...style({
          marginBottom: 15,
          width: '100%'})}>
        {Object.keys(schools).map(id =>
          <BSMenuItem eventKey={id}>{schools[id].name}</BSMenuItem>)}
      </BSDropdownButton>
    );
  }
}
