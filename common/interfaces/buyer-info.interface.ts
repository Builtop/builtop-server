import { Schema, Document } from 'mongoose';

import { roles } from '../enums/roles.enum';

export interface BuyerInfo {
    role: roles.Buyer,
    image?: string,
    business: string,
    company?: {
        name: string,
        email: string,
        phoneNum: string,
        address: string,
        CRN_num: string,
        CRN_expireDate: Schema.Types.Date,
        CRN_document: string
    },
    individual?: {
        name: string,
        email: string,
        phoneNum: string,
        address: string,
        ID_num: string,
        ID_expireDate: Schema.Types.Date,
        ID_image: string
    }
}

export interface IBuyerInfo extends Document, BuyerInfo {};