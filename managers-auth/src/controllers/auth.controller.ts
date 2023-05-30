import { Request, Response, NextFunction } from 'express';

import { loginInput } from '../validation-schemas/login-schema.validation';
import { forgetPasswordInput } from '../validation-schemas/forget-password-schema.validation';
import { validatePhoneOTPInput } from '../validation-schemas/validate-phone-OTP-schema.validation';
import { validateEmailOTPInput } from '../validation-schemas/validate-email-OTP-schema.validation';
import { resetPasswordInput } from '../validation-schemas/reset-password-schema.validation'

import { ManagerService } from '../services/managers.service';



export const login = async (req: Request<{}, {}, loginInput>, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
};

export const forgetPassword = async (req: Request<{}, {}, forgetPasswordInput>, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
};

export const validatePhoneOTP = async (req: Request<{}, {}, validatePhoneOTPInput>, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
};

export const validateEmailOTP = async (req: Request<{}, {}, validateEmailOTPInput>, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req: Request<{}, {}, resetPasswordInput>, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
};