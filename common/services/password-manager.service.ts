import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

import { AuthError } from '../errors/auth.error';

export class PasswordManager {
    static async hash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password.trim(), salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(password: string, storedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buffer = (await scryptAsync(password.trim(), salt, 64)) as Buffer;

        if (buffer.toString('hex') !== hashedPassword) {
            throw new AuthError('invalid credentials');
        }
    }
}