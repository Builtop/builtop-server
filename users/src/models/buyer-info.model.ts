import { Schema, model } from 'mongoose';

import { IBuyerInfo, roles } from '../../../common/index';

const buyerInfoSchema = new Schema<IBuyerInfo>({
    role: {
        type: String,
        default: roles.Buyer
    },
    image: {
        type: String
    },
    business: {
        type: String,
        required: true,
        enum: ['Individual', 'Company']
    },
    company: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNum: {
            type: String,
        },
        address: {
            type: String,
        },
        CRN_num: {
            type: String,
        },
        CRN_expireDate: {
            type: Schema.Types.Date,
        },
        CRN_document: {
            type: String,
        }
    },
    individual: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNum: {
            type: String,
        },
        address: {
            type: String,
        },
        ID_num: {
            type: String,
        },
        ID_expireDate: {
            type: Schema.Types.Date,
        },
        ID_image: {
            type: String,
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

export const BuyerInfo = model<IBuyerInfo>('BuyerInfo', buyerInfoSchema);