import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure(),
    password: yup.string().min(8).max(20).required().ensure(),
});

export type loginInput = yup.InferType<typeof loginSchema>;