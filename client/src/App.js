import './App.css';
import React, { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import Budget from './pages/budget';

import Join from './components/Join.jsx';
import Chat from './components/Chat.jsx';
import Budget1 from './pages/budget1';
import NavBar from './components/NavBar.jsx';



// currently the commented out section was just for testing base 3d object dependancies ahead of time please disregard


function App() {
  return (
    <>
    <Router>
      <NavBar/>
  
      <Route exact={true} path='/login' component={Login}/>
      <Route exact={true} path='/register' component={Register}/>
      <Route exact={true} path='/profile' component={Profile}/>
      <Route exact={true} path='/budget' component={Budget1}/>
      <Route exact={true} path='/expertjoin' component={Join}/>
      <Route exact={true} path='/chat' component={Chat}/>
    </Router>
    </>
  );
}

export default App;
