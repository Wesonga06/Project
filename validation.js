document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Validation patterns
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateRegistration()) {
                alert('Registration successful! Redirecting to home page...');
                window.location.href = 'index.html';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateLogin()) {
                alert('Login successful! Redirecting to home page...');
                window.location.href = 'index.html';
            }
        });
    }

    function validateRegistration() {
        return validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword() && validateDOB();
    }

    function validateLogin() {
        return validateLoginEmail() && validateLoginPassword();
    }

    function validateUsername() {
        const errorMessage = document.getElementById('username-error');
        if (!namePattern.test(registerForm.username.value)) {
            errorMessage.textContent = 'Username must contain only alphabetic characters.';
            errorMessage.style.color = 'red';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }

    function validateEmail() {
        const errorMessage = document.getElementById('email-error');
        if (!emailPattern.test(registerForm.email.value)) {
            errorMessage.textContent = 'Enter a valid email address.';
            errorMessage.style.color = 'red';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }

    function validatePassword() {
        const errorMessage = document.getElementById('password-error');
        if (!passwordPattern.test(registerForm.password.value)) {
            errorMessage.textContent = 'Password must contain at least one uppercase, one lowercase, one digit, and one special character.';
            errorMessage.style.color = 'red';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }

    function validateConfirmPassword() {
        const errorMessage = document.getElementById('confirm-password-error');
        if (registerForm.password.value !== registerForm['confirm-password'].value) {
            errorMessage.textContent = 'Passwords do not match.';
            errorMessage.style.color = 'red';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }

    function validateDOB() {
        const errorMessage = document.getElementById('dob-error');
        const today = new Date();
        const dobDate = new Date(registerForm.dob.value);
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age < 18) {
            errorMessage.textContent = 'You must be at least 18 years old to register.';
            errorMessage.style.color = 'red';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }

    function validateLoginEmail() {
        const errorMessage = document.getElementById('login-email-error');
        if (!emailPattern.test(loginForm.email.value)) {
            errorMessage.textContent = 'Enter a valid email address.';
            errorMessage.style.color = 'red';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }

    function validateLoginPassword() {
        const errorMessage = document.getElementById('login-password-error');
        if (!passwordPattern.test(loginForm.password.value)) {
            errorMessage.textContent = 'Invalid password format.';
            errorMessage.style.color = 'red';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }
});
