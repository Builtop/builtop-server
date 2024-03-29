import { Request, Response, NextFunction } from 'express';

import { loginInput } from '../validation-schemas/login-schema.validation';
import { forgetPasswordInput } from '../validation-schemas/forget-password-schema.validation';
import { validatePhoneOTPInput } from '../validation-schemas/validate-phone-OTP-schema.validation';
import { validateEmailOTPInput } from '../validation-schemas/validate-email-OTP-schema.validation';
import { resetPasswordInput } from '../validation-schemas/reset-password-schema.validation';

import { ManagerService } from '../services/managers.service';

import { AuthError, IManager, JWT, ManagerStatus, PasswordManager, ProcessResult, forgetPasswordMethods, tokenData } from '../../../common/index';

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
        const { method, phoneNum, email } = req.body;
        let manager = null;
        
        if (method === forgetPasswordMethods.WithPhoneNumber && phoneNum) {
            manager = await ManagerService.findByPhoneNum<IManager>(phoneNum);
        } else if (method === forgetPasswordMethods.WithEmail && email) {
            manager = await ManagerService.findByEmail<IManager>(email);
        }

        if (!manager) {
            throw new AuthError('invalid credentials');
        }

        res.status(200).json(<ProcessResult<any>> {
            success: true
        })
    } catch (err) {
        next(err);
    }
};

export const validatePhoneOTP = async (req: Request<{}, {}, validatePhoneOTPInput>, res: Response, next: NextFunction) => {
    try {
        const { phoneNum, OTP } = req.body;

        const manager = await ManagerService.findByPhoneNum<IManager>(phoneNum);
        if (!manager) {
            throw new AuthError('invalid credentials');
        }

        if (OTP !== '100100') {
            throw new AuthError('invalid OTP');
        }

        res.status(201).json(<ProcessResult<any>> {
            success: true
        })
    } catch (err) {
        next(err);
    }
};

export const validateEmailOTP = async (req: Request<{}, {}, validateEmailOTPInput>, res: Response, next: NextFunction) => {
    try {
        const { email, OTP } = req.body;

        const manager = await ManagerService.findByEmail<IManager>(email);
        if (!manager) {
            throw new AuthError('invalid credentials');
        }

        if (OTP !== '100100') {
            throw new AuthError('invalid OTP');
        }

        res.status(201).json(<ProcessResult<any>> {
            success: true
        })
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req: Request<{}, {}, resetPasswordInput>, res: Response, next: NextFunction) => {
    try {
        const { method, phoneNum, email, newPassword } = req.body;

        let manager = null;
        if (method === forgetPasswordMethods.WithPhoneNumber && phoneNum) {
            manager = await ManagerService.findByPhoneNum<IManager>(phoneNum);
        } else if (method === forgetPasswordMethods.WithEmail && email) {
            manager = await ManagerService.findByEmail<IManager>(email);
        }

        if (!manager) {
            throw new AuthError('invalid credentials');
        }

        manager.password = newPassword;
        manager.save();

        res.status(200).json(<ProcessResult<any>> {
            success: true
        })
    } catch (err) {
        next(err);
    }
};
