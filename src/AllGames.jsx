import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import {getNewGame} from './data';

import {branch} from 'baobab-react/decorators';
import React from 'react';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonInput from 'react-bootstrap/lib/ButtonInput';
import BSCol from 'react-bootstrap/lib/Col';
import BSInput from 'react-bootstrap/lib/Input';
import BSRow from 'react-bootstrap/lib/Row';
import {Link, Navigation} from 'react-router';
import style from 'stilr-classnames';
import {formatDate} from './utils';

@branch({
  cursors: {
    games: ['games']
  }
})
export default class AllGames extends React.Component {
  render() {
    const games = this.props.games;
    let params = this.props.params;

    if (!params) {
      params = {};
    }

    return (
      <div {...style({}, 'container')}>
        <BSCol xs={12}>
          <h3>{params.addNew ? 'Add new game' : 'List of past games'}</h3>
          {params.addNew && <GameItem editing/>}
          {Object.keys(games)
            .sort((id1, id2) => games[id2].date - games[id1].date)
            .map(id =>
              <GameItem
                id={id}
                date={formatDate(games[id].date)}
                otherSchool={games[id].otherSchoolName} />)}
        </BSCol>
      </div>
    );
  }
}

const GameItem = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      inputVal: ''
    };
  },

  onSubmit(e) {
    e.preventDefault();

    const newGame = getNewGame(this.state.inputVal, new Date());
    appStateTree.set(['games', newGame.id], newGame);

    this.replaceWith('/all-games');
  },

  onChange(e) {
    this.setState({
      inputVal: e.target.value
    });
  },

  render() {
    const {date, editing, id, otherSchool} = this.props;

    const lineHeight = 40;

    const editingInput =
        <BSInput
          bsSize="small"
          onChange={this.onChange}
          type="text"
          value={this.state.inputVal} />;

    const versusOther =
      <span>
        v {otherSchool}
      </span>;

    const formButton =
      <BSButtonInput
        bsSize="small"
        bsStyle="primary"
        type="submit"
        {...style({
          width: '100%' })}>
        Add
      </BSButtonInput>;

    const body =
      <form onSubmit={this.onSubmit}>
        <BSRow>
          <BSCol xs={4}
            {...style({
              color: lessVars.grayLight,
              fontSize: lessVars.fontSizeSmall,
              marginTop: 11,
              height: lineHeight})}>
            {editing ? formatDate(new Date()) : date}
          </BSCol>
          <BSCol xs={8}
            {...style({
              lineHeight: lineHeight,
              height: lineHeight})}>
            {editing ? editingInput : versusOther}
          </BSCol>
        </BSRow>
        <BSRow>
          <BSCol xs={4} xsOffset={4}>
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
