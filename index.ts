import { publicEncrypt, createHash } from 'node:crypto';
import { headers } from './helpers';
import { EncryptionPayloadType } from './types';


export class Telebirr {

    constructor() {
    }

    encrypt(public_key:string,payload:EncryptionPayloadType ): string {
        // public key which is provided from Telebirr
        const publicKey = `-----BEGIN PUBLIC KEY-----\n${public_key}\n-----END PUBLIC KEY-----`;
        const dataToEncrypt = Buffer.from(JSON.stringify(payload));

        // Encrypting data using RSA Algorithm
        const encryptedData = publicEncrypt(
            {
                key: publicKey,
            },
            dataToEncrypt,
        );

        return encryptedData.toString('base64');
    }

    signData(params: EncryptionPayloadType): string {
        const encodedParams = Object.entries(params)
            .filter(([key, value]) => value != null && value !== '') // Filter out null or empty values
            .sort((a, b) => a[0].localeCompare(b[0])) // Sort by key
            .map(([key, value]) => `${key}=${value}`) // Map to key-value pairs
            .join('&'); // Join with '&'

        return createHash('sha256').update(encodedParams).digest('hex')
    }

    initWebPayment(url: string, appid: string, sign: string, ussd: string): any {
        const body = { appid, sign, ussd }
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                // check network problem
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("response from telebirr", data);
                return (data);
            })
            .catch(error => {
                console.error("telebirr error", error);
                return error;
            });
    }
}
