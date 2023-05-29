import { Schema } from 'mongoose';

import { UserRoles } from '../../enums/users/user-roles.enum';

export const EngineerInfoSchema = [
    {
        role: {
            type: UserRoles.Engineer,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        major: {
            type: String,
            required: true
        },
        National_ID: {
            type: String,
            required: true
        },
        National_ID_Document: {
            type: String,
            required: true
        },
        National_ID_Expiration_Date: {
            type: Schema.Types.Date,
            required: true
        },
        Engineering_Cert_Document: {
            type: String,
            required: true
        },
        SCE_Cert_Document: {
            type: String,
            required: true
        },
        Resume_Document: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc: any, ret: any) {
                delete ret._id;
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.__v;
            }
        },
        timestamps: true
    }
]