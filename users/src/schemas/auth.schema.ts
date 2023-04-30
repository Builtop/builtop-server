import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure(),
    password: yup.string().min(8).max(20).required().ensure(),
});

export type signupInput = yup.InferType<typeof signupSchema>;

export const loginSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure(),
    password: yup.string().min(8).max(20).required().ensure(),
});

export type loginInput = yup.InferType<typeof loginSchema>;

export const validateOTPSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure(),
    OTP: yup.string().length(6).required().ensure()
});

export type validateOTPInput = yup.InferType<typeof validateOTPSchema>;

export const forgetPasswordSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure()
});

export type forgetPasswordInput = yup.InferType<typeof forgetPasswordSchema>;

export const resetPasswordSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure(),
    OTP: yup.string().length(6).required().ensure(),
    newPassword: yup.string().min(8).max(20).required().ensure(),
});

export type resetPasswordInput = yup.InferType<typeof resetPasswordSchema>;