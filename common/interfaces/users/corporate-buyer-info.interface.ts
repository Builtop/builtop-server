import { Document, Schema } from 'mongoose';

import { UserRoles } from '../../enums/users/user-roles.enum';

export interface CorporateBuyerInfo {
    role: UserRoles.CorporateBuyer,
    companyName: string,
    logo: string,
    city: string,
    address: string,
    CRN_Number: string,
    CRN_Expiration_Date: Schema.Types.Date,
    CRN_Document: string,
    VAT_Cert_Document: string,
}

export interface ICorporateBuyerInfo extends Document, CorporateBuyerInfo {};