🔐 SecureText Encryptor – Pure JavaScript (Custom RSA, AES, DES)
This project demonstrates customized encryption techniques built entirely with HTML, CSS, and JavaScript, without using any cryptographic APIs or external libraries. It simulates the logic behind RSA, AES, and DES encryption.

📌 Project Overview
SecureText Encryptor allows users to:

Choose between three encryption types: *AES-like, **DES-like, and *RSA-like
Enter any text and encrypt/decrypt it
Work completely offline and run in any modern browsers.
🔧 Technologies Used
HTML5
CSS3
JavaScript
No external libraries or crypto APIs used
🔐 Encryption Techniques Used
✅ AES-like (XOR-Based)
Each character in the message is encrypted using a key via bitwise XOR operations, simulating block-based symmetric encryption.

✅ DES-like (Caesar Cipher Based)
Characters are shifted based on the key length, representing a basic symmetric substitution encryption style.

✅ RSA-like (Modular Math)
Simulates asymmetric encryption using small fixed primes and modular exponentiation to encrypt and decrypt characters individually.

