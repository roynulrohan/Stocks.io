export const validateRegisterInput = (username, password, confirmPassword) => {
    let errors = '';

    if (username.trim() === '') {
        errors = 'Username must not be empty.';
    }

    if (username.trim().length < 4 || username.trim().length > 12) {
        errors = 'Username must be between 4-12 characters';
    }

    if (password.trim() === '') {
        errors = 'Password must not be empty.';
    } else if (password !== confirmPassword) {
        errors = 'Passwords must match.';
    }

    return { valid: errors === '', errors };
};

export const validateLoginInput = (username, password) => {
    let errors = '';

    if (username.trim() === '') {
        errors = 'Username must not be empty.';
    }
    if (password.trim() === '') {
        errors = 'Password must not be empty.';
    }

    return { valid: errors === '', errors };
};
