import './App.css';
import React, { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import Coin from './SuperMarioCoinglb'
import {OrbitControls} from "@react-three/drei"
import axios from "axios";
import React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile';
import Budget from './pages/budget';

// currently the commented out section was just for testing base 3d object dependancies ahead of time please disregard


function App() {
  useEffect(() => {axios.post('/api/categories', {
    name: "test",
    budget_id: 5,
    spending_limit: 1000
  })}) 
  return (
    <Router>
      <Route exact={true} path='/login' component={Login}/>
      <Route exact={true} path='/register' component={Register}/>
      <Route exact={true} path='/profile' component={Profile}/>
      <Route exact={true} path='/budget' component={Budget}/>
      <Route />
    </Router>
  );
}

export default App;
