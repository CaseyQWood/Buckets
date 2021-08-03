import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';

import '../styles/InfoBar.scss';

const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <div>{room}</div>
    </div>
    <div className="rightInnerContainer">
      <a href="/profile"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;