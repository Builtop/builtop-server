import { Request, Response, NextFunction } from 'express';

import { signupInput, loginInput } from '../schemas/auth.schema';

import { UserService } from '../services/user.service';

import { ProcessResult, User, userStatus, PasswordManager, ValidationError, AuthError, JWT, roles } from '../../../common/index';

export const signup = async (req: Request<{}, {}, signupInput>, res: Response, next: NextFunction) => {
    try {
        const existingUser = await UserService.findByEmail<any>(req.body.email);
        if (existingUser) {
            throw new ValidationError('the email address you have entered belongs to an existing user');
        }

        const newUser = await UserService.create({
            email: req.body.email,
            password: req.body.password,
            privileges: [],
            status: userStatus.Pending
        });

        const token = JWT.sign({
            _id: newUser._id.toString(),
            email: newUser.email,
            role: 'no-role',
            privileges: newUser.privileges
        });

        res.status(201).json(<ProcessResult<User<undefined>>>{
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
        const user = await UserService.findByEmail<any>(req.body.email);
        if (!user) {
            throw new AuthError('invalid credentials');
        }

        await PasswordManager.compare(req.body.password, user.password);

        const token = JWT.sign({
            _id: user._id.toString(),
            email: user.email,
            role: 'no-role',
            privileges: user.privileges
        });

        res.status(201).json(<ProcessResult<User<any>>>{
            success: true,
            data: user,
            token: token
        });
    } catch (err) {
        next(err);
    }
}