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
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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