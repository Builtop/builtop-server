import { Schema, model } from 'mongoose';

import { IAdminInfo , roles } from '../../../common/index';

const adminInfoSchema = new Schema<IAdminInfo>({
    role: {
        type: String,
        default: roles.Admin
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

export const AdminInfo = model<IAdminInfo>('AdminInfo', adminInfoSchema);