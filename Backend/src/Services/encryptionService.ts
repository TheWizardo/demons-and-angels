import { createHmac } from "crypto";
// import { JSEncrypt } from 'nodejs-jsencrypt';
import crypto from 'crypto';
import fs from 'fs/promises';
import config from "../Utils/config";

class EncryptionService {
    private publicKey;

    constructor() {
        (async () => await this.setKey())();
    }

    private async setKey() {
        this.publicKey = await fs.readFile(config.publicKey, "utf-8");
    }

    public rsaEncrypt(plainText: string): string | null {
        if (!plainText) return null;

        const cipherBuf = crypto.publicEncrypt(
            {
                key: this.publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Uint8Array.from(Buffer.from(plainText, "utf8"))
        );

        return cipherBuf.toString("base64");
    }

    public sha256(plainText: string) {
        if (!plainText) return null;
        return createHmac("sha256", config.salt).update(plainText).digest("hex");
    }
}

const encryptionService = new EncryptionService();
export default encryptionService;