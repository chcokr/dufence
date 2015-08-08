import lessVars from '!!less-interop!../App.less'

import BSButton from 'react-bootstrap/lib/Button';
import BSButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import BSCol from 'react-bootstrap/lib/Col';
import React from 'react';
import style from 'stilr-classnames';

const numScoreRows = 3;
const scoreRowHeight = 72;

export default class ScoreBoard extends React.Component {
  render() {
    return (
      <div {...style({
        height: `calc(100vh - ${lessVars.navbarHeight}px)`,
        width: '100%'})}>
        <div {...style({
          alignItems: 'stretch',
          display: 'flex',
          flexFlow: 'column wrap',
          height: `calc(100% - ${scoreRowHeight * numScoreRows}px)`,
          justifyContent: 'space-around'})}>
          <GameChoiceRow />
          <TeamNameRow
            leftSchool="Duke"
            rightSchool="Cleveland St." />
          <TeamLogoRow />
          <TotalScoreRow
            leftScore={16}
            rightScore={11} />
        </div>
        <div {...style({
          bottom: 0,
          position: 'absolute'})}>
          <ScoreRow
            scoreType="Foil"
            leftScore={5}
            rightScore={4} />
          <ScoreRow
            scoreType="Epee"
            leftScore={4}
            rightScore={5} />
          <ScoreRow
            scoreType="Saber"
            leftScore={7}
            rightScore={2} />
        </div>
      </div>
    );
  }
}

export class GameChoiceRow extends React.Component {
  render() {
    const buttonWidth = 82;
    return (
      <BSCol xs={12}
        {...style({
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1})}>
        <BSCol xs={2}>
        </BSCol>
        <BSCol xs={8}>
          <BSButtonGroup bsSize="xs">
            <GameChoiceButton>Men</GameChoiceButton>
            <GameChoiceButton>Women</GameChoiceButton>
          </BSButtonGroup>
        </BSCol>
        <BSCol xs={2}>
        </BSCol>
      </BSCol>
    );
  }
}

export class GameChoiceButton extends React.Component {
  render() {
    return (
      <BSButton {...style({
        background: 'transparent',
        width: 82})}>
        {this.props.children}
      </BSButton>
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
        </BSCol>
        <BSCol xs={4}>
          vs
        </BSCol>
        <BSCol xs={4}>
        </BSCol>
      </BSCol>
    )
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
          `${leftScore > rightScore ? '-90' : '90'}deg,` +
          `${lessVars.brandPrimary} 0%,` +
          `${lessVars.bodyBg} 50%)`,
          display: 'flex',
          height: scoreRowHeight,
          textAlign: 'center'})}>
        <BSCol xs={4}>
          {leftScore}
        </BSCol>
        <BSCol xs={4}>
          {scoreType}
        </BSCol>
        <BSCol xs={4}>
          {rightScore}
        </BSCol>
      </BSCol>
    );
  }
}

