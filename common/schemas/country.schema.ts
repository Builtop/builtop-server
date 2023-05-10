import { Schema } from 'mongoose';

import { infoType } from '../enums/info-type.enum';
import { userStatus } from '../enums/user-status.enum';
import { UserSchema } from './user.schema';

export const CountrySchema = [
    {
        name: {
            type: String,
            required: true
        },
        latlng:{
            type: Object as () => Latlng
        },
        createdUser: {
            type: Schema.Types.ObjectId, 
            ref: "User",
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: userStatus
        }
    },
    {
        toJSON: {
            transform(doc: any, ret: any) {
                delete ret.__v;
            }
        },
        timestamps: true
    }
]
export interface Latlng{
    lat: String;
    lng: String;
}