import { Schema, model } from 'mongoose';

import { PasswordManager, IUser, userStatus, infoType } from '../../../common/index';

const userSchema = new Schema<IUser<any>>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    privileges: [
        { type: String }
    ],
    infoType: {
        type: String,
        enum: infoType
    },
    info: {
        type: Schema.Types.ObjectId,
        refPath: 'infoType',
    },
    status: {
        type: String,
        required: true,
        enum: userStatus
    }
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.infoType;
            delete ret.__v;
        }
    },
    timestamps: true
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashedPassword = await PasswordManager.hash(this.get('password'));
        this.set('password', hashedPassword);
    }

    done();
});

export const User = model<IUser<any>>('User', userSchema);