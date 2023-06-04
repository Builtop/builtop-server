import { Schema } from 'mongoose';

import { InfoTypes } from '../../enums/users/info-types.enum';
import { UserStatus } from '../../enums/users/user-status.enum';

export const UserSchema = [
    {
        email: {
            type: String,
            required: true
        },
        phoneNum: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        infoColl: {
            type: String,
            enum: InfoTypes
        },
        info: {
            type: Schema.Types.ObjectId,
            refPath: 'infoColl',
        },
        privileges: [
            { type: String }
        ],
        isPhoneNumValid: {
            type: Boolean,
            required: true
        },
        isEmailValid: {
            type: Boolean,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: UserStatus
        }
    },
    {
        toJSON: {
            transform(doc: any, ret: any) {
                delete ret.password;
                delete ret.infoColl;
                delete ret.__v;
            }
        },
        timestamps: true
    }
]