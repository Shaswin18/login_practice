import React, { useEffect, useState } from 'react';
import './Welcome.css'; // Add styles for the welcome screen

const Welcome = ({ user, onLogout }) => {
  const [secretMessage, setSecretMessage] = useState('');

  useEffect(() => {
    const fetchSecretMessage = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/secret-message', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch secret message.');
        }

        const data = await response.json();
        setSecretMessage(data.secret_message);
      } catch (error) {
        console.error('Error fetching secret message:', error);
      }
    };

    fetchSecretMessage();
  }, []);

  return (
    <div className="welcome-container">
      <h2>Welcome, {user.email}!</h2>
      <p>{secretMessage}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Welcome;