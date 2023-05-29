import { Document, Schema } from 'mongoose';
  
import { UserRoles } from '../../enums/users/user-roles.enum';

export interface IndividualBuyerInfo {
    role: UserRoles.IndividualBuyer,
    name: string,
    image: string,
    city: string,
    address: string,
    national_ID: string,
    national_ID_Document: string,
    national_ID_Expiration_Date: Schema.Types.Date,
}

export interface IIndividualBuyerInfo extends Document, IndividualBuyerInfo {};