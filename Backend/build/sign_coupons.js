"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
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
var crypto_1 = __importDefault(require("crypto"));
var EnhancedEncryptionService = /** @class */ (function () {
    function EnhancedEncryptionService() {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.setKey()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); })();
    }
    EnhancedEncryptionService.prototype.setKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var raw_pu_key, raw_pr_key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.readFile("./src/Assets/Key/publicKey.pem", "utf-8")];
                    case 1:
                        raw_pu_key = _a.sent();
                        return [4 /*yield*/, promises_1.default.readFile("C:/privKey.pem", "utf-8")];
                    case 2:
                        raw_pr_key = _a.sent();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    EnhancedEncryptionService.prototype.encrypt = function (plainText) {
        return crypto_1.default.publicEncrypt({
            key: this.pubKey,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        }, 
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(plainText, "utf-8")).toString("base64");
    };
    EnhancedEncryptionService.prototype.decrypt = function (cipherText) {
        return crypto_1.default.privateDecrypt({
            key: this.privKey,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        }, Buffer.from(cipherText, "base64")).toString("utf-8");
    };
    return EnhancedEncryptionService;
}());
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var encryptionService, textToDec, decrypted, textToSign, encrypted, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                encryptionService = new EnhancedEncryptionService();
                // Wait briefly for the key to load (simple workaround)
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
            case 1:
                // Wait briefly for the key to load (simple workaround)
                _a.sent();
                // Grab the text to encrypt from the first CLI argument
                switch (process.argv[2]) {
                    case "-d":
                        textToDec = process.argv[3] || "No Text Provided";
                        decrypted = encryptionService.decrypt(textToDec);
                        console.log(decrypted);
                        break;
                    default:
                        textToSign = process.argv[2] || "No Text Provided";
                        encrypted = encryptionService.encrypt(textToSign);
                        console.log(encrypted);
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error("Failed to encrypt:", err_1.message);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
