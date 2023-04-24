import * as yup from 'yup';
import { Types } from 'mongoose';

export const addSupervisorSchema = yup.object({
    email: yup.string().email().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email must be valid email').required().ensure()
});

export type addSupervisorInput = yup.InferType<typeof addSupervisorSchema>;

export const approveAccountSchema = yup.object({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required()
});

export type approveAccountInput = yup.InferType<typeof approveAccountSchema>;

export const activateAccountSchema = yup.object({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required()
});

export type activateAccountInput = yup.InferType<typeof activateAccountSchema>;

export const deactivateAccountSchema = yup.object({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required()
});

export type deactivateAccountInput = yup.InferType<typeof deactivateAccountSchema>;