class RSA {
  constructor(p, q) {
    this.p = p;
    this.q = q;
    this.n = this.p * this.q;
    this.phiN = (p - 1) * (q - 1);
    this.publicKey = null;
    this.privateKey = null;
  }

  // Menghitung greatest common divisor (GCD)
  gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Menghitung modular multiplicative inverse
  modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  }

  // Membangkitkan kunci publik (e, n) dan kunci privat (d, n)
  generateKeys() {
    let e = 2; // Public exponent
    while (e < this.phiN && this.gcd(e, this.phiN) !== 1) {
      e++;
    }

    const d = this.modInverse(e, this.phiN); // Private exponent
    this.publicKey = { e, n: this.n };
    this.privateKey = { d, n: this.n };

    return { publicKey: this.publicKey, privateKey: this.privateKey };
  }

  // Enkripsi pesan (plaintext) dengan kunci publik (e, n)
  encrypt(plaintext, publicKey) {
    const { e, n } = publicKey;
    const encrypted = [];
    for (let i = 0; i < plaintext.length; i++) {
      const charCode = plaintext.charCodeAt(i) - 65;
      const encryptedCharCode = BigInt(charCode) ** BigInt(e) % BigInt(n);
      encrypted.push(encryptedCharCode.toString());
    }
    return encrypted.join(" ");
  }

  // Dekripsi ciphertext dengan kunci privat (d, n)
  decrypt(ciphertext, privateKey) {
    const { d, n } = privateKey;
    const decrypted = [];
    const encryptedCodes = ciphertext.split(" ");
    for (let i = 0; i < encryptedCodes.length; i++) {
      const encryptedCharCode = BigInt(encryptedCodes[i]);
      const decryptedCharCode =
        (encryptedCharCode ** BigInt(d) % BigInt(n)) + BigInt(65);
      decrypted.push(String.fromCharCode(Number(decryptedCharCode)));
    }
    return decrypted.join("");
  }
}

// Contoh penggunaan:
// const rsa = new RSA(47, 71); // Contoh angka prima untuk demonstrasi
// const { publicKey, privateKey } = rsa.generateKeys();
// console.log("Public Key:", publicKey);
// console.log("Private Key:", privateKey);

// const plaintext = "HELLO ALICE";
// const encrypted = rsa.encrypt(plaintext, publicKey);
// console.log("Encrypted Message:", encrypted);

// const decrypted = rsa.decrypt(encrypted, privateKey);
// console.log("Decrypted Message:", decrypted);
export default RSA;
