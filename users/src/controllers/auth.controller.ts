import { Request, Response, NextFunction } from 'express';

import { signupInput, loginInput } from '../schemas/auth.schema';

import { UserService } from '../services/user.service';

import { ProcessResult, IUser, User, userStatus, PasswordManager, ValidationError, AuthError, JWT } from '../../../common/index';

export const signup = async (req: Request<{}, {}, signupInput>, res: Response, next: NextFunction) => {
    try {
        const existingUser = await UserService.findByPhoneNum<IUser<any>>(req.body.phoneNum);
        if (existingUser) {
            throw new ValidationError('the phone number you have entered belongs to an existing user');
        }

        const newUser = await UserService.create<User<any>>({
            phoneNum: req.body.phoneNum,
            password: req.body.password,
            privileges: [],
            status: userStatus.Pending
        });

        const token = JWT.sign({
            _id: newUser._id.toString(),
            phoneNum: newUser.phoneNum,
            role: 'no-role',
            privileges: newUser.privileges
        });

        res.status(201).json(<ProcessResult<IUser<any>>>{
            success: true,
            data: newUser,
            token: token
        });
    } catch (err) {
        next(err);
    }
}

export const login = async (req: Request<{}, {}, loginInput>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.findByPhoneNum<IUser<any>>(req.body.phoneNum);
        if (!user) {
            throw new AuthError('invalid credentials');
        }

        await PasswordManager.compare(req.body.password, user.password, 'Auth');

        if (user.status === userStatus.InActive) {
            throw new AuthError('this account is suspended');
        }

        const token = JWT.sign({
            _id: user._id.toString(),
            phoneNum: user.phoneNum,
            role: 'no-role',
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
}