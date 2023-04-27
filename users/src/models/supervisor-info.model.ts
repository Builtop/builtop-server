import { Schema, model } from 'mongoose';

import { ISupervisorInfo, roles } from '../../../common/index';

const supervisorInfoSchema = new Schema<ISupervisorInfo>({
    role: {
        type: String,
        default: roles.Supervisor
    },
    name: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    image: {
        type: String
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

export const SupervisorInfo = model<ISupervisorInfo>('SupervisorInfo', supervisorInfoSchema);