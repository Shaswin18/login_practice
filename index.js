const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const setRefreshTokenCookie = (res, refreshToken) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
    };

    res.cookie('refresh_token', refreshToken, cookieOptions);
};

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

        setRefreshTokenCookie(res, data.session.refresh_token);

        return res.status(200).json({
            user: data.user,
            access_token: data.session.access_token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// THIS WON'T WORK UNTIL I SET A SPECIFIC CORS ORIGIN
app.post('/auth/refresh', async (req, res) => {
    const stored_refresh_token = req.cookies.refresh_token;

    if (!stored_refresh_token) {
        return res.status(401).json({ error: 'No refresh token provided.' });
    }

    try {
        const { data, error } = await supabase.auth.refreshSession({ refresh_token: stored_refresh_token });

        if (error) throw error;

        const { access_token, refresh_token } = data.session;

        setRefreshTokenCookie(res, refresh_token);

        res.json({ access_token: access_token });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(401).json({ error: 'Error refreshing token.'});
    }
});

app.post('/auth/logout', async (req, res) => {
    try {
        const access_token = req.headers.authorization?.replace('Bearer ', '');

        if (!access_token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const { error } = await supabase.auth.admin.signOut(access_token);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

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

app.get('/auth/verify-user', authenticateUser, (req, res) => {
    res.status(200).json({ user: req.user });
});

app.get('/api/secret-message', authenticateUser, async (req, res) => {
    try {
        const { data, error } = await supabase
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