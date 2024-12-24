import React from "react";
import './Logging.css';

const Logging = ({ email, secretMessage, onLogout }) => {
  return (
    <div className="logged-in-container">
      <div className="logged-in-left">
        <h2>You are now logged in</h2>
        <p>{email}</p>
        <p>{secretMessage}</p> {/* Display secret message */}
        <button className="sign-out-button" onClick={onLogout}>Sign out</button>
      </div>
      <div className="logged-in-right">
        <div className="sun"></div>
      </div>
    </div>
  );
};

export default Logging;