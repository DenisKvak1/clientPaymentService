function validateCardFormat(cardNumber: string): boolean {
    const cardFormatRegExp = /^\d{13,19}$/;
    return cardFormatRegExp.test(cardNumber);
}
function validateLuhn(cardNumber: string): boolean {
    const digits = cardNumber.split('').map(Number);
    digits.reverse();
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];

        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    return sum % 10 === 0;
}

export function validateCardNumber(cardNumber: number): boolean {
    const cardNumberString = cardNumber.toString()
    if (!validateCardFormat(cardNumberString)) {
        return false;
    }
    return validateLuhn(cardNumberString);
}
