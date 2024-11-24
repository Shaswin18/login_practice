# Authentication API Documentation

A RESTful API for user authentication. This API provides endpoints for user registration, login, logout, and a single protected route.

## API Endpoints

### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "securepassword"
}
```

**Success Response (201):**
```json
{
    "user": {
        "id": "user_id",
        "email": "user@example.com",
        "aud": "authenticated",
        "created_at": "timestamp"
    }
}
```

**Error Response (400):**
```json
{
    "error": "Email and password are required"
}
```

### POST /auth/login
Authenticate a user and receive a session token.

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
        "id": "user_id",
        "email": "user@example.com",
        "aud": "authenticated",
        "created_at": "timestamp"
    },
    "session": {
        "access_token": "jwt_token",
        "refresh_token": "refresh_token",
        "expires_in": 3600
    }
}
```

**Error Response (401):**
```json
{
    "error": "Invalid login credentials"
}
```

### POST /auth/logout
Log out the current user and invalidate their session.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
    "message": "Logged out successfully"
}
```

**Error Response (401):**
```json
{
    "error": "Invalid or expired token"
}
```

### GET /api/verify-token
Verify if the current authentication token is valid.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
    "message": "Token is valid",
    "user": {
        "id": "user_id",
        "email": "user@example.com",
        "aud": "authenticated",
        "created_at": "timestamp"
    }
}
```

**Error Response (401):**
```json
{
    "error": "Invalid or expired token"
}
```

### GET /api/protected
Example protected route that requires authentication.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
    "message": "This is a protected route",
    "user": {
        "id": "user_id",
        "email": "user@example.com",
        "aud": "authenticated",
        "created_at": "timestamp"
    }
}
```

**Error Response (401):**
```json
{
    "error": "Authorization header is required"
}
```

## Authentication

All protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

The token is obtained from the login endpoint and should be included in all subsequent requests to protected endpoints.

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 500: Internal server error

Common error responses follow this format:
```json
{
    "error": "Description of the error"
}
```
