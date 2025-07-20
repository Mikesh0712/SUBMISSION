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

// Main logic
const inputText = document.getElementById("inputText");
const keyInput = document.getElementById("keyInput");
const algoSelect = document.getElementById("algo");
const modeSelect = document.getElementById("mode");
const outputBox = document.getElementById("outputBox");

algoSelect.addEventListener("change", clearOutput);
modeSelect.addEventListener("change", handleAction);
inputText.addEventListener("input", () => {
  if (modeSelect.value) handleAction();
});

function clearOutput() {
  outputBox.textContent = "";
}

function handleAction() {
  const algo = algoSelect.value;
  const mode = modeSelect.value;
  const text = inputText.value.trim();
  const key = keyInput.value.trim();

  if (!algo || !mode || !text) {
    outputBox.textContent = "";
    return;
  }

  let result = "";

  try {
    if (algo === "aes") {
      if (!key) return alert("Key required for AES-like");
      result = mode === "encrypt" ? aesLikeEncrypt(text, key) : aesLikeDecrypt(text, key);
    } else if (algo === "des") {
      if (!key) return alert("Key required for DES-like");
      result = mode === "encrypt" ? desLikeEncrypt(text, key) : desLikeDecrypt(text, key);
    } else if (algo === "rsa") {
      result = mode === "encrypt" ? rsaLikeEncrypt(text) : rsaLikeDecrypt(text);
    }
    outputBox.textContent = (mode === "encrypt" ? "🔒 Encrypted:\n" : "🔓 Decrypted:\n") + result;
  } catch (e) {
    outputBox.textContent = "❌ Error: Invalid input or key.";
  }
}
