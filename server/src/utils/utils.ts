export function generateConfirmationCode() {
    return String(Math.floor(1000 + Math.random() * 9000))
}