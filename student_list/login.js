document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessageElement = document.getElementById('errorMessage');

    // --- DEMONSTRATION PURPOSES ONLY ---
    // In a real application, you ABSOLUTELY DO NOT hardcode passwords here.
    // Credentials should be sent to a secure backend API for verification.
    const CORRECT_USERNAME = 'user'; // Hardcoded username for demonstration
    const CORRECT_PASSWORD = 'password123'; // Hardcoded password for demonstration
    // --- END DEMONSTRATION ---

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            errorMessageElement.style.display = 'none'; // Hide previous errors
            errorMessageElement.textContent = '';

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // --- LOCAL "LOGIN" VERIFICATION FOR DEMONSTRATION ---
            if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
                alert('Login successful! Redirecting to dashboard.');
                // Redirect to the student dashboard page
                window.location.href = 'dashboard.html';
            } else {
                errorMessageElement.textContent = 'Invalid username or password. Please try again.';
                errorMessageElement.style.display = 'block';
            }
            // --- END LOCAL VERIFICATION ---

            // --- REAL-WORLD SCENARIO (COMMENTED OUT) ---
            // In a real application, you would do something like this:
            /*
            try {
                const API_BASE_URL = 'http://localhost/api'; // Your actual API base URL
                const response = await fetch(${API_BASE_URL}/login.php, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Network error or unexpected response' }));
                    throw new Error(errorData.message || 'Login failed!');
                }

                const result = await response.json();
                if (result.success) { // Adjust 'success' based on your API's response
                    // localStorage.setItem('authToken', result.token); // Save token if your API provides one
                    alert('Login successful! Redirecting to dashboard.');
                    window.location.href = 'dashboard.html';
                } else {
                    errorMessageElement.textContent = result.message || 'Login failed. Please check your credentials.';
                    errorMessageElement.style.display = 'block';
                }

            } catch (error) {
                console.error('Login error:', error);
                errorMessageElement.textContent = error.message || 'An unexpected error occurred during login.';
                errorMessageElement.style.display = 'block';
            }
            */
            // --- END REAL-WORLD SCENARIO ---
        });
    }
});
