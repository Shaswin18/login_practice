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
        "id": "ed9d63b4-0b3e-4a36-92c7-f8b1948433d2",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "user@example.com",
        "phone": "",
        "confirmation_sent_at": "2024-11-24T04:07:11.274997933Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {
            "email": "user@example.com",
            "email_verified": false,
            "phone_verified": false,
            "sub": "ed9d67b4-0b3e-4a36-95c7-f8b1948483d2"
        },
        "identities": [
            {
                "identity_id": "6d7211bc-2155-4932-bad3-8ce6fae8924c",
                "id": "ed9d67b4-0b3e-4a36-95c7-f8b1948483d2",
                "user_id": "ed9d67b4-0b3e-4a36-95c7-f8b1948483d2",
                "identity_data": {
                    "email": "user@example.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "ed9d67b4-0b3e-4a36-95c7-f8b1948483d2"
                },
                "provider": "email",
                "last_sign_in_at": "2024-11-24T04:07:11.269882728Z",
                "created_at": "2024-11-24T04:07:11.269938Z",
                "updated_at": "2024-11-24T04:07:11.269938Z",
                "email": "user@example.com"
            }
        ],
        "created_at": "2024-11-24T04:07:11.262009Z",
        "updated_at": "2024-11-24T04:07:12.12523Z",
        "is_anonymous": false
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
        "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "user@example.com",
        "email_confirmed_at": "2024-10-28T02:10:37.573637Z",
        "phone": "",
        "confirmed_at": "2024-10-28T02:10:37.573637Z",
        "last_sign_in_at": "2024-11-24T04:26:03.076729841Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {},
        "identities": [
            {
                "identity_id": "a2450ce0-c342-4b15-89c8-21cbb40438b8",
                "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
                "user_id": "c8460792-bf38-405a-a8c6-aefa545027bb",
                "identity_data": {
                    "email": "user@example.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "c8460792-bf38-405a-a8c6-aefa545027bb"
                },
                "provider": "email",
                "last_sign_in_at": "2024-10-28T02:10:37.56805Z",
                "created_at": "2024-10-28T02:10:37.568104Z",
                "updated_at": "2024-10-28T02:10:37.568104Z",
                "email": "user@example.com"
            }
        ],
        "created_at": "2024-10-28T02:10:37.562985Z",
        "updated_at": "2024-11-24T04:26:03.081256Z",
        "is_anonymous": false
    },
    "session": {
        "access_token": "ACCESS_TOKEN",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": 1732425963,
        "refresh_token": "REFRESH_TOKEN",
        "user": {
            "id": "c8460d92-bf38-4a5a-a8c6-aefa545027bb",
            "aud": "authenticated",
            "role": "authenticated",
            "email": "user@example.com",
            "email_confirmed_at": "2024-10-28T02:10:37.573637Z",
            "phone": "",
            "confirmed_at": "2024-10-28T02:10:37.573637Z",
            "last_sign_in_at": "2024-11-24T04:26:03.076729841Z",
            "app_metadata": {
                "provider": "email",
                "providers": [
                    "email"
                ]
            },
            "user_metadata": {},
            "identities": [
                {
                    "identity_id": "a2450ce0-c3d2-4b15-89c8-21cbb40438b8",
                    "id": "c8460792-bf38-405a-s8c6-aefa545027bb",
                    "user_id": "c8460792-bf38-405a-a8c6-aefa545027bb",
                    "identity_data": {
                        "email": "user@example.com",
                        "email_verified": false,
                        "phone_verified": false,
                        "sub": "c8460792-bf38-405a-a8c6-aefa545027bb"
                    },
                    "provider": "email",
                    "last_sign_in_at": "2024-10-28T02:10:37.56805Z",
                    "created_at": "2024-10-28T02:10:37.568104Z",
                    "updated_at": "2024-10-28T02:10:37.568104Z",
                    "email": "user@example.com"
                }
            ],
            "created_at": "2024-10-28T02:10:37.562985Z",
            "updated_at": "2024-11-24T04:26:03.081256Z",
            "is_anonymous": false
        }
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

### GET /auth/verify-token
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
        "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "user@example.com",
        "email_confirmed_at": "2024-10-28T02:10:37.573637Z",
        "phone": "",
        "confirmed_at": "2024-10-28T02:10:37.573637Z",
        "last_sign_in_at": "2024-11-24T04:32:03.897481Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {},
        "identities": [
            {
                "identity_id": "a2450ce0-c342-4b15-89c8-21cbb40438b8",
                "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
                "user_id": "c8460792-bf38-405a-a8c6-aefa545027bb",
                "identity_data": {
                    "email": "tester1@test.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "c8460792-bf38-405a-a8c6-aefa545027bb"
                },
                "provider": "email",
                "last_sign_in_at": "2024-10-28T02:10:37.56805Z",
                "created_at": "2024-10-28T02:10:37.568104Z",
                "updated_at": "2024-10-28T02:10:37.568104Z",
                "email": "user@example.com"
            }
        ],
        "created_at": "2024-10-28T02:10:37.562985Z",
        "updated_at": "2024-11-24T04:32:03.900175Z",
        "is_anonymous": false
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
        "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "user@example.com",
        "email_confirmed_at": "2024-10-28T02:10:37.573637Z",
        "phone": "",
        "confirmed_at": "2024-10-28T02:10:37.573637Z",
        "last_sign_in_at": "2024-11-24T04:32:03.897481Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {},
        "identities": [
            {
                "identity_id": "a2450ce0-c342-4b15-89c8-21cbb40438b8",
                "id": "c8460792-bf38-405a-a8c6-aefa545027bb",
                "user_id": "c8460792-bf38-405a-a8c6-aefa545027bb",
                "identity_data": {
                    "email": "user@example.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "c8460792-bf38-405a-a8c6-aefa545027bb"
                },
                "provider": "email",
                "last_sign_in_at": "2024-10-28T02:10:37.56805Z",
                "created_at": "2024-10-28T02:10:37.568104Z",
                "updated_at": "2024-10-28T02:10:37.568104Z",
                "email": "user@example.com"
            }
        ],
        "created_at": "2024-10-28T02:10:37.562985Z",
        "updated_at": "2024-11-24T04:32:03.900175Z",
        "is_anonymous": false
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
