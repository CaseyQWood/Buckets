import React, { useState } from "react";
// link to /chat path
import { Link } from "react-router-dom";
import "../styles/Join.scss";
import NewChat from "./NewChat";

const Join = () => {
  const [name, setName] = useState("test");
  const [room, setRoom] = useState("question");
  
  console.log("name-----", name);
  return (
    <>
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Your Question"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>

    {/* Refactor testing */}
    {/* <div className="mt-20" >
    <NewChat userName={name} question={room}/>
    </div> */}
    </>
  );
};

export default Join;
