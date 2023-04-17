import { Schema, model } from 'mongoose';

import { ISupplierInfo, roles } from '../../../common/index';

const supplierInfoSchema = new Schema<ISupplierInfo>({
    role: {
        type: String,
        default: roles.Supplier
    },
    image: {
        type: String
    },
    company: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNum: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        CRN_num: {
            type: String,
            required: true
        },
        CRN_expireDate: {
            type: Schema.Types.Date,
            required: true
        },
        CRN_document: {
            type: String,
            required: true
        }
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

export const SupplierInfo = model<ISupplierInfo>('SupplierInfo', supplierInfoSchema);