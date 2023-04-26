import { Request, Response, NextFunction } from 'express';

import { changePasswordInput } from '../schemas/profile.schema';

import { UserService } from '../services/user.service';

import { ProcessResult, IUser, NotFoundError, PasswordManager } from '../../../common/index';

export const changePassword = async (req: Request<{}, {}, changePasswordInput>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.findById<IUser<any>>(req.body._id as string);
        if (!user) {
            throw new NotFoundError('no user found with this ID');
        }

        await PasswordManager.compare(req.body.currentPassword, user.password, 'Profile');
        user.password = req.body.newPassword;
        const updatedUser = await user.save();

        res.status(200).json(<ProcessResult<IUser<any>>> {
            success: true,
            data: updatedUser
        });
    } catch (err) {
        next(err);
    }
};