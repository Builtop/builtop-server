import * as yup from 'yup';

export const signupSchema = yup.object({
    email: yup.string().email().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().ensure(),
    password: yup.string().min(8).max(20).required().ensure(),
});

export type signupInput = yup.InferType<typeof signupSchema>;

export const loginSchema = yup.object({
    email: yup.string().email().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().ensure(),
    password: yup.string().min(8).max(20).required().ensure(),
});

export type loginInput = yup.InferType<typeof loginSchema>;