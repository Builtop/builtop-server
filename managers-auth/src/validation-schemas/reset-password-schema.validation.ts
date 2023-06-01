import * as yup from 'yup';

import { forgetPasswordMethods } from '../../../common/index';

export const resetPasswordSchema = yup.object().shape({
    method: yup.string().oneOf(Object.values(forgetPasswordMethods)).required(),
    phoneNum: yup.string().when('method', values => {
        if(values[0] === forgetPasswordMethods.WithPhoneNumber) {
            return yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'phone number is not valid').required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    email: yup.string().when('method', values => {
        if(values[0] === forgetPasswordMethods.WithEmail) {
            return yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email must be valid email').required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    newPassword: yup.string().min(8).max(20).required().ensure(),
});

export type resetPasswordInput = yup.InferType<typeof resetPasswordSchema>;