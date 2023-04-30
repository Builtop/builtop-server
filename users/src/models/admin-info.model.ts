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
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret._id;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    },
    timestamps: true
});

export const AdminInfo = model<IAdminInfo>('AdminInfo', adminInfoSchema);