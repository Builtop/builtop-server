import * as yup from 'yup';

export const validatePhoneOTPSchema = yup.object().shape({
    phoneNum: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure(),
    OTP: yup.string().length(6).required().ensure(),
});

export type validatePhoneOTPInput = yup.InferType<typeof validatePhoneOTPSchema>;