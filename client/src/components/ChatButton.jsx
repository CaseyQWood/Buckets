import React from "react";
import "../styles/ChatButton.scss";

export default function ChatButton(props) {
  return (
      <div className="wrapper screen innerdiv" onClick={props.onClick}>
        <div className="icon facebook">
          <div className="tooltip">Help?</div>
          <span>
          <img
            src="https://img1.wsimg.com/dc-assets/live-engage/images/chat-baloon.svg"
            alt="Contact Us"
          ></img>
          </span>
        </div>
      </div>  
  );
}
