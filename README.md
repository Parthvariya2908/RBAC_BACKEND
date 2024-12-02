# RBAC Backend API with Audit Log Management

This is a backend implementation of Role-Based Access Control (RBAC) for a web application. The API allows users to register, log in, and access resources based on their assigned roles (Admin, Moderator, User). The system is designed to provide a secure and modular way to handle user authentication, authorization, and role-based access to various resources. Additionally, an Audit Log Management system is implemented to track key user actions, such as login, registration, role updates, and content creation.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens) for secure session management
- **RBAC**: Role-Based Access Control (Admin, Moderator, User)
- **Password Security**: bcrypt for password hashing
- **Audit Logging**: Capturing and storing user actions (login, registration, role updates, etc.)
- **Environment Configuration**: .env file for managing sensitive information

## Installation

### Prerequisites

- Node.js >= 14.x
- MongoDB running locally or MongoDB Atlas (cloud database)
- Optional: Redis for session caching (can be added in future implementations)

### Steps to Run the Project

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/rbac-backend.git
    cd rbac-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a .env file** in the root of the project and add the following environment variables:

    ```env
    PORT=8000
    NODE_ENV=development
    DB_URL=mongodb://localhost:27017/rbacApp
    JWT_SECRET=your-jwt-secret
    ```

4. **Start the server**:

    ```bash
    npm start
    ```

## Authentication & Authorization

### JWT Authentication

- **Login**: After successful authentication, a JWT token is generated and returned to the user.

- **Usage**: To access protected routes, include the token in the Authorization header:

    ```text
    Authorization: Bearer <JWT_TOKEN>
    ```

### Role-Based Access Control (RBAC)

- Users are assigned roles (Admin, Moderator, or User) during registration.

- **Middleware Functions**:
  - `isAuthenticated`: Ensures that the user is logged in and the JWT token is valid.
  - `authorizeRoles`: Ensures the user has the required role to access specific resources.

### Role-Based Access Examples

- **Admin**: Can access and modify all resources.
- **Moderator**: Can access and modify content but not user management.
- **User**: Can only access content-specific resources like posts, comments, etc.

## API Endpoints

### User Authentication

- **POST /api/auth/register**: Registers a new user.

    **Request Body**:

    ```json
    {
        "email": "user@example.com",
        "password": "password"
    }
    ```

    **Response**:

    ```json
    {
        "message": "Registration successful"
    }
    ```

- **POST /api/auth/login**: Logs in a user and returns a JWT token.

    **Request Body**:

    ```json
    {
        "email": "user@example.com",
        "password": "password"
    }
    ```

    **Response**:

    ```json
    {
        "token": "<JWT_TOKEN>"
    }
    ```

### Protected Routes

- **GET /api/profile**: Fetch the authenticated user's profile.

    **Requires**: `isAuthenticated`

    **Response**:

    ```json
    {
        "user": {
            "email": "user@example.com",
            "role": "user"
        }
    }
    ```


### Admin Routes

- **POST /api/admin/update-role/:id**: Update the role of a user (admin, user, moderator).

    **Requires**: `isAuthenticated`, `authorizeRoles("admin")`

    **Request Body**:

    ```json
    {
        "role": "admin"
    }
    ```

    **Response**:

    ```json
    {
        "message": "User role updated successfully"
    }
    ```

- **GET /api/admin/users**: List all users (admin only).

    **Requires**: `isAuthenticated`, `authorizeRoles("admin")`

    **Response**:

    ```json
    {
        "users": [...]
    }
    ```

- **DELETE /api/admin/delete-user/:id**: Delete a user by ID (admin only).

    **Requires**: `isAuthenticated`, `authorizeRoles("admin")`

    **Response**:

    ```json
    {
        "message": "User deleted successfully"
    }
    ```

### Content-Specific Routes

- **GET /api/content**: Fetch all public content (available to all roles).

    **Response**:

    ```json
    {
        "content": [...]
    }
    ```

- **POST /api/content/create**: Create new content (requires "moderator" or "admin").

    **Requires**: `isAuthenticated`, `authorizeRoles("admin", "moderator")`

    **Request Body**:

    ```json
    {
        "title": "New Content",
        "description": "Content details"
    }
    ```

    **Response**:

    ```json
    {
        "message": "Content created successfully"
    }
    ```

## Audit Log Management

- Audit logs track user actions such as login, registration, role updates, and content creation.

### Model: `AuditLog` stores the following details:

- `user`: The user performing the action
- `action`: Type of action (e.g., "register", "update-role", "content-create")
- `target`: The resource being affected (e.g., a user or content)
- `description`: A detailed description of the action
- `timestamp`: The time of the action

### Routes for Admin:

- **GET /api/admin/audit-logs**: Fetch all audit logs (only accessible by admins)

### Example of Log Usage:

- **Logging a User Registration**:

    When a user registers, an entry is added to the Audit Log with the action "register".

    ```javascript
    await logAction(newUser, "register", newUser, "User registered successfully");
    ```

- **Logging a Role Update**:

    When an admin updates a user's role, an entry is added with the action "update-role".

    ```javascript
    await logAction(req.user, "update-role", user, `Updated role to ${role}`);
    ```

## Security Best Practices

- **Password Hashing**: Passwords are securely hashed using bcrypt before storing them in the database.
- **JWT**: JSON Web Tokens (JWT) are used for secure authentication and authorization, ensuring that only users with valid tokens can access protected routes.
- **Role-Based Access Control**: Access to routes is restricted based on user roles. Admins have full access, moderators have limited content control, and regular users have access to basic content.
- **Audit Logging**: Key actions are logged to ensure transparency, accountability, and security in the system.
