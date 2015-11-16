import lessVars from '!!less-interop!../App.less'
import appStateTree from '../appStateTree';
import {formatDate} from '../utils';

import BSCol from 'react-bootstrap/lib/Col';
import BSRow from 'react-bootstrap/lib/Row';
import React from 'react';

const numScoreRows = 3;
const scoreRowHeight = 72;

export default class ScoreBoard extends React.Component {
  render() {
    const {canEdit, date, otherSchoolName, scores, showTeam, team} = this.props;

    const leftTotalScore = scores.foil[0] + scores.epee[0] + scores.saber[0];
    const rightTotalScore = scores.foil[1] + scores.epee[1] + scores.saber[1];

    const leftWin = leftTotalScore >= 14;
    const rightWin = rightTotalScore >= 14;

    return (
      <div
        {...this.props}
        style={{
          height: `100%`,
          position: 'relative',
          width: '100%'
        }}>
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
            onLeftScoreClick={() =>
              this.props.onLeftScoreClick('foil', scores.foil[0])}
            onRightScoreClick={() =>
              this.props.onRightScoreClick('foil', scores.foil[1])} />
          <ScoreRow
            canEdit={canEdit}
            scoreType="Epee"
            stateTreePropName="epee"
            leftScore={scores.epee[0]}
            leftTotalScore={leftTotalScore}
            rightScore={scores.epee[1]}
            rightTotalScore={rightTotalScore}
            onLeftScoreClick={() =>
              this.props.onLeftScoreClick('epee', scores.epee[0])}
            onRightScoreClick={() =>
              this.props.onRightScoreClick('epee', scores.epee[1])} />
          <ScoreRow
            canEdit={canEdit}
            scoreType="Saber"
            stateTreePropName="saber"
            leftScore={scores.saber[0]}
            leftTotalScore={leftTotalScore}
            rightScore={scores.saber[1]}
            rightTotalScore={rightTotalScore}
            onLeftScoreClick={() =>
              this.props.onLeftScoreClick('saber', scores.saber[0])}
            onRightScoreClick={() =>
              this.props.onRightScoreClick('saber', scores.saber[1])} />
        </div>
      </div>
    );
  }
}

class GenderRow extends React.Component {
  render() {
    const {gender} = this.props;

    return (
      <div
        style={{
          alignItems: 'center',
          color: gender === 'men' ?
            lessVars.brandSuccess : lessVars.brandDanger,
          display: 'flex',
          flexGrow: 1,
          fontSize: lessVars.fontSizeLarge,
          fontWeight: 700,
          textAlign: 'center'
        }}>
        <span
          style={{
            margin: '0 auto'
          }}>
          {gender === 'men' ? 'Men' : 'Women'}
        </span>
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
          marginBottom: 30,
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

  onLeftScoreClick = () => {
    const {leftScore, leftTotalScore, rightScore, rightTotalScore} = this.props;

    if (leftTotalScore + rightTotalScore >= 27) {
      return;
    }

    if (leftScore + rightScore >= 9) {
      return;
    }

    this.props.onLeftScoreClick();
  };

  onRightScoreClick = () => {
    const {leftScore, leftTotalScore, rightScore, rightTotalScore} = this.props;

    if (leftTotalScore + rightTotalScore >= 27) {
      return;
    }

    if (leftScore + rightScore >= 9) {
      return;
    }

    this.props.onRightScoreClick();
  };

  render() {
    const {canEdit, leftScore, rightScore, scoreType} = this.props;

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
          onClick={canEdit && this.onLeftScoreClick}
          style={{
            cursor: canEdit ? 'pointer' : 'inherit'
          }}>
          {leftScore}
        </BSCol>
        <BSCol xs={4}>
          {scoreType}
        </BSCol>
        <BSCol xs={4}
          onClick={canEdit && this.onRightScoreClick}
          style={{
            cursor: canEdit ? 'pointer' : 'inherit'
          }}>
          {rightScore}
        </BSCol>
      </BSCol>
    );
  }
}
