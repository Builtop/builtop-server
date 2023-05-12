import * as yup from 'yup';

export const validateEmailOTPSchema = yup.object().shape({
    email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email must be valid email').required().ensure(),
    OTP: yup.string().length(6).required().ensure(),
});

export type validateEmailOTPInput = yup.InferType<typeof validateEmailOTPSchema>;