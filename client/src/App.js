import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Analytics from "./pages/Analytics.jsx";
import Messages from "./pages/messages";
import Join from "./components/Join.jsx";
import Chat from "./components/Chat.jsx";
import Budget1 from "./pages/budget1";
import Home from "./pages/Home";

import { useContext } from "react";
import { analyiticsContext } from "./providers/AnalyticsProvider";
import { authContext } from "./providers/AnalyticsProvider";
import AnalyticsProvider from "./providers/AnalyticsProvider";
import AuthProvider from "./providers/AuthProvider";

// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// currently the commented out section was just for testing base 3d object dependancies ahead of time please disregard

function App() {
  return (
    <>
      <Router>
          <AuthProvider>
          <Route exact={true} path="/" component={Home} /> 
          <Route exact={true} path="/login" component={Login} />  
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/profile" component={Profile} />
          <Route exact={true} path="/budget" component={Budget1} />
          <Route exact={true} path="/expertjoin" component={Join} />
          <Route exact={true} path="/chat" component={Chat} />
          <Route exact={true} path="/messages" component={Messages} />
          
          <AnalyticsProvider>
            <Route exact={true} path="/analytics" component={Analytics} />
          </AnalyticsProvider>
          
          </AuthProvider>
      </Router>
    </>
  );
}

export default App;
