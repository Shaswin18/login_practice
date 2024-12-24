import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Logging from './components/Logging';
import Welcome from './components/Welcome'; // Ensure this is correctly imported
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [secretMessage, setSecretMessage] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setSecretMessage(''); // Clear secret message on logout
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {user ? (
            <Welcome user={user} onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/logged-in" exact>
          {user ? (
            <Logging email={user.email} secretMessage={secretMessage} onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;