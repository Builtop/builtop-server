import { Schema } from 'mongoose';

import { infoType } from '../enums/info-type.enum';
import { userStatus } from '../enums/user-status.enum';

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
            transform(doc: any, ret: any) {
                delete ret.password;
                delete ret.infoType;
                delete ret.__v;
            }
        },
        timestamps: true
    }
]