# AIO Login Web Application

A complete login and signup web application for the AIO website with **real database storage**.

## Features

- User registration with email and password
- User login with username and password
- **SQLite database** for persistent user storage
- **Password hashing** with bcrypt for security
- User authentication and session management
- Responsive design
- RESTful API endpoints

## Database Storage

**User data is now stored in a SQLite database (`users.db`)** with the following structure:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- Hashed with bcrypt
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Files Structure

```
AIO_login_webapp/
├── index.html              # Login page
├── signup.html             # Signup page
├── dashboard.html          # Dashboard (after successful login)
├── style.css              # Styling for all pages
├── script.js              # Login functionality (API calls)
├── signup.js              # Signup functionality (API calls)
├── server.js              # Node.js server with database
├── package.json           # Node.js dependencies
├── view-database.js       # Script to view database contents
├── users.db               # SQLite database (created automatically)
└── README.md              # This file
```

## Installation & Setup

1. **Install Node.js dependencies:**
   ```bash
   cd AIO_login_webapp
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - Open your browser and go to `http://localhost:3000`
   - The server will automatically create the database file

## How to Use

1. **Open the application**: Go to `http://localhost:3000`
2. **Sign up**: Click "Sign up here" to create a new account
3. **Login**: Use your username and password to log in
4. **Dashboard**: After successful login, you'll be redirected to the dashboard
5. **Logout**: Click the logout button to sign out

## API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/users` - Get all users (for admin)

## Database Operations

### View Database Contents
```bash
node view-database.js
```

### Database Location
- **File**: `users.db` (SQLite database file)
- **Location**: Same directory as `server.js`
- **Auto-created**: When you first run the server

### Database Schema
```sql
users table:
- id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- username (TEXT, UNIQUE, NOT NULL)
- email (TEXT, UNIQUE, NOT NULL)  
- password (TEXT, NOT NULL) - bcrypt hashed
- created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **Input Validation**: Server-side validation for all inputs
- **Unique Constraints**: Username and email must be unique
- **Error Handling**: Proper error messages for different scenarios

## User Flow

1. **New User**: 
   - Goes to signup page
   - Creates account with username, email, and password
   - Password is hashed and stored in database
   - Gets redirected to login page
   - Logs in with credentials
   - Accesses dashboard

2. **Existing User**:
   - Goes directly to login page
   - Enters username and password
   - If user doesn't exist in database, gets prompted to sign up
   - If login successful, accesses dashboard

## Technical Details

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **Database**: SQLite with sqlite3 package
- **Authentication**: bcrypt for password hashing
- **API**: RESTful endpoints
- **Session Management**: localStorage for current user

## Development

### Start Development Server
```bash
npm run dev  # Uses nodemon for auto-restart
```

### View Database
```bash
node view-database.js
```

### Reset Database
```bash
rm users.db  # Delete database file
npm start    # Recreate database
```

## Production Considerations

For production deployment, consider:

- Use HTTPS
- Implement JWT tokens for sessions
- Add rate limiting
- Use environment variables for configuration
- Implement proper logging
- Add database backups
- Use a production database (PostgreSQL, MySQL)
- Add CSRF protection
- Implement password reset functionality

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript (async/await)
- Fetch API
- localStorage API
- CSS Flexbox 