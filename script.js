document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = this.username.value.trim();
    const password = this.password.value;

    // Clear previous messages
    clearMessage();

    if (!username || !password) {
        showMessage('Please enter both username and password', 'error');
        return;
    }

    try {
        // Send login request to API
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful
            showMessage('Login successful! Welcome, ' + username + '!', 'success');
            
            // Store logged in user info
            localStorage.setItem('currentUser', JSON.stringify({
                ...data.user,
                loggedInAt: new Date().toISOString()
            }));

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            // Login failed
            if (data.error === 'User not found') {
                showMessage('User not found! Please sign up first.', 'error');
                setTimeout(() => {
                    if (confirm('Would you like to go to the signup page?')) {
                        window.location.href = 'signup.html';
                    }
                }, 1000);
            } else {
                showMessage(data.error || 'Login failed', 'error');
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
});

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageDiv);
}

function clearMessage() {
    const messageContainer = document.getElementById('message');
    if (messageContainer) {
        messageContainer.innerHTML = '';
    }
} 