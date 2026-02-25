import fs from 'fs/promises';
// import { JSEncrypt } from 'nodejs-jsencrypt';

// class EnhancedEncryptionService {
//     // const key = new RSA({ b: 512 });
//     private Keys;

//     constructor() {
//         (async () => await this.setKey())();
//     }

//     private async setKey() {
//         const raw_pu_key = await fs.readFile("./src/Assets/Key/publicKey.pem", "base64");
//         const raw_pr_key = await fs.readFile("C:/privKey.pem", "base64");
//         const stripedPuTags = raw_pu_key.replace(/-----BEGIN [^\n]+-----/, '').replace(/-----END [^\n]+-----/, '').replace(/\s+/g, '');
//         const stripedPrTags = raw_pr_key.replace(/-----BEGIN [^\n]+-----/, '').replace(/-----END [^\n]+-----/, '').replace(/\s+/g, '');
//         this.Keys = new JSEncrypt()
//         this.Keys.setPublicKey(stripedPuTags);
//         this.Keys.setPrivateKey(stripedPrTags);
//     }

//     public rsaEncrypt(plainText: string): string {
//         if (!plainText) return null;
//         const cipherText = this.Keys.encrypt(plainText);
//         if (typeof cipherText === "boolean") {
//             throw new Error("couponService-rsaEncrypt");
//         }
//         if (cipherText === null) {
//             throw new Error("couponService-rsaEncrypt could not encrypt");
//         }
//         return cipherText;
//     }


//     public rsaDecrypt(cipherText: string): string {
//       if (!cipherText) return null;
//       const plainText = this.Keys.decrypt(cipherText);
//       if (typeof cipherText === "boolean") {
//           throw new Error("couponService-rsaDecrypt");
//       }
//       if (cipherText === null) {
//           throw new Error("couponService-rsaDecrypt could not decrypt");
//       }
//       return plainText;
//     }

// }



// (async () => {
//   try {
//     const encryptionService = new EnhancedEncryptionService();
//     // Wait briefly for the key to load (simple workaround)
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Grab the text to encrypt from the first CLI argument
//     switch (process.argv[2]) {
//       case "-d":
//         const textToDec = process.argv[3] || "No Text Provided";
//         const decrypted = encryptionService.rsaDecrypt(textToDec);
//         console.log(decrypted);
//         break;
//       default:
//         const textToSign = process.argv[2] || "No Text Provided";

//         const encrypted = encryptionService.rsaEncrypt(textToSign);
//         console.log(encrypted);
//     }
//   }
//   catch (err) {
//     console.error("Failed to encrypt:", err.message);
//     process.exit(1);
//   }
// })();

import crypto from 'crypto'

class EnhancedEncryptionService {
  // const key = new RSA({ b: 512 });
  private privKey;
  private pubKey;

  constructor() {
    (async () => await this.setKey())();
  }

  private async setKey() {
    const raw_pu_key = await fs.readFile("./src/Assets/Key/publicKey.pem", "utf-8");
    const raw_pr_key = await fs.readFile("C:/privKey.pem", "utf-8");
    // const privateKey = raw_pu_key.replace(/-----BEGIN [^\n]+-----/, '').replace(/-----END [^\n]+-----/, '').replace(/\s+/g, '');
    // const publicKey = raw_pr_key.replace(/-----BEGIN [^\n]+-----/, '').replace(/-----END [^\n]+-----/, '').replace(/\s+/g, '');
    // console.log(raw_pu_key)
    // console.log(raw_pr_key)

    //     this.pubKey = `-----BEGIN RSA PUBLIC KEY-----
    // MIIBCgKCAQEAzQIX/lEdF+L2DiYopeDHkrea8O+SnworU02TzyRiS1nFS7T8o7Nc
    // aR2MbM+c4eX61AxPJkbph/cD1OJ1fgOukiYwYcvMxy53taEzeSGCWEECLNQ4OTPG
    // ngEhjh+rriIZVcVgrIAKdGJhj5KMnZnsiuoW3msBOMVwC7R7xl0hVDlmVAfVEPB1
    // 5tD2kRguvEKPw5yislZOTGq8COZXeBZpr6mwZVuXYQntjyNzH9LG3syb4m+g4HnC
    // WbiAiWlM2BVAdY0blNh5rqit/0c1QlOSi3uw+d00ArXnDzbRMgFozyizeCHgPlgD
    // XCv4rw7mjCcuKXl5Tfibx+I58fds8csE8wIDAQAB
    // -----END RSA PUBLIC KEY-----`
    //     this.privKey = `-----BEGIN RSA PRIVATE KEY-----
    // MIIEowIBAAKCAQEAzQIX/lEdF+L2DiYopeDHkrea8O+SnworU02TzyRiS1nFS7T8
    // o7NcaR2MbM+c4eX61AxPJkbph/cD1OJ1fgOukiYwYcvMxy53taEzeSGCWEECLNQ4
    // OTPGngEhjh+rriIZVcVgrIAKdGJhj5KMnZnsiuoW3msBOMVwC7R7xl0hVDlmVAfV
    // EPB15tD2kRguvEKPw5yislZOTGq8COZXeBZpr6mwZVuXYQntjyNzH9LG3syb4m+g
    // 4HnCWbiAiWlM2BVAdY0blNh5rqit/0c1QlOSi3uw+d00ArXnDzbRMgFozyizeCHg
    // PlgDXCv4rw7mjCcuKXl5Tfibx+I58fds8csE8wIDAQABAoIBAE2sSefu1p2Kvdwt
    // hAAZMrQ5gWhg9MXyJekpfuOgLufKqvBcsc3aMpyW9/HwFUoXhxnZUhG4E1oS8m4x
    // oP9uKLGx62naPAuJZQy5d1WhJxAGDWtruqOdpNaPqiV9hV/0BnJTVqX020EuVzV8
    // +m7p90/IkoKRu0RFtgaRSsYk2fBdI3nfleR7C3M4d8/BfJFM3QrAB+f5kUQKnVqJ
    // +k8DDgNno9B+hICUPPYZliMpF1GIqWlwoP++9/JY2X+h7q3XWRujBqjNCoxMe1KM
    // QsGUT3s7aNXYAk0/o2EjsojyptCrZmH6vS5Z3/qWwHUHC4MQd2Tsp0a3lpiR70fp
    // XK5vde0CgYEA5T3EV3vhrrSG2LGqGNex0q0/zmIQs/eBVQABuzK2cXJisaeRxvrr
    // hFBXXhJ3zS6KEMKiHRonMtyU5xC3mWAdNOQRIWG9O+pkbw/yX2H+rNOGnwQv1mC+
    // OVo2cNDmHBy/Ql7uFDgox98IW3QWAIqrxm49pULwG/SyVGTRO7fdGPUCgYEA5PAw
    // Q9dKB6LAMhaTGZINAWedO9MtThq0CMumFm2PIyEELKJuyGcPRphrsUkubn+Xnbza
    // ZHb+SQ8Cw5kQEx2srip4thGFFEFoaWasPAiZ9nYf4vBSpGxHgGr9taapFCIslPfE
    // HQHruEEkt4SJ3ZYtRFK6FiAwxY86pCGoHI6ZFUcCgYEAnF3AcqgWrdOH84FkdCOU
    // sQ7p6f3sRMW7213w0F7sIYATn/icMCzxv0QKBCn2u+dV187bQ5yWRlQ94Ur+4Ui1
    // Q2GZ6bpAmQDt1u/6tGMkk4CJYCg79S/yMS6+2b80ZtKZB023eeVAs+0HR1Jsu5vb
    // RbPmqrZ5D6ieh4BpVCG7V40CgYAT3b/iczEqXnYdIpZbNrBIOeyL/3RD/c83oCxm
    // b9Vm7/uDwAiq/T53Gszlknsj/ZBzkKrG4wiH4HSV8pdRgVa1ulvFONn6ev6Lfuxd
    // PUXW/EMiF0akm/zMaPxhIfg0Fg8WUjXDaqJA1+5OuoKYJusArckWGG8DBb3J9l23
    // NKyWCwKBgGptDeiXgpoCQQmzlRtor5/SzcxFqq7Mv2ij95RGZe72BJSvvzICKe3f
    // 4svpKvPbk1mjIQXjCNDgb20PydAHtzgOX/alqWGjkgkG8e8V2zfcxQc01pfjCLsS
    // BuxodVAqVP1i/G0sI3b7lH0cxA9epLpFgRnWXhVe04dZiiiPOTJ9
    // -----END RSA PRIVATE KEY-----`
    this.privKey = raw_pr_key;
    this.pubKey = raw_pu_key;
  }

  public encrypt(plainText: string): string {
    return crypto.publicEncrypt(
      {
        key: this.pubKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      // We convert the data string to a buffer using `Buffer.from`
      Buffer.from(plainText, "utf-8")
    ).toString("base64")
  }

  public decrypt(cipherText: string): string {
    return crypto.privateDecrypt(
      {
        key: this.privKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(cipherText, "base64")
    ).toString("utf-8")
  }
}

(async () => {
  try {
    const encryptionService = new EnhancedEncryptionService();
    // Wait briefly for the key to load (simple workaround)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Grab the text to encrypt from the first CLI argument
    switch (process.argv[2]) {
      case "-d":
        const textToDec = process.argv[3] || "No Text Provided";
        const decrypted = encryptionService.decrypt(textToDec);
        console.log(decrypted);
        break;
      default:
        const textToSign = process.argv[2] || "No Text Provided";

        const encrypted = encryptionService.encrypt(textToSign);
        console.log(encrypted);
    }
  }
  catch (err) {
    console.error("Failed to encrypt:", err.message);
    process.exit(1);
  }
})();