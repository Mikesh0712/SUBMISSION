
// AES
function aesLikeEncrypt(text, key) {
  let encrypted = '';
  for (let i = 0; i < text.length; i++) {
    encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(encrypted);
}

function aesLikeDecrypt(cipherText, key) {
  let text = atob(cipherText);
  let decrypted = '';
  for (let i = 0; i < text.length; i++) {
    decrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return decrypted;
}

// DES
function desLikeEncrypt(text, key) {
  const shift = key.length % 26;
  return text.split('').map(ch =>
    String.fromCharCode(ch.charCodeAt(0) + shift)
  ).join('');
}

function desLikeDecrypt(cipher, key) {
  const shift = key.length % 26;
  return cipher.split('').map(ch =>
    String.fromCharCode(ch.charCodeAt(0) - shift)
  ).join('');
}

// RSA
const rsaPublicKey = { e: 5, n: 187 };
const rsaPrivateKey = { d: 29, n: 187 };

function rsaLikeEncrypt(text) {
  return text.split('').map(ch => {
    let m = ch.charCodeAt(0);
    return Math.pow(m, rsaPublicKey.e) % rsaPublicKey.n;
  }).join(" ");
}

function rsaLikeDecrypt(cipher) {
  return cipher.split(' ').map(num => {
    let c = parseInt(num);
    return String.fromCharCode(Math.pow(c, rsaPrivateKey.d) % rsaPrivateKey.n);
  }).join('');
}

// UI Control
async function encrypt() {
  const algo = document.getElementById("algo").value;
  const text = document.getElementById("inputText").value;
  const key = document.getElementById("keyInput").value;

  let result = "";

  if (algo === "aes") {
    if (!key) return alert("Key required for AES-like");
    result = aesLikeEncrypt(text, key);
  } else if (algo === "des") {
    if (!key) return alert("Key required for DES-like");
    result = desLikeEncrypt(text, key);
  } else if (algo === "rsa") {
    result = rsaLikeEncrypt(text);
  }

  document.getElementById("outputText").value = result;
}

async function decrypt() {
  const algo = document.getElementById("algo").value;
  const text = document.getElementById("outputText").value;
  const key = document.getElementById("keyInput").value;

  let result = "";

  if (algo === "aes") {
    if (!key) return alert("Key required for AES-like");
    result = aesLikeDecrypt(text, key);
  } else if (algo === "des") {
    if (!key) return alert("Key required for DES-like");
    result = desLikeDecrypt(text, key);
  } else if (algo === "rsa") {
    result = rsaLikeDecrypt(text);
  }

  document.getElementById("inputText").value = result;
}
