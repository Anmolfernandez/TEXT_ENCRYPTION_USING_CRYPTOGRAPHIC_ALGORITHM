// Required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 3000;

// Encryption algorithm and initialization vector
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

// Hexadecimal key for encryption and decryption
const keyHexString = '7dc071e2888eb766e6e266e3316f8258b3c1119a2b45b5d9511ba2d610925e8c'; // Replace 'yourHexString' with your actual hexadecimal string key
const key = Buffer.from(keyHexString, 'hex');

// Middleware setup
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

// Encryption endpoint
app.post('/encrypt', async (req, res) => {
    const text = req.body.text;
    const encryptedText = await encrypt(text);
    res.json({ encryptedText });
});

// Decryption endpoint
app.post('/decrypt',async (req, res) => {
    const text = req.body.text;
    const decryptedText =await decrypt(text);
    res.json({ decryptedText });
});

// Function to encrypt text
async function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log('encrypted textt',encrypted);
   return encrypted;
    
}

// Function to decrypt text
async function decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('decrypteddd',decrypted);
    return decrypted;

}

// Start the server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
