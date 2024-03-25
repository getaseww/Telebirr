import { publicEncrypt, createHash, constants } from 'node:crypto';
import { headers } from './helpers';
import { EncryptionPayloadType } from './types/index';

export class Telebirr {
    private appId: string;
    private appKey: string;
    private shortCode: string;
    private publicKey: string;

    constructor(appId: string, appKey: string, shortCode: string, publicKey: string) {
        this.appId = appId;
        this.appKey = appKey;
        this.shortCode = shortCode;
        this.publicKey = publicKey;
    }

    async encrypt(payload: EncryptionPayloadType): Promise<string> {
        try {
            const publicKey = `-----BEGIN PUBLIC KEY-----\n${this.publicKey}\n-----END PUBLIC KEY-----`;
            const dataToEncrypt = JSON.stringify({ ...payload, appId: this.appId, shortCode: this.shortCode });
            const maxSize = 234; //it was 245 but we decree the pading byts from it
            const bufferSize = dataToEncrypt.length;
            const encryptedChunks = [];
            let offset = 0;

            while (offset < bufferSize) {
                const chunkSize = Math.min(maxSize, bufferSize - offset);
                const chunk = dataToEncrypt.slice(offset, offset + chunkSize);

                const encryptedChunk = publicEncrypt({
                    key: publicKey,
                    padding: constants.RSA_PKCS1_PADDING
                }, Buffer.from(chunk, 'utf8'));

                encryptedChunks.push(encryptedChunk);
                offset += chunkSize;
            }

            const encryptedData = Buffer.concat(encryptedChunks);
            const encrypted = encryptedData.toString('base64');

            return encrypted;
        } catch (error) {
            throw new Error('Encryption failed');
        }
    }

    signData(params: EncryptionPayloadType): string {
        const encodedParams = Object.entries({ ...params, appId: this.appId, appKey: this.appKey, shortCode: this.shortCode })
            .filter(([key, value]) => value != null && value !== '') // Filter out null or empty values
            .sort((a, b) => a[0].localeCompare(b[0])) // Sort by key
            .map(([key, value]) => `${key}=${value}`) // Map to key-value pairs
            .join('&'); // Join with '&'

        return createHash('sha256').update(encodedParams).digest('hex');
    }

    async initWebPayment(url: string, sign: string, ussd: string): Promise<any> {
        const body = { appid: this.appId, sign, ussd };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            console.log("network error",response)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("response from telebirr", data);
            return data;
        } catch (error:any) {
            throw new Error(error);
        }
    }
}
