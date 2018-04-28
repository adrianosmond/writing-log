import React from 'react';

const Gradient = (props) => {
  if (props.level !== '6') {
    return null;
  }
  return (
    <defs>
      <linearGradient id="bow">
        <stop offset="5%" stopColor="#f00" />
        <stop offset="25%" stopColor="#ff0" />
        <stop offset="42%" stopColor="#0f0" />
        <stop offset="54%" stopColor="#0ff" />
        <stop offset="75%" stopColor="#00f" />
        <stop offset="95%" stopColor="#f0f" />
      </linearGradient>
    </defs>
  );
};

const MedalIcon = ({
  type = '',
  level = 0,
  levelText = '',
}) =>
  <svg className={`medals__icon medals__icon--${type} medals__icon--level-${level}`} viewBox="6 0 36 48">
    <Gradient level={level} />
    <polygon className="rear-band" points="17.125,4 10.125,4 20.125,22 27.125,22"/>
    <polygon className="front-band" points="31.125,4 21.125,22 28.125,22 38.125,4"/>
    <polygon className="front-band-shadow" points="22.953,14.438 19.509,20.861 20.626,23.042 24.109,16.609"/>
    <circle className="outer-circle" cx="24.125" cy="33" r="12"/>
    <circle className="inner-circle" cx="24.125" cy="33" r="10"/>
    <text className="level-text" textAnchor="middle" x="24" y="39">{levelText}</text>
  </svg>;

export default MedalIcon;
