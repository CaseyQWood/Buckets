import React from "react";
import "../styles/ChatButton.scss";

export default function ChatButton(props) {
  return (
    <>
      <div class="wrapper screen innerdiv">
        <div class="icon facebook">
          <div class="tooltip">Help?</div>
          <span>
          <img
            src="https://img1.wsimg.com/dc-assets/live-engage/images/chat-baloon.svg"
            alt="Contact Us"
          ></img>
          </span>
        </div>
      </div>
    </>
  );
}
