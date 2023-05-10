import { Schema, model } from 'mongoose';

import { PasswordManager, IUser, UserSchema } from '../../../common/index';

const userSchema = new Schema<IUser<any>>(...UserSchema);

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashedPassword = await PasswordManager.hash(this.get('password'));
        this.set('password', hashedPassword);
    }

    done();
});

export const User = model<IUser<any>>('User', userSchema);