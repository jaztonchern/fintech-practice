// Addition
function add(num1, num2) {
    return num1 + num2;
}

// Subtraction
function subtract(num1, num2) {
    return num1 - num2;
}

// Multiplication
function multiply(num1, num2) {
    return num1 * num2;
}

// Leap Year
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    } else {
        return false;
    }
}

// Unit Conversion
function inchesToCm(inches) {
    return inches * 2.54; // 1 inch is approximately 2.54 cm
}

// Is Null?
function isNullOrBlank(input) {
    return input === null || input.trim() === "";
}