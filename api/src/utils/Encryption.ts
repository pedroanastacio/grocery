import crypto from 'crypto';
import { IEncryptedData } from '../services/interfaces/IEncryptedData';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

export const encrypt = (text: string): IEncryptedData => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return { iv: iv.toString('hex'), password: encrypted.toString('hex') };
}

export const encryptWithUserIv = (text: string, iv: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('hex');
}