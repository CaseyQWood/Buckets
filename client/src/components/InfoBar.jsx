import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import onlineIcon from '../icons/onlineIcon.png';
import ClearIcon from '@material-ui/icons/Clear';

import '../styles/InfoBar.scss';

const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <div>{room}</div>
    </div>
    <div className="rightInnerContainer">
      <ClearIcon />
    </div>
  </div>
);

export default InfoBar;