import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import { validateSchema } from '../../common/index';

import * as authController from './controllers/auth.controller';
import * as userInfoController from './controllers/user-info.controller';

import { signupSchema } from './validation-schemas/signup-schema.validation';
import { loginSchema } from './validation-schemas/login-schema.validation';
import { forgetPasswordSchema } from './validation-schemas/forget-password-schema.validation';
import { forgetPasswordOTPValidationSchema } from './validation-schemas/forget-password-otp-validation-schema.validation';
import { resetPasswordSchema } from './validation-schemas/reset-password-schema.validation';

import { completeCorporateBuyerInfoSchema } from './validation-schemas/complete-corporate-buyer-info-schema.validation';
import { completeCorporateSupplierInfoSchema } from './validation-schemas/complete-corporate-supplier-info-schema.validation';
import { completeIndividualBuyerInfoSchema } from './validation-schemas/complete-individual-buyer-info-schema.validation';
import { completeEngineerInfoSchema } from './validation-schemas/complete-engineer-info-schema.validation';

const router = express.Router();

router.post('/signup', json(), validateSchema(signupSchema), authController.signup);

router.post('/complete-corporate-buyer-info', json(), validateSchema(completeCorporateBuyerInfoSchema), userInfoController.completeCorporateBuyerInfo);

router.post('/complete-corporate-supplier-info', json(), validateSchema(completeCorporateSupplierInfoSchema), userInfoController.completeCorporateSupplierInfo);

router.post('/complete-individual-buyer-info', json(), validateSchema(completeIndividualBuyerInfoSchema), userInfoController.completeIndividualBuyerInfo);

router.post('/complete-engineer-info', json(), validateSchema(completeEngineerInfoSchema), userInfoController.completeEngineerInfo);

router.post('/login', json(), validateSchema(loginSchema), authController.login);

router.post('/forget-password', json(), validateSchema(forgetPasswordSchema), authController.forgetPassword);

router.post('/otp-validation', json(), validateSchema(forgetPasswordOTPValidationSchema), authController.forgetPasswordOTPValidation);

router.post('/reset-password', json(), validateSchema(resetPasswordSchema), authController.resetPassword);

// version
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Users Auth APIs Version 1.0.0');
});

export default router;