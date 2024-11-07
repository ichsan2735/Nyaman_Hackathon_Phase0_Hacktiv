// Function to check login status and update header
function updateLoginStatus() {
    const loginButton = document.getElementById('login-button');
    const userGreeting = document.getElementById('user-greeting');
    const usernameDisplay = document.getElementById('username-display');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        loginButton.style.display = 'none';
        userGreeting.style.display = 'inline-block';
        usernameDisplay.textContent = loggedInUser;
    } else {
        loginButton.style.display = 'inline-block';
        userGreeting.style.display = 'none';
        usernameDisplay.textContent = '';
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem('loggedInUser');
    updateLoginStatus();
}

// Check login status when page loads
document.addEventListener('DOMContentLoaded', updateLoginStatus);