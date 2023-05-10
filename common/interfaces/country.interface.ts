import { Document, ObjectId } from 'mongoose';

import { IUser } from '../interfaces/user.interface';
import { lookupStatus } from '../enums/lookup-status.enum';
import { Latlng } from '../schemas/country.schema';

export interface Country {
    name: string,
    latlng : Latlng
    createdUser: IUser<any>,
    status: lookupStatus
}

export interface ICountry extends Document, Country {};