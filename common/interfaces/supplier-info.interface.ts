import { Document } from 'mongoose';

import { Schema } from 'mongoose';

import { roles } from '../enums/roles.enum';

export interface SupplierInfo {
    role: roles.Supplier,
    image: string,
    company: {
        name: string,
        email: string,
        phoneNum: string,
        address: string,
        CRN_num: string,
        CRN_expireDate: Schema.Types.Date,
        CRN_document: string
    }
}

export interface ISupplierInfo extends Document, SupplierInfo {};