document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = this.username.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value;

    // Clear previous messages
    clearMessage();

    // Validation
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long!', 'error');
        return;
    }

    if (!username || !email || !password) {
        showMessage('All fields are required!', 'error');
        return;
    }

    try {
        // Send registration request to API
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Registration successful
            showMessage('Account created successfully! Redirecting to login...', 'success');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Registration failed
            showMessage(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
});

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    
    const form = document.getElementById('signupForm');
    const messageContainer = document.getElementById('message') || document.createElement('div');
    messageContainer.id = 'message';
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageDiv);
    
    if (!document.getElementById('message')) {
        form.insertBefore(messageContainer, form.firstChild);
    }
}

function clearMessage() {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.innerHTML = '';
    }
} 