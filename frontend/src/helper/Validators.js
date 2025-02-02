export function validateName(input) {
    // allow only characters in regex
    return input.length > 0 && input.length < 255 && /^[a-z]+$/i.test(input);
}

export function validateMail(input) {
    // taken from https://www.mailercheck.com/articles/email-validation-javascript
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}
