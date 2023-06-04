import { Schema, model } from 'mongoose';

import { PasswordManager, IManager, ManagerSchema } from '../../../common/index';

const managerSchema = new Schema<IManager>(...ManagerSchema);

managerSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashedPassword = await PasswordManager.hash(this.get('password'));
        this.set('password', hashedPassword);
    }

    done();
});

export const Manager = model<IManager>('Manager', managerSchema);