import lessVars from '!!less-interop!../App.less'
import appStateTree from '../appStateTree';

import BSCol from 'react-bootstrap/lib/Col';
import React from 'react';
import style from 'stilr-classnames';

const numScoreRows = 3;
const scoreRowHeight = 72;

export default class ScoreBoard extends React.Component {
  render() {
    const {otherSchoolName, scores} = this.props;

    const leftTotalScore = scores.foil[0] + scores.epee[0] + scores.saber[0];
    const rightTotalScore = scores.foil[1] + scores.epee[1] + scores.saber[1];

    return (
      <div {...style({
        height: `100%`,
        position: 'relative',
        width: '100%'})}>
        <div {...style({
          alignItems: 'stretch',
          display: 'flex',
          flexFlow: 'column wrap',
          height: `calc(100% - ${scoreRowHeight * numScoreRows}px)`,
          justifyContent: 'space-around',
          width: '100%'})}>
          <TeamNameRow
            leftSchool="Duke"
            rightSchool={otherSchoolName} />
          <TeamLogoRow
            leftSchoolSrc={require('./ScoreBoard.duke-logo.png')}
            rightSchoolSrc={require('./ScoreBoard.duke-logo.png')} />
          <TotalScoreRow
            leftScore={leftTotalScore}
            rightScore={rightTotalScore} />
        </div>
        <div {...style({
          bottom: 0,
          position: 'absolute'})}>
          <ScoreRow
            scoreType="Foil"
            leftScore={scores.foil[0]}
            rightScore={scores.foil[1]}
            onLeftScoreClick={() =>
              this.props.onLeftScoreClick('foil', scores.foil[0])}
            onRightScoreClick={() =>
              this.props.onRightScoreClick('foil', scores.foil[1])} />
          <ScoreRow
            scoreType="Epee"
            stateTreePropName="epee"
            leftScore={scores.epee[0]}
            rightScore={scores.epee[1]}
            onLeftScoreClick={() =>
              this.props.onLeftScoreClick('epee', scores.epee[0])}
            onRightScoreClick={() =>
              this.props.onRightScoreClick('epee', scores.epee[1])} />
          <ScoreRow
            scoreType="Saber"
            stateTreePropName="saber"
            leftScore={scores.saber[0]}
            rightScore={scores.saber[1]}
            onLeftScoreClick={() =>
              this.props.onLeftScoreClick('saber', scores.saber[0])}
            onRightScoreClick={() =>
              this.props.onRightScoreClick('saber', scores.saber[1])} />
        </div>
      </div>
    );
  }
}

export class TeamNameRow extends React.Component {
  render() {
    return (
      <BSCol xs={12}
        {...style({
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          fontSize: lessVars.fontSizeSmaller,
          textAlign: 'center',
          whiteSpace: 'nowrap'})}>
        <BSCol xs={4}>
          {this.props.leftSchool}
        </BSCol>
        <BSCol xs={4}>
        </BSCol>
        <BSCol xs={4}>
          {this.props.rightSchool}
        </BSCol>
      </BSCol>
    );
  }
}

export class TeamLogoRow extends React.Component {
  render() {
    return (
      <BSCol xs={12}
        {...style({
          alignItems: 'center',
          display: 'flex',
          flexGrow: 3,
          fontSize: lessVars.fontSizeSmall,
          textAlign: 'center'})}>
        <BSCol xs={4}>
          <TeamLogoImage src={this.props.leftSchoolSrc} />
        </BSCol>
        <BSCol xs={4}>
          vs
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
      <img {...style({
        width: 80})}
        src={this.props.src} />
    );
  }
}

export class TotalScoreRow extends React.Component {
  render() {
    const {leftScore, rightScore} = this.props;

    return (
      <BSCol xs={12}
        {...style({
          alignItems: 'center',
          display: 'flex',
          flexGrow: 2,
          fontSize: lessVars.fontSizeLargest,
          textAlign: 'center'})}>
        <BSCol xs={4}>
          {leftScore}
        </BSCol>
        <BSCol xs={4}>
        </BSCol>
        <BSCol xs={4}>
          {rightScore}
        </BSCol>
      </BSCol>
    );
  }
}

export class ScoreRow extends React.Component {
  render() {
    const {leftScore, rightScore, scoreType} = this.props;

    return (
      <BSCol xs={12}
        {...style({
          alignItems: 'center',
          background: leftScore + rightScore < 9 ? '' : `linear-gradient(` +
          `${leftScore > rightScore ? '90' : '-90'}deg,` +
          `${lessVars.brandPrimary} 0%,` +
          `${lessVars.bodyBg} 50%)`,
          display: 'flex',
          height: scoreRowHeight,
          textAlign: 'center'})}>
        <BSCol xs={4}
          onClick={this.props.onLeftScoreClick}>
          {leftScore}
        </BSCol>
        <BSCol xs={4}>
          {scoreType}
        </BSCol>
        <BSCol xs={4}
          onClick={this.props.onRightScoreClick}>
          {rightScore}
        </BSCol>
      </BSCol>
    );
  }
}
