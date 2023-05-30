import { Request, Response, NextFunction } from 'express';

import { loginInput } from '../validation-schemas/login-schema.validation';
import { forgetPasswordInput } from '../validation-schemas/forget-password-schema.validation';
import { validatePhoneOTPInput } from '../validation-schemas/validate-phone-OTP-schema.validation';
import { validateEmailOTPInput } from '../validation-schemas/validate-email-OTP-schema.validation';
import { resetPasswordInput } from '../validation-schemas/reset-password-schema.validation';

import { ManagerService } from '../services/managers.service';

import { AuthError, IManager, JWT, Manager, ManagerRoles, ManagerStatus, PasswordManager, ProcessResult, tokenData } from '../../../common/index';

// dull endpoint
export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await ManagerService.create<Manager>({
            email: 'admin@gmail.com',
            phoneNum: '+999888777',
            password: '12345678',
            name: 'admin',
            image: 'image',
            role: ManagerRoles.Admin,
            privileges: [],
            isPhoneNumValid: true,
            isEmailValid: true,
            status: ManagerStatus.Active,
        });

        const token = JWT.sign({
            _id: admin._id,
            phoneNum: admin.phoneNum,
            privileges: admin.privileges,
            role: admin.role,
        });

        res.status(201).json(<ProcessResult<IManager>>{
            success: true,
            data: admin,
            token: token,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request<{}, {}, loginInput>, res: Response, next: NextFunction) => {
    try {
        const phoneNum = req.body.phoneNum;
        const password = req.body.password;

        const manager = await ManagerService.findByPhoneNum<IManager>(req.body.phoneNum);

        if (!manager) {
            throw new AuthError('invalid credentials');
        }

        await PasswordManager.compare(password, manager.password, 'Auth');

        if (manager.status !== ManagerStatus.Active) {
            throw new AuthError('this account is suspended');
        }

        const token = JWT.sign({
            _id: manager._id,
            phoneNum: phoneNum,
            role: manager.role,
            privileges: manager.privileges,
        });

        res.status(200).json(<ProcessResult<IManager>>{
            success: true,
            data: manager,
            token: token,
        });
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
