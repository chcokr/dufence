import lessVars from '!!less-interop!../App.less'
import appStateTree from '../appStateTree';
import {formatDate} from '../utils';

import qs from 'query-string';
import BSCol from 'react-bootstrap/lib/Col';
import BSRow from 'react-bootstrap/lib/Row';
import React from 'react';
import {Link} from 'react-router';

const numScoreRows = 3;
const scoreRowHeight = 72;

export default class ScoreBoard extends React.Component {
  render() {
    const {canEdit, date, noGameSelected, gamesOnThisDateForSameTeam,
      otherSchoolName,
      otherTeamGameId,
      schools, scores, showTeam, team} = this.props;

    if (noGameSelected) {
      const queryParams = qs.parse(location.search);

      return (
        <ScoreboardWrapper
          {...this.props}>
          <div
            className='text-center'
            style={{
              padding: 20
            }}>
            <p>
              Which{' '}
              <span
                className={team === 'men' ? 'text-success' : 'text-danger'}>
                {team}
              </span>
              's game<br />
              do you want to see here?
            </p>

            {_(gamesOnThisDateForSameTeam)
              .sortBy(game => schools[game[team].otherSchoolId].name)
              .map(game => {
                const leftTotalScore =
                  game[team].scores.epee[0] +
                  game[team].scores.foil[0] +
                  game[team].scores.saber[0];

                const rightTotalScore =
                  game[team].scores.epee[1] +
                  game[team].scores.foil[1] +
                  game[team].scores.saber[1];

                return (
                  <Link to={
                    `/game/?` +
                      qs.stringify(
                        Object.assign(queryParams, {[team]: game.id}))
                  }>
                    <p>
                      v. {schools[game[team].otherSchoolId].name}{' '}
                      ({leftTotalScore} - {rightTotalScore})
                    </p>
                  </Link>
                );
              })
              .value()}
          </div>
        </ScoreboardWrapper>
      );
    }

    const leftTotalScore = scores.foil[0] + scores.epee[0] + scores.saber[0];
    const rightTotalScore = scores.foil[1] + scores.epee[1] + scores.saber[1];

    const leftWin = leftTotalScore >= 14;
    const rightWin = rightTotalScore >= 14;

    return (
      <ScoreboardWrapper
        {...this.props}>
        <div
          style={{
            alignItems: 'stretch',
            display: 'flex',
            flexFlow: 'column wrap',
            height: `calc(100% - ${scoreRowHeight * numScoreRows}px)`,
            justifyContent: 'space-around',
            width: '100%'
          }}>
          {showTeam && <GenderRow gender={team} />}
          <TeamNameRow
            leftSchool="Duke"
            leftWin={leftWin}
            rightSchool={otherSchoolName}
            rightWin={rightWin} />
          <TeamLogoRow
            date={formatDate(new Date(date))}
            leftSchoolSrc={require('./ScoreBoard.duke-logo.png')}
            rightSchoolSrc={require('./ScoreBoard.duke-logo.png')} />
          <TotalScoreRow
            leftScore={leftTotalScore}
            leftWin={leftWin}
            onResetConfirm={this.props.onResetConfirm}
            rightScore={rightTotalScore}
            rightWin={rightWin} />
        </div>
        <div
          style={{
            bottom: 0,
            position: 'absolute',
            width: '100%'
          }}>
          <ScoreRow
            canEdit={canEdit}
            scoreType="Foil"
            leftScore={scores.foil[0]}
            leftTotalScore={leftTotalScore}
            rightScore={scores.foil[1]}
            rightTotalScore={rightTotalScore}
            onLeftDecrement={() =>
              this.props.onLeftScoreClick('foil', 'decr', scores.foil[0])}
            onLeftIncrement={() =>
              this.props.onLeftScoreClick('foil', 'incr', scores.foil[0])}
            onRightDecrement={() =>
              this.props.onRightScoreClick('foil', 'decr', scores.foil[1])}
            onRightIncrement={() =>
              this.props.onRightScoreClick('foil', 'incr', scores.foil[1])} />
          <ScoreRow
            canEdit={canEdit}
            scoreType="Epee"
            stateTreePropName="epee"
            leftScore={scores.epee[0]}
            leftTotalScore={leftTotalScore}
            rightScore={scores.epee[1]}
            rightTotalScore={rightTotalScore}
            onLeftDecrement={() =>
              this.props.onLeftScoreClick('epee', 'decr', scores.epee[0])}
            onLeftIncrement={() =>
              this.props.onLeftScoreClick('epee', 'incr', scores.epee[0])}
            onRightDecrement={() =>
              this.props.onRightScoreClick('epee', 'decr', scores.epee[1])}
            onRightIncrement={() =>
              this.props.onRightScoreClick('epee', 'incr', scores.epee[1])} />
          <ScoreRow
            canEdit={canEdit}
            scoreType="Saber"
            stateTreePropName="saber"
            leftScore={scores.saber[0]}
            leftTotalScore={leftTotalScore}
            rightScore={scores.saber[1]}
            rightTotalScore={rightTotalScore}
            onLeftDecrement={() =>
              this.props.onLeftScoreClick('saber', 'decr', scores.saber[0])}
            onLeftIncrement={() =>
              this.props.onLeftScoreClick('saber', 'incr', scores.saber[0])}
            onRightDecrement={() =>
              this.props.onRightScoreClick('saber', 'decr', scores.saber[1])}
            onRightIncrement={() =>
              this.props.onRightScoreClick('saber', 'incr', scores.saber[1])} />
        </div>
      </ScoreboardWrapper>
    );
  }
}

class ScoreboardWrapper extends React.Component {
  render() {
    const {team} = this.props;

    const boardLeftRightMargin = 10;

    return (
      <div
        {...this.props}
        style={{
          border: '1px solid',
          borderColor: team === 'men' ?
            lessVars.brandSuccess : lessVars.brandDanger,
          height: `100%`,
          margin: `auto ${boardLeftRightMargin}px`,
          position: 'relative',
          width: `calc(100% - ${boardLeftRightMargin})`
        }}>
        {this.props.children}
      </div>
    );
  }
}

class GenderRow extends React.Component {
  render() {
    const {gender} = this.props;

    const queryParams = qs.parse(location.search);

    return (
      <div
        className='text-center'>
        <span
          style={{
            color: gender === 'men' ?
              lessVars.brandSuccess : lessVars.brandDanger,
            fontSize: lessVars.fontSizeLargest,
            fontWeight: 700,
            margin: '0 auto'
          }}>
          {gender === 'men' ? 'Men' : 'Women'}
        </span>
        <p>
          <Link
            to={`/game?` +
              qs.stringify(
                Object.assign(queryParams, {[gender]: ''}))}>
            <small>Change to another game</small>
          </Link>
        </p>
      </div>
    );
  }
}

export class TeamNameRow extends React.Component {
  render() {
    const {date, leftSchool, leftWin, rightSchool, rightWin} = this.props;

    const schoolNameRow =
      <BSCol xs={12}>
        <BSCol xs={4}>
          {leftSchool}
        </BSCol>

        <BSCol xs={4}>
        </BSCol>
        <BSCol xs={4}>
          {rightSchool}
        </BSCol>
      </BSCol>;

    const victoryRow =
      <div
        style={{
          backgroundColor: lessVars.brandPrimary,
          fontSize: lessVars.fontSizeLarge,
          height: 45,
          marginBottom: 10,
          paddingTop: 2,
          width: '100%'
        }}>
        {(leftWin ? leftSchool : rightSchool) + ' victory!'}
      </div>;

    return (
      <div
        style={{
          fontSize: lessVars.fontSizeSmall,
          textAlign: 'center'
        }}>
        {(leftWin || rightWin) && victoryRow}
        {schoolNameRow}
      </div>
    );
  }
}

export class TeamLogoRow extends React.Component {
  render() {
    return (
      <BSCol xs={12}
        style={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 3,
          fontSize: lessVars.fontSizeSmall,
          textAlign: 'center'
        }}>
        <BSCol xs={4}>
          <TeamLogoImage src={this.props.leftSchoolSrc} />
        </BSCol>
        <BSCol xs={4}
          style={{
            color: lessVars.grayLight,
            fontSize: lessVars.fontSizeSmall
          }}>
          {this.props.date}
        </BSCol>
        <BSCol xs={4}>
          <TeamLogoImage src={this.props.rightSchoolSrc} />
        </BSCol>
      </BSCol>
    )
  }
}

export class TeamLogoImage extends React.Component {
  render() {
    return (
      <img
        style={{
          width: 80
        }}
        src={this.props.src} />
    );
  }
}

export class TotalScoreRow extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {leftScore, leftWin, rightScore, rightWin} = this.props;

    return (
      <BSCol xs={12}
        style={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 2,
          fontSize: lessVars.fontSizeLargest,
          textAlign: 'center'
        }}>
        <BSCol xs={4}
          style={{
            color: leftWin ? lessVars.brandPrimary : 'inherit',
            fontWeight: 700
          }}>
          {leftScore}
        </BSCol>
        <BSCol xs={4} xsOffset={4}
          style={{
            color: rightWin ? lessVars.brandPrimary : 'inherit',
            fontWeight: 700
          }}>
          {rightScore}
        </BSCol>
      </BSCol>
    );
  }
}

export class ScoreRow extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {canEdit, leftScore,
      onLeftDecrement, onLeftIncrement, onRightDecrement, onRightIncrement,
      rightScore, scoreType} = this.props;

    const leftWin = leftScore >= 5;
    const rightWin = rightScore >= 5;

    return (
      <BSCol xs={12}
        style={{
          alignItems: 'center',
          background: (!leftWin && !rightWin) ? '' : `linear-gradient(` +
          `${leftWin ? '90' : '-90'}deg,` +
          `${lessVars.brandPrimary} 0%,` +
          `${lessVars.bodyBg} 50%)`,
          display: 'flex',
          height: scoreRowHeight,
          textAlign: 'center'
        }}>
        <BSCol xs={4}
          style={{
            cursor: canEdit ? 'pointer' : 'inherit'
          }}>
          <ScoreWithPlusMinus
            canEdit={canEdit}
            onDecrement={canEdit && onLeftDecrement}
            onIncrement={canEdit && onLeftIncrement}
            score={leftScore} />
        </BSCol>
        <BSCol xs={4}>
          {scoreType}
        </BSCol>
        <BSCol xs={4}
          onClick={canEdit && this.onRightScoreClick}
          style={{
            cursor: canEdit ? 'pointer' : 'inherit'
          }}>
          <ScoreWithPlusMinus
            canEdit={canEdit}
            onDecrement={canEdit && onRightDecrement}
            onIncrement={canEdit && onRightIncrement}
            score={rightScore} />
        </BSCol>
      </BSCol>
    );
  }
}

class ScoreWithPlusMinus extends React.Component {
  render() {
    const {canEdit, onDecrement, onIncrement, score} = this.props;

    return (
      <div>
        <span
          onClick={onDecrement}>
          {canEdit && <span>-&nbsp;&nbsp;&nbsp;&nbsp;</span>}
        </span>
        <span>
          {score}
        </span>
        <span
          onClick={onIncrement}>
          {canEdit && <span>&nbsp;&nbsp;&nbsp;&nbsp;+</span>}
        </span>
      </div>
    );
  }
}
