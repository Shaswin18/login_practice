# Login Practice API Documentation

This API provides endpoints for user authentication and protected routes, supporting multiple concurrent users with secure session management.

## Base URL
`https://login-practice-125p.onrender.com/`

## Requirements
Build a responsive login page and welcome screen in [React](https://react.dev/); and integrate the API. The designs can be found in this [Figma](https://www.figma.com/design/0cz9VnEOKG9fCUwGAnbsqM/Login?t=iXBhhKkqChyMq3Pt-1), copy the design to the best of your ability.

1. The login page should use the provided API endpoints to log the user in.
2. Once logged in, the welcome screen should display the secret message from the secret message API endpoint and a logout button.
3. Host your app using any free solution and share the GitHub repository.

Other than React, you are free to use whatever technology you feel will make your job easier.

Recommended (but not obligatory):
- [Postman](https://www.postman.com/) for testing API calls
- [Netlify](https://www.netlify.com/), [AWS Amplify](https://aws.amazon.com/amplify/), [Vercel](https://vercel.com/) to host your web application

## API Endpoints

### POST /auth/login
Logs a user in and returns authentication token.

**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "securepassword"
}
```

**Success Response (200):**
```json
{
    "user": {
        "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
        "email": "user@example.com",
        // ... other user data
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // You'll need this for authenticated requests
}
```

**Error Response (401):**
```json
{
    "error": "Invalid login credentials"
}
```

### POST /auth/logout
Logs out the current user and invalidates their token.

**Headers Required:**
```
Authorization: Bearer <your_access_token>
```

**Success Response (200):**
```json
{
    "message": "Logged out successfully"
}
```

### GET /auth/verify-user
Verifies if the current token is valid.

**Headers Required:**
```
Authorization: Bearer <your_access_token>
```

**Success Response (200):**
```json
{
    "user": {
        "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
        "email": "user@example.com",
        // ... other user data
    }
}
```

### GET /api/secret-message
Protected route that requires authentication.

**Headers Required:**
```
Authorization: Bearer <your_access_token>
```

**Success Response (200):**
```json
{
    "id": 1,
    "created_at": "2024-11-25T00:31:40.662521+00:00",
    "secret_message": "SECRET_MESSAGE"
}
```

## Client Implementation Example

```javascript
// Login
const login = async (email, password) => {
    const response = await fetch('https://login-practice-125p.onrender.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    
    // Store the token securely
    localStorage.setItem('token', data.access_token);
    return data;
};

// Making authenticated requests
const getSecretMessage = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://login-practice-125p.onrender.com/api/secret-message', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

// Logout
const logout = async () => {
    const token = localStorage.getItem('token');
    await fetch('https://login-practice-125p.onrender.com/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    localStorage.removeItem('token');
};
```

## Important Notes

1. All authenticated requests must include the access token in the Authorization header
2. Tokens are required for all protected routes
3. Each user maintains their own separate session
4. The API supports multiple concurrent users
5. Invalid or expired tokens will receive a 401 response

For production implementations, consider:
- Using HTTP-only cookies instead of localStorage
- Implementing refresh token rotation
- Adding CSRF protection
- Setting up proper error handling
- Implementing rate limiting