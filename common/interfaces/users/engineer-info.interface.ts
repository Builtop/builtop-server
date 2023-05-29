import { Document, Schema } from 'mongoose';

import { UserRoles } from '../../enums/users/user-roles.enum';

export interface EngineerInfo {
    role: UserRoles.Engineer,
    name: string,
    image: string,
    city: string,
    address: string,
    major: string,
    National_ID: string,
    National_ID_Document: string,
    National_ID_Expiration_Date: Schema.Types.Date,
    Engineering_Cert_Document: string,
    SCE_Cert_Document: string,
    Resume_Document: string
}

export interface IEngineerInfo extends Document, EngineerInfo {};