const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Configure CORS properly
app.use(cors({
    origin: process.env.CLIENT_URL || '*', // In production, set this to your frontend URL
    credentials: true
}));
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Login endpoint - now returns the session token
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        // Return both user data and access token
        return res.status(200).json({
            user: data.user,
            access_token: data.session.access_token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout endpoint - now requires token
app.post('/auth/logout', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Create a new Supabase client with the user's token
        const userSupabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        );

        const { error } = await userSupabase.auth.signOut();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Updated authentication middleware
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Verify the token and get user data
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Attach user and token to request object
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

// Token verification endpoint
app.get('/auth/verify-user', authenticateUser, (req, res) => {
    res.status(200).json({ user: req.user });
});

// Protected route example
app.get('/api/secret-message', authenticateUser, async (req, res) => {
    try {
        // Create a new Supabase client with the user's token
        const userSupabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${req.token}`
                    }
                }
            }
        );

        const { data, error } = await userSupabase
            .from('secret_message')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.error('Error fetching secret message:', error.message);
            return res.status(500).json({ error: 'Failed to retrieve secret message' });
        }

        res.json(data);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));