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
Logs a user in and returns authentication token. Additionally, the refresh token is stored in an HtmlOnly cookie.

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

### POST /auth/refresh
Obtains a new access token


**Success Response (200):**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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