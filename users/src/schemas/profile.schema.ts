import * as yup from 'yup';
import { Types } from 'mongoose';

export const editAdminSchema = yup.object().shape({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required(),
    name: yup.string().when('name', values => {
        if (values[0] !== undefined) {
            return yup.string().min(3).required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    phoneNum: yup.string().when('phoneNum', values => {
        if (values[0] !== undefined) {
            return yup.string().required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    image: yup.string().when('image', values => {
        if (values[0] !== undefined) {
            return yup.string().min(3).required().ensure();
        } else {
            return yup.string().notRequired();
        }
    })
}, 
[
    ['name', 'name'],
    ['phoneNum', 'phoneNum'],
    ['image', 'image']
]);

export type editAdminInput = yup.InferType<typeof editAdminSchema>;

export const editSupervisorSchema = yup.object().shape({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required(),
    name: yup.string().when('name', values => {
        if (values[0] !== undefined) {
            return yup.string().min(3).required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    phoneNum: yup.string().when('phoneNum', values => {
        if (values[0] !== undefined) {
            return yup.string().required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    image: yup.string().when('image', values => {
        if (values[0] !== undefined) {
            return yup.string().min(3).required().ensure();
        } else {
            return yup.string().notRequired();
        }
    })
}, 
[
    ['name', 'name'],
    ['phoneNum', 'phoneNum'],
    ['image', 'image']
]);

export type editSupervisorInput = yup.InferType<typeof editSupervisorSchema>;

export const changePasswordSchema = yup.object().shape({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required(),
    currentPassword: yup.string().min(8).max(20).required().ensure(),
    newPassword: yup.string().min(8).max(20).required().ensure()
});

export type changePasswordInput = yup.InferType<typeof changePasswordSchema>;