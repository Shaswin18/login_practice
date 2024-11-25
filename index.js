const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Login endpoint
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ user: data.user });
});

// Logout endpoint
app.post('/auth/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ message: 'Logged out successfully' });
});


// Middleware to check authentication
const authenticateUser = async (req, res, next) => {
    const { data, error } = await supabase.auth.getUser();
    if (error) return res.status(401).json({ error: 'Please log in.' });

    req.user = data.user;
    next();
};

// Token verification endpoint
app.get('/auth/verify-user', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'User has been verified.', user: req.user });
});

// Protected route example
app.get('/api/secret-message', authenticateUser, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('secret_message')
        .select('*')
        .eq('id', 1)
        .single()
  
      if (error) {
        console.error('Error fetching secret message:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve secret message' });
      }
  console.log(data)
      res.send(data)
    } catch (error) {
      console.error('Unexpected error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));