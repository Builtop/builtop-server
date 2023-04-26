import * as yup from 'yup';
import { Types } from 'mongoose';

export const changePasswordSchema = yup.object({
    _id: yup.mixed().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required(),
    currentPassword: yup.string().min(8).max(20).required().ensure(),
    newPassword: yup.string().min(8).max(20).required().ensure()
});

export type changePasswordInput = yup.InferType<typeof changePasswordSchema>;