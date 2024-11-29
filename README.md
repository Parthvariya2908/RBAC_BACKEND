# RBAC Backend API

## Overview
This is a backend implementation of Role-Based Access Control (RBAC) for a web application. The API allows users to register, log in, and access resources based on their assigned roles (Admin, Moderator, User). The system is designed to provide a secure and modular way to handle user authentication, authorization, and role-based access to various resources.

## Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (NoSQL)
- **Authentication:** JWT (JSON Web Tokens) for secure session management
- **RBAC:** Role-Based Access Control (Admin, Moderator, User)
- **Password Security:** bcrypt for password hashing
- **Environment Configuration:** .env file for managing sensitive information

## Installation

### Prerequisites
- Node.js >= 14.x
- MongoDB running locally or MongoDB Atlas (cloud database)
- Optional: Redis for session caching or use in future implementations

### Steps to Run the Project

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/rbac-backend.git
    cd rbac-backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file in the root of the project and add the following environment variables:**
    ```plaintext
    PORT=8000
    NODE_ENV=development
    DB_URL=mongodb://localhost:27017/rbacApp
    JWT_SECRET=your-jwt-secret
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

## Authentication & Authorization

### JWT Authentication
- **Login:** After successful authentication, a JWT token is generated and returned to the user.
- **Usage:** To access protected routes, include the token in the Authorization header:
    ```plaintext
    Authorization: Bearer <JWT_TOKEN>
    ```

### Role-Based Access Control (RBAC)
- Users are assigned roles (Admin, Moderator, or User) during registration.
- Based on these roles, access to routes is restricted using middleware functions like `isAuthenticated` and `authorizeRoles`.

## Middleware Functions

- **isAuthenticated:** Ensures that the user is logged in and the JWT token is valid.
- **authorizeRoles:** Ensures the user has the required role to access specific resources.

## Role-Based Access Examples

- **Admin** can access and modify all resources.
- **Moderator** can access and modify content but not user management.
- **User** can only access content-specific resources like posts, comments, etc.

## API Endpoints

### User Authentication

- **POST /api/auth/register:** Registers a new user.
    - **Request Body:** `{ "email": "user@example.com", "password": "password" }`
    - **Response:** `200 OK` with `{ "message": "Registration successful" }`

- **POST /api/auth/login:** Logs in a user and returns a JWT token.
    - **Request Body:** `{ "email": "user@example.com", "password": "password" }`
    - **Response:** `200 OK` with `{ "token": "<JWT_TOKEN>" }`

### Protected Routes

#### User Profile

- **GET /api/profile:** Fetch the authenticated user's profile.
    - **Requires:** isAuthenticated
    - **Response:** `200 OK` with `{ "user": { "email": "user@example.com", "role": "user" } }`

- **PUT /api/profile/update:** Update user details (email, password, etc.).
    - **Requires:** isAuthenticated
    - **Request Body:** `{ "email": "new-email@example.com", "password": "new-password" }`
    - **Response:** `200 OK` with `{ "message": "Profile updated successfully" }`

### Admin Routes

- **POST /api/admin/update-role/:id:** Update the role of a user (admin, user, moderator).
    - **Requires:** isAuthenticated, authorizeRoles("admin")
    - **Request Body:** `{ "role": "admin" }`
    - **Response:** `200 OK` with `{ "message": "User role updated successfully" }`

- **GET /api/admin/users:** List all users (admin only).
    - **Requires:** isAuthenticated, authorizeRoles("admin")
    - **Response:** `200 OK` with `{ "users": [...] }`

- **DELETE /api/admin/delete-user/:id:** Delete a user by ID (admin only).
    - **Requires:** isAuthenticated, authorizeRoles("admin")
    - **Response:** `200 OK` with `{ "message": "User deleted successfully" }`

### Content-Specific Routes

- **GET /api/content:** Fetch all public content (available to all roles).
    - **Response:** `200 OK` with `{ "content": [...] }`

- **POST /api/content/create:** Create new content (requires "moderator" or "admin").
    - **Requires:** isAuthenticated, authorizeRoles("admin", "moderator")
    - **Request Body:** `{ "title": "New Content", "description": "Content details" }`
    - **Response:** `201 Created` with `{ "message": "Content created successfully" }`

## Security Best Practices

### Password Hashing
- Passwords are securely hashed using bcrypt before storing them in the database.

### JWT
- JSON Web Tokens (JWT) are used for secure authentication and authorization, ensuring that only users with valid tokens can access protected routes.

### Role-Based Access Control
- Access to routes is restricted based on user roles. Admins have full access, moderators have limited content control, and regular users have access to basic content.
