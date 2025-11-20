const fs = require('fs');
const crypto = require('crypto');

// Configuration
const numberOfCodes = 10;      // How many codes to generate
const codeLength = 12;         // Length of each code (excluding dashes)
const groupSize = 4;           // How many characters before a dash

// Function to create a random alphanumeric string
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const randomBytes = crypto.randomBytes(length); // Secure random bytes
    
    for (let i = 0; i < length; i++) {
        // Map the random byte to a character in our list
        const randomIndex = randomBytes[i] % chars.length;
        result += chars[randomIndex];
    }
    return result;
}

// Function to format string with dashes (e.g., XXXX-XXXX-XXXX)
function formatCode(str, chunkSize) {
    const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
    return str.match(regex).join('-');
}

// Main execution
console.log(`Generating ${numberOfCodes} random codes...`);

let outputData = `--- GENERATED CODES (${new Date().toLocaleString()}) ---\n`;

for (let i = 0; i < numberOfCodes; i++) {
    const rawString = generateRandomString(codeLength);
    const formatted = formatCode(rawString, groupSize);
    outputData += `${formatted}\n`;
    console.log(`[${i + 1}] ${formatted}`);
}

// Save to file
fs.writeFileSync('codes.txt', outputData);
console.log(`\nSuccess! Codes saved to 'codes.txt'`);
