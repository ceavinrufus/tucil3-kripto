class RSA {
  constructor() {
    this.p = null;
    this.q = null;
    this.n = null;
    this.phiN = null;
    this.publicKey = null;
    this.privateKey = null;
    this.initialize();
  }

  initialize() {
    this.pickTwoDistinctNumbers();
    this.n = this.p * this.q;
    this.phiN = (this.p - 1) * (this.q - 1);
    this.generateKeys();
  }

  pickTwoDistinctNumbers() {
    const numbers = [599, 619, 677, 277, 887, 2039, 2081]; //random 3and4 digit prime keys hardcoded by us
    const firstIndex = Math.floor(Math.random() * numbers.length);
    this.p = numbers[firstIndex];

    const filteredNumbers = numbers
      .slice(0, firstIndex)
      .concat(numbers.slice(firstIndex + 1));
    const secondIndex = Math.floor(Math.random() * filteredNumbers.length);
    this.q = filteredNumbers[secondIndex];
  }

  gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  modInverse(a, m) {
    let m0 = m;
    let y = 0,
      x = 1;

    if (m === 1) return 0; // No inverse if m is 1

    while (a > 1) {
      // q is quotient
      let q = Math.floor(a / m);
      let t = m;

      // m is remainder now, same as the Euclid's algorithm
      m = a % m;
      a = t;
      t = y;

      // Update y and x
      y = x - q * y;
      x = t;
    }

    // Make x positive
    if (x < 0) x += m0;

    return x;
  }

  generateKeys() {
    let e = 2;
    while (e < this.phiN && this.gcd(e, this.phiN) !== 1) {
      e++;
    }
    const d = this.modInverse(e, this.phiN);
    this.publicKey = { e, n: this.n };
    this.privateKey = { d, n: this.n };
  }

  encrypt(plaintext, publicKey) {
    const { e, n } = publicKey;
    const encrypted = [];
    for (let i = 0; i < plaintext.length; i++) {
      const charCode = plaintext.charCodeAt(i);
      const encryptedCharCode = charCode ** e % n;
      encrypted.push(encryptedCharCode.toString());
    }
    return encrypted.join(" ");
  }

  decrypt(ciphertext, privateKey) {
    const { d, n } = privateKey;
    const decrypted = [];
    const encryptedCodes = ciphertext.split(" ");
    for (let i = 0; i < encryptedCodes.length; i++) {
      const encryptedCharCode = encryptedCodes[i];
      const decryptedCharCode = encryptedCharCode ** d % n;
      decrypted.push(String.fromCharCode(Number(decryptedCharCode)));
    }
    return decrypted.join("");
  }
}

// Contoh penggunaan:
// const rsa = new RSA(); // Contoh angka prima untuk demonstrasi
// console.log("Public Key:", rsa.publicKey);
// console.log("Private Key:", rsa.privateKey);

// const plaintext = "HELLO ALICE";
// const encrypted = rsa.encrypt(plaintext, rsa.publicKey);
// console.log("Encrypted Message:", encrypted);

// const decrypted = rsa.decrypt(encrypted, rsa.privateKey);
// console.log("Decrypted Message:", decrypted);
export default RSA;
