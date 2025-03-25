document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Validation patterns
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;

    // Add event listeners for real-time validation on registration form
    if (registerForm) {
        registerForm.username.addEventListener('input', validateUsername);
        registerForm.email.addEventListener('input', validateEmail);
        registerForm.password.addEventListener('input', validatePassword);
        registerForm['confirm-password'].addEventListener('input', validateConfirmPassword);
        registerForm.dob.addEventListener('input', validateDOB);
    }

    // Add event listeners for real-time validation on login form
    if (loginForm) {
        loginForm.email.addEventListener('input', validateLoginEmail);
        loginForm.password.addEventListener('input', validateLoginPassword);
    }

    function validateUsername() {
        const errorMessage = document.getElementById('username-error');
        if (!namePattern.test(registerForm.username.value)) {
            errorMessage.textContent = 'Username must contain only alphabetic characters without spaces or numbers.';
            errorMessage.style.color = 'red';
            return false;
        } else {
            errorMessage.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const errorMessage = document.getElementById('email-error');
        if (!emailPattern.test(registerForm.email.value)) {
            errorMessage.textContent = 'Enter a valid email address.';
            errorMessage.style.color = 'red';
            return false;
        } else {
            errorMessage.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        const errorMessage = document.getElementById('password-error');
        const passwordStrength = document.getElementById('passwordStrength');
        if (!passwordPattern.test(registerForm.password.value)) {
            errorMessage.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
            errorMessage.style.color = 'red';
            passwordStrength.textContent = '';
            return false;
        } else {
            errorMessage.textContent = '';
            const strength = getPasswordStrength(registerForm.password.value);
            passwordStrength.textContent = `Password Strength: ${strength}`;
            return true;
        }
    }

    function validateConfirmPassword() {
        const errorMessage = document.getElementById('confirm-password-error');
        if (registerForm.password.value !== registerForm['confirm-password'].value) {
            errorMessage.textContent = 'Passwords do not match.';
            errorMessage.style.color = 'red';
            return false;
        } else {
            errorMessage.textContent = '';
            return true;
        }
    }

    function validateDOB() {
        const errorMessage = document.getElementById('dob-error');
        const today = new Date();
        const dobDate = new Date(registerForm.dob.value);
        const age = today.getFullYear() - dobDate.getFullYear();
        const month = today.getMonth() - dobDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        if (age < 18) {
            errorMessage.textContent = 'You must be at least 18 years old to register.';
            errorMessage.style.color = 'red';
            return false;
        } else {
            errorMessage.textContent = '';
            return true;
        }
    }

    function validateLoginEmail() {
        const errorMessage = document.getElementById('login-email-error');
        if (!emailPattern.test(loginForm.email.value)) {
            errorMessage.textContent = 'Enter a valid email address.';
            errorMessage.style.color = 'red';
            return false;
        } else {
            errorMessage.textContent = '';
            return true;
        }
    }

    function validateLoginPassword() {
        const errorMessage = document.getElementById('login-password-error');
        if (!passwordPattern.test(loginForm.password.value)) {
            errorMessage.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
            errorMessage.style.color = 'red';
            return false;
        } else {
            errorMessage.textContent = '';
            return true;
        }
    }

    function getPasswordStrength(password) {
        if (password.length >= 12) {
            return 'Strong';
        } else if (password.length >= 8) {
            return 'Moderate';
        } else {
            return 'Weak';
        }
    }
});
