import { Schema } from 'mongoose';

import { UserRoles } from '../../enums/users/user-roles.enum';

export const CorporateBuyerInfoSchema = [
    {
        role: {
            type: UserRoles.CorporateBuyer,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        logo: {
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
        CRN_Number: {
            type: String,
            required: true
        },
        CRN_Expiration_Date: {
            type: Schema.Types.Date,
            required: true
        },
        CRN_Document: {
            type: String,
            required: true
        },
        VAT_Cert_Document: {
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