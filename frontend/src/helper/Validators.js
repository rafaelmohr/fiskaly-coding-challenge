export function validateName(input) {
    // allow only characters in regex
    return input.length > 0 && input.length < 255 && /^[a-z]+$/i.test(input);
}

export function validateMail(input) {
    // taken from https://www.mailercheck.com/articles/email-validation-javascript
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

export function validateUUID(input) {
    // taken from https://uibakery.io/regex-library/uuid
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input);
}
