import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

import { AuthError } from '../errors/auth.error';
import { ValidationError } from '../errors/validation.error';

export class PasswordManager {
    static async hash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password.trim(), salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(password: string, storedPassword: string, type: 'Auth' | 'Profile') {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buffer = (await scryptAsync(password.trim(), salt, 64)) as Buffer;

        if (buffer.toString('hex') !== hashedPassword) {
            if (type === 'Auth') {
                throw new AuthError('invalid credentials');
            }
            if (type === 'Profile') {
                throw new ValidationError('the current password you have entered is incorrect');
            }
        }
    }
}