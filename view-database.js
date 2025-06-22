const sqlite3 = require('sqlite3').verbose();

// Open the database
const db = new sqlite3.Database('./users.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the users database.');
});

// Query all users
const sql = 'SELECT id, username, email, created_at FROM users';

db.all(sql, [], (err, rows) => {
    if (err) {
        console.error('Error querying database:', err.message);
        return;
    }
    
    console.log('\n=== USERS IN DATABASE ===');
    if (rows.length === 0) {
        console.log('No users found in database.');
    } else {
        rows.forEach((row) => {
            console.log(`ID: ${row.id}`);
            console.log(`Username: ${row.username}`);
            console.log(`Email: ${row.email}`);
            console.log(`Created: ${row.created_at}`);
            console.log('---');
        });
    }
    
    console.log(`Total users: ${rows.length}`);
});

// Close the database
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
}); 