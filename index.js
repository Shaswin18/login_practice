const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Signup endpoint
app.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ user: data.user });
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ user: data.user, session: data.session });
});

// Logout endpoint
app.post('/auth/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ message: 'Logged out successfully' });
});


// Middleware to check authentication
const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const { data, error } = await supabase.auth.getUser(token);
    if (error) return res.status(401).json({ error: 'Invalid token' });

    req.user = data.user;
    next();
};

// Token verification endpoint
app.get('/api/verify-token', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
});

// Protected route example
app.get('/api/protected', authenticateUser, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));