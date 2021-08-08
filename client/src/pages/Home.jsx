import React from 'react';
import NavBar from '../components/NavBar';
import useVisiblity from "../hooks/useVisiblity";
import ChatButton from "../components/ChatButton";
import NewChat from "../components/NewChat";

export default function Home() {
  const [ChatComponent, toggleVisibility] = useVisiblity(<NewChat />, false);
  return (
    <>
    <NavBar/>
    <ChatButton onClick={toggleVisibility} />
        {ChatComponent}
    </>
  )
}