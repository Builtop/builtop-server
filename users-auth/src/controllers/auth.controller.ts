import { Request, Response, NextFunction } from 'express';

import { signupInput } from '../validation-schemas/signup-schema.validation';
import { loginInput } from '../validation-schemas/login-schema.validation';
import { forgetPasswordInput } from '../validation-schemas/forget-password-schema.validation';
import { forgetPasswordOTPValidationInput } from '../validation-schemas/forget-password-otp-validation-schema.validation';
import { resetPasswordInput } from '../validation-schemas/reset-password-schema.validation'

import { UserService } from '../services/user.service';

import { ProcessResult, IUser, User, UserStatus, PasswordManager, JWT, forgetPasswordMethods, ValidationError, AuthError } from '../../../common/index';

export const signup = async (req: Request<{}, {}, signupInput>, res: Response, next: NextFunction) => {
    try {
        const existingUser = await UserService.findOne<IUser<any>>({ $or: [{ email: req.body.email }, { phoneNum: req.body.phoneNum }] });
        if (existingUser && (existingUser.infoColl || existingUser.info)) {
            throw new ValidationError('the data you have entered belongs to an existed user');
        }

        if (existingUser && !existingUser.infoColl && !existingUser.info) {
            return res.status(200).json(<ProcessResult<IUser<any>>>{
                success: true,
                data: existingUser
            });
        }

        const newUser = await UserService.create<User<any>>({
            email: req.body.email,
            phoneNum: req.body.phoneNum,
            password: req.body.password,
            privileges: [],
            isPhoneNumValid: false,
            isEmailValid: false,
            status: UserStatus.InReview,
        });

        // [TODO] : send Phone Number OTP

        res.status(201).json(<ProcessResult<IUser<any>>>{
            success: true,
            data: newUser
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request<{}, {}, loginInput>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.findByPhoneNum<IUser<any>>(req.body.phoneNum);

        if (!user) {
            throw new AuthError('invalid credentials');
        }

        if (!user.infoColl || !user.info) {
            return res.status(200).json(<ProcessResult<IUser<any>>>{
                success: true,
                data: user
            });
        }

        await PasswordManager.compare(req.body.password, user.password, 'Auth');

        if (user.status !== UserStatus.Active) {
            throw new AuthError('this account is suspended');
        }

        const token = JWT.sign({
            _id: user._id.toString(),
            phoneNum: user.phoneNum,
            email: user.email,
            role: user.info.role,
            privileges: user.privileges
        });

        res.status(200).json(<ProcessResult<IUser<any>>>{
            success: true,
            data: user,
            token: token
        });
    } catch (err) {
        next(err);
    }
};

export const forgetPassword = async (req: Request<{}, {}, forgetPasswordInput>, res: Response, next: NextFunction) => {
    try {
        let user = null;

        if (req.body.method === forgetPasswordMethods.WithPhoneNumber && req.body.phoneNum) {
            user = await UserService.findByPhoneNum<IUser<any>>(req.body.phoneNum);
        }

        if (req.body.method === forgetPasswordMethods.WithEmail && req.body.email) {
            user = await UserService.findByEmail<IUser<any>>(req.body.email);
        }

        if (!user) {
            throw new AuthError('invalid credentials');
        }

        if (req.body.method === forgetPasswordMethods.WithPhoneNumber && !user.isPhoneNumValid) {
            throw new AuthError('your phone number is not validated, please choose different method');
        }

        if (req.body.method === forgetPasswordMethods.WithEmail && !user.isEmailValid) {
            throw new AuthError('your email address is not validated, please choose different method');
        }

        // [TODO]: send OTP to the choosen method. "M.M"

        res.status(200).json(<ProcessResult<any>>{
            success: true
        });
    } catch (err) {
        next(err);
    }
};

export const forgetPasswordOTPValidation = async (req: Request<{}, {}, forgetPasswordOTPValidationInput>, res: Response, next: NextFunction) => {
    try {
        let user;

        if (req.body.method === forgetPasswordMethods.WithPhoneNumber && req.body.phoneNum) {
            user = await UserService.findByPhoneNum<IUser<any>>(req.body.phoneNum);
        }

        if (req.body.method === forgetPasswordMethods.WithEmail && req.body.email) {
            user = await UserService.findByEmail<IUser<any>>(req.body.email);
        }

        if (!user) {
            throw new AuthError('invalid credentials');
        }

        if (req.body.OTP !== '100100') {
            throw new AuthError('invalid OTP');
        }

        res.status(200).json(<ProcessResult<any>>{
            success: true
        });
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req: Request<{}, {}, resetPasswordInput>, res: Response, next: NextFunction) => {
    try {
        let user = null;

        if (req.body.method === forgetPasswordMethods.WithPhoneNumber && req.body.phoneNum) {
            user = await UserService.findByPhoneNum<IUser<any>>(req.body.phoneNum);
        }

        if (req.body.method === forgetPasswordMethods.WithEmail && req.body.email) {
            user = await UserService.findByEmail<IUser<any>>(req.body.email);
        }

        if (!user) {
            throw new AuthError('invalid credentials');
        }

        user.password = req.body.newPassword;
        await user.save();

        res.status(200).json(<ProcessResult<any>>{
            success: true
        });
    } catch (err) {
        next(err);
    }
};