import * as yup from 'yup';
import { Types } from 'mongoose';

export const addSupervisorSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure(),
    name: yup.string().min(3).required().ensure(),
    email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email must be valid email').required().ensure(),
    image: yup.string().when('image', values => {
        if (values[0] !== undefined) {
            return yup.string().url().required().ensure();
        } else {
            return yup.string().notRequired();
        }
    })
}, 
[
    ['image', 'image']
]);

export type addSupervisorInput = yup.InferType<typeof addSupervisorSchema>;

export const approveAccountSchema = yup.object().shape({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required()
});

export type approveAccountInput = yup.InferType<typeof approveAccountSchema>;

export const activateAccountSchema = yup.object().shape({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required()
});

export type activateAccountInput = yup.InferType<typeof activateAccountSchema>;

export const deactivateAccountSchema = yup.object().shape({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required()
});

export type deactivateAccountInput = yup.InferType<typeof deactivateAccountSchema>;