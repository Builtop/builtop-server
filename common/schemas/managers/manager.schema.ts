import { ManagerRoles } from '../../enums/managers/manager-roles.enum';
import { ManagerStatus } from '../../enums/managers/manager-status.enum';

export const ManagerSchema = [
    {
        email: {
            type: String,
            required: true
        },
        phoneNum: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ManagerRoles
        },
        privileges: [
            { type: String }
        ],
        isPhoneNumValid: {
            type: Boolean,
            required: true
        },
        isEmailValid: {
            type: Boolean,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ManagerStatus
        }
    },
    {
        toJSON: {
            transform(doc: any, ret: any) {
                delete ret.password;
                delete ret.__v;
            }
        },
        timestamps: true
    }
]