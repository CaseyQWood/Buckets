import React from "react";
import SmsIcon from '@material-ui/icons/Sms';
import "../styles/ChatButton.scss";

export default function ChatButton(props) {
  return (
    <div className="chat-button-container">
      <div className="wrapper screen innerdiv" onClick={props.onClick}>
        <div className="icon facebook">
          <div className="tooltip">Help?</div>
          <span>
          <SmsIcon />
          </span>
        </div>
      </div>  
    </div>
  );
}
