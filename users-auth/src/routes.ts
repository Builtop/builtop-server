import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import { validateSchema } from '../../common/index';

import * as authController from './controllers/auth.controller';

import { signupSchema } from './validation-schemas/signup-schema.validation';
import { loginSchema } from './validation-schemas/login-schema.validation';
import { forgetPasswordSchema } from './validation-schemas/forget-password-schema.validation';
import { validatePhoneOTPSchema } from './validation-schemas/validate-phone-OTP-schema.validation';
import { validateEmailOTPSchema } from './validation-schemas/validate-email-OTP-schema.validation';
import { resetPasswordSchema } from './validation-schemas/reset-password-schema.validation';

const router = express.Router();

router.post('/signup', json(), validateSchema(signupSchema), authController.signup);

router.post('/login', json(), validateSchema(loginSchema), authController.login);

router.post('/forget-password', json(), validateSchema(forgetPasswordSchema), authController.forgetPassword);

router.post('/validate-phone-otp', json(), validateSchema(validatePhoneOTPSchema), authController.validatePhoneOTP);

router.post('/validate-email-otp', json(), validateSchema(validateEmailOTPSchema), authController.validateEmailOTP);

router.post('/reset-password', json(), validateSchema(resetPasswordSchema), authController.resetPassword);

// version
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Users Auth APIs Version 1.0.0');
});

export default router;